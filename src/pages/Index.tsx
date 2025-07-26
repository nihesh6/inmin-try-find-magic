import { useState } from "react";
import { Sparkles, Eye, ShoppingBag, Users, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import { VirtualTryOn } from "@/components/VirtualTryOn";
import { AISearchResults } from "@/components/AISearchResults";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import heroImage from "@/assets/hero-shopping.jpg";
import aiSearchIcon from "@/assets/ai-search-icon.jpg";
import virtualTryOnIcon from "@/assets/virtual-tryon-icon.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTryOn, setShowTryOn] = useState(false);

  const featuredProducts = mockProducts.slice(0, 8);
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: ShoppingBag, label: "Products", value: "10K+" },
    { icon: Zap, label: "Fast Delivery", value: "30min" },
    { icon: Star, label: "Rating", value: "4.9" }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">i</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                inmin
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost">Shop</Button>
              <Button variant="ghost">Categories</Button>
              <Button variant="ghost">Deals</Button>
              <Button variant="magic">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    Shop with
                    <span className="bg-gradient-primary bg-clip-text text-transparent block">
                      AI Magic ✨
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Experience the future of shopping with virtual try-ons and intelligent search. 
                    Find exactly what you want in seconds!
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="xl" onClick={() => setShowTryOn(true)}>
                    <Eye className="h-6 w-6" />
                    Try Virtual Try-On
                  </Button>
                  <Button variant="playful" size="xl">
                    <ShoppingBag className="h-6 w-6" />
                    Browse Products
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Shopping Experience"
                  className="w-full rounded-2xl shadow-colorful animate-float"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full animate-bounce-gentle">
                  🎉 New arrivals daily!
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Section */}
      <section className="py-12 bg-gradient-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {searchQuery ? "Search Results" : "Find Anything Instantly"}
            </h2>
            {!searchQuery && (
              <p className="text-muted-foreground text-lg">
                Our AI understands what you're looking for, even if you don't know exactly how to describe it
              </p>
            )}
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Search Results or Featured Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchQuery ? (
            <AISearchResults query={searchQuery} onClearSearch={clearSearch} />
          ) : (
            <div className="space-y-16">
              {/* Features Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Virtual Try-On Feature */}
                <Card className="p-8 bg-gradient-accent border-2 border-border hover:shadow-colorful transition-all duration-300 group cursor-pointer" onClick={() => setShowTryOn(true)}>
                  <CardContent className="p-0 text-center space-y-4">
                    <img src={virtualTryOnIcon} alt="Virtual Try-On" className="w-20 h-20 mx-auto rounded-2xl group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold">Virtual Try-On</h3>
                    <p className="text-muted-foreground">
                      See how clothes, glasses, and electronics look on you before buying
                    </p>
                    <Button variant="magic" size="lg">
                      <Eye className="h-5 w-5" />
                      Try Now
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Search Feature */}
                <Card className="p-8 bg-gradient-secondary border-2 border-border hover:shadow-colorful transition-all duration-300 group">
                  <CardContent className="p-0 text-center space-y-4">
                    <img src={aiSearchIcon} alt="AI Search" className="w-20 h-20 mx-auto rounded-2xl group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold">AI-Powered Search</h3>
                    <p className="text-muted-foreground">
                      Describe what you want in natural language and we'll find it
                    </p>
                    <Button variant="playful" size="lg">
                      <Sparkles className="h-5 w-5" />
                      Search Smart
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Products */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Trending Products ⚡
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="hero" size="lg">
                    View All Products
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Virtual Try-On Modal */}
      {showTryOn && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <Button variant="outline" onClick={() => setShowTryOn(false)}>
                Close
              </Button>
            </div>
            <VirtualTryOn />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <span className="font-bold">i</span>
                </div>
                <span className="text-xl font-bold">inmin</span>
              </div>
              <p className="text-primary-foreground/80">
                The future of quick commerce with AI-powered shopping experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Electronics</li>
                <li>Clothing</li>
                <li>Glasses</li>
                <li>Beauty</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Virtual Try-On</li>
                <li>AI Search</li>
                <li>Fast Delivery</li>
                <li>Smart Recommendations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Returns</li>
                <li>Shipping Info</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 inmin. Made with ✨ and AI magic.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;