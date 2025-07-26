import { Heart, Star, ShoppingCart, Zap, Truck } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Product } from "@/data/mockProducts";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = () => {
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toast.success(`❤️ ${product.name} added to wishlist!`);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary/50 hover:shadow-colorful transition-all duration-300 bg-card">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-square bg-muted flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <Badge className="bg-destructive text-destructive-foreground animate-pulse-glow">
              -{discountPercentage}%
            </Badge>
          )}
          {product.fastDelivery && (
            <Badge className="bg-gradient-primary text-primary-foreground">
              <Zap className="w-3 h-3 mr-1" />
              Fast
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background hover:text-destructive"
          onClick={handleWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Brand and Category */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium">{product.brand}</span>
          <span>{product.subcategory}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {product.features.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{product.features.length - 2} more
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Colors/Sizes */}
        {product.colors && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Colors:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-border bg-muted"
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Delivery Info */}
        {product.fastDelivery && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Truck className="h-4 w-4" />
            <span>Fast delivery available</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          variant={product.inStock ? "hero" : "secondary"}
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};