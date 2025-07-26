export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  brand: string;
  description: string;
  features: string[];
  inStock: boolean;
  fastDelivery: boolean;
  colors?: string[];
  sizes?: string[];
}

export const mockProducts: Product[] = [
  // Electronics
  {
    id: "e1",
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    subcategory: "Smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2547,
    imageUrl: "/placeholder.svg",
    brand: "Apple",
    description: "The most advanced iPhone with titanium design and A17 Pro chip",
    features: ["6.7-inch display", "256GB storage", "Pro camera system", "Action Button"],
    inStock: true,
    fastDelivery: true,
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  {
    id: "e2", 
    name: "Samsung Galaxy Buds Pro",
    category: "Electronics",
    subcategory: "Audio",
    price: 199,
    originalPrice: 229,
    rating: 4.6,
    reviews: 1832,
    imageUrl: "/placeholder.svg",
    brand: "Samsung",
    description: "Premium wireless earbuds with active noise cancellation",
    features: ["ANC", "Wireless charging", "IPX7 waterproof", "8-hour battery"],
    inStock: true,
    fastDelivery: true,
    colors: ["Phantom Black", "Phantom White", "Phantom Violet"]
  },
  {
    id: "e3",
    name: "MacBook Air M3",
    category: "Electronics", 
    subcategory: "Laptops",
    price: 1299,
    rating: 4.9,
    reviews: 1205,
    imageUrl: "/placeholder.svg",
    brand: "Apple",
    description: "Supercharged by M3 chip, up to 18 hours of battery life",
    features: ["M3 chip", "13.6-inch Liquid Retina", "512GB SSD", "8GB RAM"],
    inStock: true,
    fastDelivery: false,
    colors: ["Midnight", "Silver", "Space Gray", "Starlight"]
  },

  // Clothing
  {
    id: "c1",
    name: "Vintage Denim Jacket",
    category: "Clothing",
    subcategory: "Jackets",
    price: 89,
    originalPrice: 129,
    rating: 4.5,
    reviews: 967,
    imageUrl: "/placeholder.svg",
    brand: "Urban Style",
    description: "Classic vintage-style denim jacket with distressed details",
    features: ["100% cotton denim", "Vintage wash", "Button closure", "Chest pockets"],
    inStock: true,
    fastDelivery: true,
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "c2",
    name: "Summer Floral Dress",
    category: "Clothing",
    subcategory: "Dresses",
    price: 79,
    rating: 4.7,
    reviews: 1456,
    imageUrl: "/placeholder.svg",
    brand: "Bloom & Co",
    description: "Lightweight floral dress perfect for summer occasions",
    features: ["Breathable fabric", "Midi length", "Elastic waist", "Pockets"],
    inStock: true,
    fastDelivery: true,
    colors: ["Floral Pink", "Floral Blue", "Floral Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "c3",
    name: "Performance Running Shoes",
    category: "Clothing",
    subcategory: "Footwear", 
    price: 159,
    originalPrice: 199,
    rating: 4.6,
    reviews: 2103,
    imageUrl: "/placeholder.svg",
    brand: "RunFast",
    description: "High-performance running shoes with advanced cushioning",
    features: ["Breathable mesh", "Responsive foam", "Durable outsole", "Lightweight"],
    inStock: true,
    fastDelivery: true,
    colors: ["Black/White", "Blue/Gray", "Red/Black"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"]
  },

  // Glasses
  {
    id: "g1",
    name: "Ray-Ban Aviator Classic",
    category: "Glasses",
    subcategory: "Sunglasses",
    price: 299,
    rating: 4.8,
    reviews: 3421,
    imageUrl: "/placeholder.svg",
    brand: "Ray-Ban",
    description: "Iconic aviator sunglasses with timeless style",
    features: ["100% UV protection", "Crystal lenses", "Metal frame", "Adjustable nose pads"],
    inStock: true,
    fastDelivery: true,
    colors: ["Gold/Green", "Silver/Blue", "Black/Gray"]
  },
  {
    id: "g2",
    name: "Designer Reading Glasses",
    category: "Glasses",
    subcategory: "Reading Glasses",
    price: 149,
    originalPrice: 199,
    rating: 4.4,
    reviews: 856,
    imageUrl: "/placeholder.svg",
    brand: "VisionCraft",
    description: "Stylish reading glasses with blue light protection",
    features: ["Blue light filter", "Anti-glare coating", "Lightweight frame", "Spring hinges"],
    inStock: true,
    fastDelivery: true,
    colors: ["Tortoise", "Black", "Silver"]
  },

  // Beauty & Personal Care
  {
    id: "b1",
    name: "Luxury Skincare Set",
    category: "Beauty",
    subcategory: "Skincare",
    price: 189,
    originalPrice: 249,
    rating: 4.7,
    reviews: 1892,
    imageUrl: "/placeholder.svg",
    brand: "GlowLux",
    description: "Complete skincare routine with premium ingredients",
    features: ["Cleanser", "Serum", "Moisturizer", "Eye cream", "Travel sizes"],
    inStock: true,
    fastDelivery: true
  },
  {
    id: "b2",
    name: "Professional Makeup Palette",
    category: "Beauty",
    subcategory: "Makeup",
    price: 69,
    rating: 4.6,
    reviews: 1247,
    imageUrl: "/placeholder.svg", 
    brand: "ColorPro",
    description: "42-shade eyeshadow palette with blendable formula",
    features: ["42 shades", "Matte & shimmer", "Long-lasting", "Cruelty-free"],
    inStock: true,
    fastDelivery: true
  },

  // Home & Living
  {
    id: "h1",
    name: "Smart LED Light Strips",
    category: "Home",
    subcategory: "Lighting",
    price: 45,
    originalPrice: 69,
    rating: 4.5,
    reviews: 2156,
    imageUrl: "/placeholder.svg",
    brand: "LightSmart",
    description: "Color-changing LED strips with smartphone control",
    features: ["16 million colors", "Voice control", "Music sync", "Easy installation"],
    inStock: true,
    fastDelivery: true
  },
  {
    id: "h2",
    name: "Aromatherapy Diffuser",
    category: "Home",
    subcategory: "Wellness",
    price: 79,
    rating: 4.6,
    reviews: 987,
    imageUrl: "/placeholder.svg",
    brand: "ZenHome",
    description: "Ultrasonic essential oil diffuser with timer settings",
    features: ["7 LED colors", "Timer function", "Auto shut-off", "Whisper quiet"],
    inStock: true,
    fastDelivery: true
  },

  // Sports & Fitness
  {
    id: "s1",
    name: "Yoga Mat Premium",
    category: "Sports",
    subcategory: "Fitness",
    price: 59,
    originalPrice: 89,
    rating: 4.7,
    reviews: 1634,
    imageUrl: "/placeholder.svg",
    brand: "FlexZone",
    description: "Non-slip yoga mat with alignment lines",
    features: ["6mm thick", "Non-slip surface", "Eco-friendly", "Carrying strap"],
    inStock: true,
    fastDelivery: true,
    colors: ["Purple", "Blue", "Pink", "Black"]
  },
  {
    id: "s2",
    name: "Wireless Fitness Tracker",
    category: "Sports",
    subcategory: "Wearables",
    price: 199,
    rating: 4.4,
    reviews: 2847,
    imageUrl: "/placeholder.svg",
    brand: "FitTech",
    description: "Advanced fitness tracker with heart rate monitoring",
    features: ["Heart rate monitor", "Sleep tracking", "Waterproof", "7-day battery"],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Navy", "Rose Gold"]
  }
];

export const getProductsByCategory = (category: string) => {
  return mockProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.features.some(feature => feature.toLowerCase().includes(searchTerm))
  );
};