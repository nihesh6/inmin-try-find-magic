import { useState, useEffect } from "react";
import { Sparkles, Filter, SortDesc, Grid, List } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import { ProductCard } from "./ProductCard";
import { Product, searchProducts } from "@/data/mockProducts";
import { toast } from "sonner";

interface AISearchResultsProps {
  query: string;
  onClearSearch: () => void;
}

export const AISearchResults = ({ query, onClearSearch }: AISearchResultsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    priceRange: "all",
    category: "all",
    inStock: false,
    fastDelivery: false
  });

  // Simulate AI-powered search with Gemini (mock implementation)
  const performAISearch = async (searchQuery: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced search logic (mock AI understanding)
    let results = searchProducts(searchQuery);
    
    // Mock AI interpretation of search intent
    const searchIntent = analyzeSearchIntent(searchQuery);
    
    if (searchIntent.category) {
      results = results.filter(p => 
        p.category.toLowerCase().includes(searchIntent.category.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchIntent.category.toLowerCase())
      );
    }
    
    if (searchIntent.priceRange) {
      results = results.filter(p => {
        if (searchIntent.priceRange === "budget") return p.price < 100;
        if (searchIntent.priceRange === "mid") return p.price >= 100 && p.price <= 300;
        if (searchIntent.priceRange === "premium") return p.price > 300;
        return true;
      });
    }
    
    setProducts(results);
    setFilteredProducts(results);
    setLoading(false);
    
    toast.success(`🎯 Found ${results.length} products using AI search!`);
  };

  // Mock AI intent analysis
  const analyzeSearchIntent = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let category = null;
    let priceRange = null;
    
    // Category detection
    if (lowerQuery.includes("phone") || lowerQuery.includes("iphone") || lowerQuery.includes("samsung")) {
      category = "smartphones";
    } else if (lowerQuery.includes("headphone") || lowerQuery.includes("audio") || lowerQuery.includes("buds")) {
      category = "audio";
    } else if (lowerQuery.includes("dress") || lowerQuery.includes("clothing") || lowerQuery.includes("shirt")) {
      category = "clothing";
    } else if (lowerQuery.includes("glasses") || lowerQuery.includes("sunglasses")) {
      category = "glasses";
    }
    
    // Price intent detection
    if (lowerQuery.includes("cheap") || lowerQuery.includes("budget") || lowerQuery.includes("affordable")) {
      priceRange = "budget";
    } else if (lowerQuery.includes("premium") || lowerQuery.includes("luxury") || lowerQuery.includes("expensive")) {
      priceRange = "premium";
    }
    
    return { category, priceRange };
  };

  useEffect(() => {
    if (query) {
      performAISearch(query);
    }
  }, [query]);

  useEffect(() => {
    let filtered = [...products];
    
    // Apply filters
    if (filters.category !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === filters.category);
    }
    
    if (filters.priceRange !== "all") {
      filtered = filtered.filter(p => {
        if (filters.priceRange === "under-50") return p.price < 50;
        if (filters.priceRange === "50-200") return p.price >= 50 && p.price <= 200;
        if (filters.priceRange === "over-200") return p.price > 200;
        return true;
      });
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    if (filters.fastDelivery) {
      filtered = filtered.filter(p => p.fastDelivery);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "reviews": return b.reviews - a.reviews;
        default: return 0; // relevance
      }
    });
    
    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full animate-pulse-glow">
          <Sparkles className="h-5 w-5 animate-spin" />
          <span className="font-medium">AI is searching for you...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Results Header */}
      <div className="flex flex-col gap-4 p-6 bg-gradient-secondary rounded-2xl border-2 border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              AI Search Results for "{query}"
            </h2>
            <p className="text-muted-foreground">
              Found {filteredProducts.length} products using intelligent search
            </p>
          </div>
          <Button variant="outline" onClick={onClearSearch}>
            Clear Search
          </Button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                className="rounded"
              />
              In Stock Only
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.fastDelivery}
                onChange={(e) => setFilters(prev => ({ ...prev, fastDelivery: e.target.checked }))}
                className="rounded"
              />
              Fast Delivery
            </label>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button variant="magic" onClick={onClearSearch}>
            Clear Search & Browse All
          </Button>
        </div>
      )}
    </div>
  );
};