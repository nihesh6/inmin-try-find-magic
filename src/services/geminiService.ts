import { GoogleGenerativeAI } from "@google/generative-ai";
import { Product } from "@/data/mockProducts";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export interface ProductSearchRequest {
  query: string;
  maxResults?: number;
  priceRange?: string;
  category?: string;
}

export interface ProductSearchResponse {
  products: Product[];
  searchInsights: string;
  suggestedFilters: {
    categories: string[];
    priceRanges: string[];
    features: string[];
  };
}

// Mock product database (in real app, this would be from your actual product database)
const mockProductDatabase: Product[] = [
  // ELECTRONICS - Smartphones
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
    description:
      "The most advanced iPhone with titanium design and A17 Pro chip",
    features: [
      "6.7-inch display",
      "256GB storage",
      "Pro camera system",
      "Action Button",
    ],
    inStock: true,
    fastDelivery: true,
    colors: [
      "Natural Titanium",
      "Blue Titanium",
      "White Titanium",
      "Black Titanium",
    ],
  },
  {
    id: "e2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    subcategory: "Smartphones",
    price: 1199,
    rating: 4.7,
    reviews: 3241,
    imageUrl: "/placeholder.svg",
    brand: "Samsung",
    description: "AI-powered flagship with S Pen and 200MP camera",
    features: [
      "6.8-inch Dynamic AMOLED",
      "S Pen included",
      "200MP camera",
      "AI features",
    ],
    inStock: true,
    fastDelivery: true,
    colors: [
      "Titanium Black",
      "Titanium Gray",
      "Titanium Violet",
      "Titanium Yellow",
    ],
  },
  {
    id: "e3",
    name: "Google Pixel 8 Pro",
    category: "Electronics",
    subcategory: "Smartphones",
    price: 999,
    originalPrice: 1099,
    rating: 4.6,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "Google",
    description: "AI-first smartphone with Magic Eraser and Night Sight",
    features: [
      "Google Tensor G3",
      "Magic Eraser",
      "Night Sight",
      "7 years updates",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Obsidian", "Porcelain", "Bay"],
  },
  {
    id: "e4",
    name: "OnePlus 12",
    category: "Electronics",
    subcategory: "Smartphones",
    price: 799,
    rating: 4.5,
    reviews: 2103,
    imageUrl: "/placeholder.svg",
    brand: "OnePlus",
    description: "Flagship killer with Snapdragon 8 Gen 3 and 120W charging",
    features: [
      "Snapdragon 8 Gen 3",
      "120W SuperVOOC",
      "Hasselblad cameras",
      "120Hz display",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Silky Black", "Flowy Emerald"],
  },

  // ELECTRONICS - Audio
  {
    id: "e5",
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
    colors: ["Phantom Black", "Phantom White", "Phantom Violet"],
  },
  {
    id: "e6",
    name: "Apple AirPods Pro 2",
    category: "Electronics",
    subcategory: "Audio",
    price: 249,
    rating: 4.8,
    reviews: 4521,
    imageUrl: "/placeholder.svg",
    brand: "Apple",
    description: "Next-level ANC with adaptive transparency and spatial audio",
    features: [
      "Adaptive ANC",
      "Spatial Audio",
      "MagSafe charging",
      "6 hours battery",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["White"],
  },
  {
    id: "e7",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    subcategory: "Audio",
    price: 399,
    originalPrice: 449,
    rating: 4.9,
    reviews: 3678,
    imageUrl: "/placeholder.svg",
    brand: "Sony",
    description: "Industry-leading noise canceling over-ear headphones",
    features: ["30-hour battery", "Premium ANC", "LDAC codec", "Quick charge"],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Silver"],
  },
  {
    id: "e8",
    name: "Bose QuietComfort Earbuds",
    category: "Electronics",
    subcategory: "Audio",
    price: 279,
    rating: 4.7,
    reviews: 2341,
    imageUrl: "/placeholder.svg",
    brand: "Bose",
    description: "World-class noise cancellation in true wireless earbuds",
    features: [
      "Best-in-class ANC",
      "6 hours battery",
      "StayHear Max tips",
      "IPX4 rated",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Triple Black", "Soapstone"],
  },

  // ELECTRONICS - Laptops
  {
    id: "e9",
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
    colors: ["Midnight", "Silver", "Space Gray", "Starlight"],
  },
  {
    id: "e10",
    name: "Dell XPS 13 Plus",
    category: "Electronics",
    subcategory: "Laptops",
    price: 1199,
    originalPrice: 1399,
    rating: 4.6,
    reviews: 987,
    imageUrl: "/placeholder.svg",
    brand: "Dell",
    description:
      "Premium ultrabook with InfinityEdge display and haptic touchpad",
    features: ["12th Gen Intel i7", "13.4-inch OLED", "16GB RAM", "512GB SSD"],
    inStock: true,
    fastDelivery: false,
    colors: ["Platinum Silver", "Graphite"],
  },
  {
    id: "e11",
    name: "ThinkPad X1 Carbon Gen 11",
    category: "Electronics",
    subcategory: "Laptops",
    price: 1799,
    rating: 4.8,
    reviews: 1456,
    imageUrl: "/placeholder.svg",
    brand: "Lenovo",
    description: "Business ultrabook with military-grade durability",
    features: [
      "13th Gen Intel i7",
      "14-inch 2.8K display",
      "32GB RAM",
      "1TB SSD",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Black"],
  },
  {
    id: "e12",
    name: "ASUS ROG Zephyrus G14",
    category: "Electronics",
    subcategory: "Laptops",
    price: 1499,
    rating: 4.7,
    reviews: 2234,
    imageUrl: "/placeholder.svg",
    brand: "ASUS",
    description: "Gaming laptop with AMD Ryzen 9 and RTX 4060",
    features: ["AMD Ryzen 9 7940HS", "RTX 4060", "16GB RAM", "1TB SSD"],
    inStock: true,
    fastDelivery: false,
    colors: ["Eclipse Gray", "Moonlight White"],
  },

  // ELECTRONICS - Tablets & Accessories
  {
    id: "e13",
    name: "iPad Pro 12.9-inch M2",
    category: "Electronics",
    subcategory: "Tablets",
    price: 1099,
    rating: 4.8,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "Apple",
    description:
      "Professional tablet with M2 chip and Liquid Retina XDR display",
    features: [
      "M2 chip",
      "12.9-inch Liquid Retina XDR",
      "128GB storage",
      "Apple Pencil support",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Space Gray", "Silver"],
  },
  {
    id: "e14",
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "Electronics",
    subcategory: "Tablets",
    price: 1199,
    rating: 4.7,
    reviews: 1243,
    imageUrl: "/placeholder.svg",
    brand: "Samsung",
    description: "Large productivity tablet with S Pen included",
    features: [
      "14.6-inch AMOLED",
      "Snapdragon 8 Gen 2",
      "S Pen included",
      "12GB RAM",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Graphite", "Beige"],
  },

  // ELECTRONICS - Smart Home
  {
    id: "e15",
    name: "Amazon Echo Studio",
    category: "Electronics",
    subcategory: "Smart Home",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviews: 3421,
    imageUrl: "/placeholder.svg",
    brand: "Amazon",
    description: "High-fidelity smart speaker with 3D audio and Alexa",
    features: [
      "360-degree sound",
      "Dolby Atmos",
      "Built-in hub",
      "Voice control",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Charcoal", "Glacier White"],
  },
  {
    id: "e16",
    name: "Google Nest Hub Max",
    category: "Electronics",
    subcategory: "Smart Home",
    price: 229,
    rating: 4.4,
    reviews: 2156,
    imageUrl: "/placeholder.svg",
    brand: "Google",
    description: "Smart display with Google Assistant and security camera",
    features: [
      "10-inch display",
      "Built-in camera",
      "Google Assistant",
      "Smart home control",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Chalk", "Charcoal"],
  },
  {
    id: "e17",
    name: "Philips Hue Smart Light Starter Kit",
    category: "Electronics",
    subcategory: "Smart Home",
    price: 179,
    rating: 4.6,
    reviews: 4521,
    imageUrl: "/placeholder.svg",
    brand: "Philips",
    description: "Color-changing smart lights with bridge and app control",
    features: [
      "16 million colors",
      "Voice control",
      "App scheduling",
      "Energy efficient",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["White and Color Ambiance"],
  },

  // CLOTHING - Men's
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
    features: [
      "100% cotton denim",
      "Vintage wash",
      "Button closure",
      "Chest pockets",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "c2",
    name: "Premium Wool Suit",
    category: "Clothing",
    subcategory: "Suits",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 432,
    imageUrl: "/placeholder.svg",
    brand: "Savile & Co",
    description: "Tailored wool suit perfect for business and formal occasions",
    features: ["100% wool", "Slim fit", "Lined jacket", "Flat-front pants"],
    inStock: true,
    fastDelivery: false,
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
  },
  {
    id: "c3",
    name: "Casual Cotton Polo",
    category: "Clothing",
    subcategory: "Shirts",
    price: 49,
    rating: 4.4,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "Classic Fit",
    description: "Comfortable cotton polo shirt for everyday wear",
    features: [
      "100% cotton",
      "Ribbed collar",
      "Three-button placket",
      "Side vents",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["White", "Navy", "Green", "Red", "Yellow"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "c4",
    name: "Leather Dress Shoes",
    category: "Clothing",
    subcategory: "Footwear",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 876,
    imageUrl: "/placeholder.svg",
    brand: "Oxford & Co",
    description: "Handcrafted leather oxford shoes for professional wear",
    features: [
      "Genuine leather",
      "Cushioned insole",
      "Rubber sole",
      "Classic oxford style",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
  },

  // CLOTHING - Women's
  {
    id: "c5",
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
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "c6",
    name: "Designer Silk Blouse",
    category: "Clothing",
    subcategory: "Blouses",
    price: 159,
    originalPrice: 199,
    rating: 4.6,
    reviews: 723,
    imageUrl: "/placeholder.svg",
    brand: "Elegance",
    description: "Luxurious silk blouse with elegant draping",
    features: ["100% silk", "Button-front", "Long sleeves", "Professional cut"],
    inStock: true,
    fastDelivery: true,
    colors: ["Ivory", "Black", "Navy", "Blush"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "c7",
    name: "High-Waisted Jeans",
    category: "Clothing",
    subcategory: "Pants",
    price: 89,
    rating: 4.5,
    reviews: 2341,
    imageUrl: "/placeholder.svg",
    brand: "Denim Dreams",
    description: "Flattering high-waisted jeans with stretch comfort",
    features: [
      "Stretch denim",
      "High-waisted",
      "Skinny fit",
      "5-pocket design",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Dark Wash", "Light Wash", "Black"],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
  },
  {
    id: "c8",
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
    features: [
      "Breathable mesh",
      "Responsive foam",
      "Durable outsole",
      "Lightweight",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black/White", "Blue/Gray", "Red/Black"],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
  },

  // GLASSES
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
    features: [
      "100% UV protection",
      "Crystal lenses",
      "Metal frame",
      "Adjustable nose pads",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Gold/Green", "Silver/Blue", "Black/Gray"],
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
    features: [
      "Blue light filter",
      "Anti-glare coating",
      "Lightweight frame",
      "Spring hinges",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Tortoise", "Black", "Silver"],
  },
  {
    id: "g3",
    name: "Sports Safety Glasses",
    category: "Glasses",
    subcategory: "Sports Glasses",
    price: 89,
    rating: 4.5,
    reviews: 1234,
    imageUrl: "/placeholder.svg",
    brand: "ActiveVision",
    description: "Durable sports glasses with impact resistance",
    features: [
      "Impact resistant",
      "UV protection",
      "Non-slip grip",
      "Wrap-around design",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Blue", "Clear"],
  },
  {
    id: "g4",
    name: "Luxury Designer Frames",
    category: "Glasses",
    subcategory: "Prescription Glasses",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 567,
    imageUrl: "/placeholder.svg",
    brand: "Luxe Optics",
    description: "Premium designer frames with Italian craftsmanship",
    features: [
      "Italian design",
      "Titanium frame",
      "Adjustable nose pads",
      "Premium hinges",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Rose Gold", "Silver", "Black"],
  },

  // BEAUTY & PERSONAL CARE
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
    fastDelivery: true,
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
    fastDelivery: true,
  },
  {
    id: "b3",
    name: "Anti-Aging Face Serum",
    category: "Beauty",
    subcategory: "Skincare",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviews: 2876,
    imageUrl: "/placeholder.svg",
    brand: "YouthGlow",
    description: "Powerful anti-aging serum with retinol and vitamin C",
    features: [
      "Retinol complex",
      "Vitamin C",
      "Hyaluronic acid",
      "Reduces fine lines",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "b4",
    name: "Organic Hair Care Set",
    category: "Beauty",
    subcategory: "Hair Care",
    price: 45,
    rating: 4.4,
    reviews: 1654,
    imageUrl: "/placeholder.svg",
    brand: "NaturalLocks",
    description: "Sulfate-free shampoo and conditioner for all hair types",
    features: [
      "Sulfate-free",
      "Organic ingredients",
      "Color-safe",
      "Paraben-free",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "b5",
    name: "Professional Hair Dryer",
    category: "Beauty",
    subcategory: "Hair Tools",
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviews: 987,
    imageUrl: "/placeholder.svg",
    brand: "SalonPro",
    description: "Ionic hair dryer with multiple heat settings",
    features: [
      "Ionic technology",
      "3 heat settings",
      "Cool shot button",
      "Lightweight",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "White", "Rose Gold"],
  },

  // SPORTS & FITNESS
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
    features: [
      "6mm thick",
      "Non-slip surface",
      "Eco-friendly",
      "Carrying strap",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Purple", "Blue", "Pink", "Black"],
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
    features: [
      "Heart rate monitor",
      "Sleep tracking",
      "Waterproof",
      "7-day battery",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Navy", "Rose Gold"],
  },
  {
    id: "s3",
    name: "Adjustable Dumbbells Set",
    category: "Sports",
    subcategory: "Strength Training",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1245,
    imageUrl: "/placeholder.svg",
    brand: "PowerLift",
    description: "Space-saving adjustable dumbbells for home workouts",
    features: [
      "5-50 lbs per dumbbell",
      "Quick-adjust system",
      "Compact design",
      "Durable construction",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Black/Red"],
  },
  {
    id: "s4",
    name: "Professional Boxing Gloves",
    category: "Sports",
    subcategory: "Boxing",
    price: 89,
    rating: 4.6,
    reviews: 876,
    imageUrl: "/placeholder.svg",
    brand: "FightPro",
    description: "High-quality boxing gloves for training and sparring",
    features: [
      "Genuine leather",
      "Foam padding",
      "Velcro closure",
      "Breathable lining",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "Red", "Blue"],
    sizes: ["12oz", "14oz", "16oz"],
  },
  {
    id: "s5",
    name: "Mountain Bike Helmet",
    category: "Sports",
    subcategory: "Cycling",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviews: 1543,
    imageUrl: "/placeholder.svg",
    brand: "TrailRider",
    description: "Lightweight mountain bike helmet with MIPS technology",
    features: [
      "MIPS protection",
      "18 vents",
      "Adjustable fit",
      "Reflective elements",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Matte Black", "White", "Red"],
    sizes: ["Small", "Medium", "Large"],
  },

  // HOME & LIVING
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
    features: [
      "16 million colors",
      "Voice control",
      "Music sync",
      "Easy installation",
    ],
    inStock: true,
    fastDelivery: true,
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
    features: [
      "7 LED colors",
      "Timer function",
      "Auto shut-off",
      "Whisper quiet",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "h3",
    name: "Memory Foam Pillow",
    category: "Home",
    subcategory: "Bedding",
    price: 49,
    originalPrice: 69,
    rating: 4.4,
    reviews: 3421,
    imageUrl: "/placeholder.svg",
    brand: "DreamComfort",
    description: "Ergonomic memory foam pillow for better sleep",
    features: [
      "Memory foam",
      "Cooling gel",
      "Hypoallergenic",
      "Removable cover",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "h4",
    name: "Robot Vacuum Cleaner",
    category: "Home",
    subcategory: "Appliances",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "CleanBot",
    description: "Smart robot vacuum with mapping and app control",
    features: [
      "Smart mapping",
      "App control",
      "HEPA filter",
      "120-minute runtime",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "White"],
  },
  {
    id: "h5",
    name: "Coffee Machine Deluxe",
    category: "Home",
    subcategory: "Kitchen",
    price: 199,
    rating: 4.7,
    reviews: 2341,
    imageUrl: "/placeholder.svg",
    brand: "BrewMaster",
    description: "Programmable coffee machine with built-in grinder",
    features: [
      "Built-in grinder",
      "Programmable",
      "12-cup capacity",
      "Auto shut-off",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Stainless Steel", "Black"],
  },

  // AUTOMOTIVE
  {
    id: "auto1",
    name: "Wireless Car Charger",
    category: "Automotive",
    subcategory: "Electronics",
    price: 59,
    originalPrice: 79,
    rating: 4.3,
    reviews: 1234,
    imageUrl: "/placeholder.svg",
    brand: "ChargeFast",
    description: "Qi wireless charging pad for car dashboard",
    features: [
      "15W fast charging",
      "Auto-clamp",
      "Qi compatible",
      "Dashboard mount",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black"],
  },
  {
    id: "auto2",
    name: "Dash Camera 4K",
    category: "Automotive",
    subcategory: "Safety",
    price: 149,
    rating: 4.6,
    reviews: 876,
    imageUrl: "/placeholder.svg",
    brand: "RoadWatch",
    description: "4K dash camera with night vision and GPS",
    features: [
      "4K recording",
      "Night vision",
      "GPS tracking",
      "Loop recording",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Black"],
  },

  // BOOKS & MEDIA
  {
    id: "book1",
    name: "Productivity Masterclass Book",
    category: "Books",
    subcategory: "Self-Help",
    price: 24,
    originalPrice: 29,
    rating: 4.8,
    reviews: 2341,
    imageUrl: "/placeholder.svg",
    brand: "Success Publishers",
    description:
      "Complete guide to maximizing productivity and achieving goals",
    features: [
      "320 pages",
      "Practical exercises",
      "Real-world examples",
      "Hardcover",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "book2",
    name: "Cooking Masterclass",
    category: "Books",
    subcategory: "Cooking",
    price: 39,
    rating: 4.7,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "Culinary Arts",
    description: "Professional cooking techniques and recipes",
    features: ["400 pages", "200+ recipes", "Step-by-step photos", "Hardcover"],
    inStock: true,
    fastDelivery: true,
  },

  // TOYS & GAMES
  {
    id: "toy1",
    name: "Educational STEM Kit",
    category: "Toys",
    subcategory: "Educational",
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviews: 1543,
    imageUrl: "/placeholder.svg",
    brand: "LearnFun",
    description: "Hands-on STEM learning kit for kids aged 8-12",
    features: [
      "10 experiments",
      "Detailed instructions",
      "Safe materials",
      "Age 8-12",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "toy2",
    name: "Remote Control Drone",
    category: "Toys",
    subcategory: "Remote Control",
    price: 149,
    rating: 4.4,
    reviews: 987,
    imageUrl: "/placeholder.svg",
    brand: "SkyFlyer",
    description: "Beginner-friendly drone with HD camera",
    features: ["HD camera", "30-minute flight", "Easy controls", "LED lights"],
    inStock: true,
    fastDelivery: true,
    colors: ["Black", "White"],
  },

  // GARDEN & OUTDOOR
  {
    id: "garden1",
    name: "Smart Plant Watering System",
    category: "Garden",
    subcategory: "Tools",
    price: 89,
    rating: 4.5,
    reviews: 765,
    imageUrl: "/placeholder.svg",
    brand: "GreenThumb",
    description: "Automated plant watering system with app control",
    features: [
      "App control",
      "Moisture sensors",
      "Solar powered",
      "Weather resistant",
    ],
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "garden2",
    name: "Portable Camping Chair",
    category: "Garden",
    subcategory: "Outdoor Furniture",
    price: 59,
    originalPrice: 79,
    rating: 4.7,
    reviews: 1432,
    imageUrl: "/placeholder.svg",
    brand: "OutdoorComfort",
    description: "Lightweight folding chair for camping and outdoor events",
    features: [
      "Lightweight aluminum",
      "Cup holder",
      "Carrying bag",
      "300 lb capacity",
    ],
    inStock: true,
    fastDelivery: true,
    colors: ["Green", "Blue", "Gray"],
  },

  // OFFICE SUPPLIES
  {
    id: "office1",
    name: "Ergonomic Office Chair",
    category: "Office",
    subcategory: "Furniture",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 1876,
    imageUrl: "/placeholder.svg",
    brand: "ComfortWork",
    description: "Ergonomic office chair with lumbar support",
    features: [
      "Lumbar support",
      "Adjustable height",
      "Breathable mesh",
      "5-year warranty",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Black", "Gray"],
  },
  {
    id: "office2",
    name: "Standing Desk Converter",
    category: "Office",
    subcategory: "Furniture",
    price: 249,
    rating: 4.5,
    reviews: 1234,
    imageUrl: "/placeholder.svg",
    brand: "StandUp",
    description: "Adjustable standing desk converter for healthier work",
    features: [
      "Height adjustable",
      "Keyboard tray",
      "Easy transition",
      "Stable design",
    ],
    inStock: true,
    fastDelivery: false,
    colors: ["Black", "White"],
  },
];

/**
 * Uses Gemini AI as an intelligent shopping agent to search and recommend products
 */
export async function searchProductsWithGemini(
  request: ProductSearchRequest
): Promise<ProductSearchResponse> {
  try {
    // Create a comprehensive prompt for Gemini to act as a shopping agent
    const prompt = `
You are an intelligent shopping assistant AI agent. A customer is searching for products with the following query: "${
      request.query
    }"

Here is the available product catalog:
${JSON.stringify(mockProductDatabase, null, 2)}

As a smart shopping agent, please:
1. Analyze the customer's query to understand their intent, preferences, and needs
2. Find the most relevant products from the catalog that match their query
3. Rank them by relevance, considering factors like:
   - Direct keyword matches
   - Semantic similarity
   - User intent (price sensitivity, quality preferences, specific features)
   - Product ratings and reviews
   - Stock availability
4. Provide intelligent insights about the search
5. Suggest helpful filters based on the query

Please respond with a JSON object in this exact format:
{
  "productIds": ["id1", "id2", "id3", ...],
  "searchInsights": "A helpful explanation of what you found and why these products match the query",
  "suggestedFilters": {
    "categories": ["category1", "category2", ...],
    "priceRanges": ["under-100", "100-300", "over-300"],
    "features": ["feature1", "feature2", ...]
  },
  "reasoning": "Brief explanation of your selection criteria"
}

Limit to maximum ${request.maxResults || 10} products.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response
    let aiResponse;
    try {
      // Extract JSON from the response (handle cases where AI adds extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback to simple keyword search
      return fallbackProductSearch(request);
    }

    // Get the recommended products
    const recommendedProducts = aiResponse.productIds
      .map((id: string) =>
        mockProductDatabase.find((product) => product.id === id)
      )
      .filter(
        (product: Product | undefined): product is Product =>
          product !== undefined
      );

    return {
      products: recommendedProducts,
      searchInsights:
        aiResponse.searchInsights ||
        `Found ${recommendedProducts.length} products for "${request.query}"`,
      suggestedFilters: aiResponse.suggestedFilters || {
        categories: [],
        priceRanges: [],
        features: [],
      },
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback to basic search if AI fails
    return fallbackProductSearch(request);
  }
}

/**
 * Fallback search function when Gemini API is unavailable
 */
function fallbackProductSearch(
  request: ProductSearchRequest
): ProductSearchResponse {
  const query = request.query.toLowerCase();

  const filteredProducts = mockProductDatabase
    .filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(query)
        )
    )
    .slice(0, request.maxResults || 10);

  return {
    products: filteredProducts,
    searchInsights: `Found ${filteredProducts.length} products using basic search for "${request.query}". AI search temporarily unavailable.`,
    suggestedFilters: {
      categories: [...new Set(filteredProducts.map((p) => p.category))],
      priceRanges: ["under-100", "100-300", "over-300"],
      features: [],
    },
  };
}

/**
 * Ask Gemini for product recommendations based on user preferences
 */
export async function getPersonalizedRecommendations(userPreferences: {
  categories?: string[];
  priceRange?: string;
  previousPurchases?: string[];
  interests?: string[];
}): Promise<ProductSearchResponse> {
  try {
    const prompt = `
You are a personalized shopping recommendation agent. Based on the user's preferences below, recommend the most suitable products:

User Preferences:
- Interested Categories: ${
      userPreferences.categories?.join(", ") || "No specific preference"
    }
- Price Range: ${userPreferences.priceRange || "No specific preference"}
- Previous Purchases: ${userPreferences.previousPurchases?.join(", ") || "None"}
- Interests: ${userPreferences.interests?.join(", ") || "General shopping"}

Available Products:
${JSON.stringify(mockProductDatabase, null, 2)}

Please recommend products that would best match their preferences and explain your reasoning.

Respond with a JSON object in this format:
{
  "productIds": ["id1", "id2", "id3", ...],
  "searchInsights": "Explanation of why these products were recommended",
  "suggestedFilters": {
    "categories": ["category1", "category2"],
    "priceRanges": ["range1", "range2"],
    "features": ["feature1", "feature2"]
  }
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiResponse = JSON.parse(jsonMatch[0]);

      const recommendedProducts = aiResponse.productIds
        .map((id: string) =>
          mockProductDatabase.find((product) => product.id === id)
        )
        .filter(
          (product: Product | undefined): product is Product =>
            product !== undefined
        );

      return {
        products: recommendedProducts,
        searchInsights: aiResponse.searchInsights,
        suggestedFilters: aiResponse.suggestedFilters,
      };
    }
  } catch (error) {
    console.error("Error getting personalized recommendations:", error);
  }

  // Fallback to trending products
  return {
    products: mockProductDatabase.slice(0, 6),
    searchInsights: "Here are some trending products you might like",
    suggestedFilters: {
      categories: ["Electronics", "Clothing", "Beauty"],
      priceRanges: ["under-100", "100-300"],
      features: [],
    },
  };
}

export function fixProductImages(): void {
  const basePath = import.meta.env.BASE_URL || '/inmin-try-find-magic/';
  
  mockProductDatabase.forEach(product => {
    // 1. First fix the placeholder paths by ensuring they have the correct base path
    if (product.imageUrl === '/placeholder.svg') {
      // Remove leading slash if base path already has one
      const fixedPath = basePath.endsWith('/') 
        ? `${basePath}placeholder.svg`
        : `${basePath}/placeholder.svg`;
      
      product.imageUrl = fixedPath;
    }
    
    // 2. Optionally replace with Lorem Picsum images for better visuals
    // Comment this line if you want to keep using placeholder.svg
    product.imageUrl = `https://picsum.photos/seed/${product.id}/800/800`;
  });
  
  console.log("✅ Product images fixed for GitHub Pages deployment");
}

// Add this line at the end of your existing code
// This ensures images are fixed when the module is loaded
fixProductImages();