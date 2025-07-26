import { useState, useRef } from "react";
import { Camera, Upload, RotateCcw, Download, Glasses, Shirt, Smartphone } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import { Card } from "./ui/card";
import { toast } from "sonner";
import virtualTryOnIcon from "@/assets/virtual-tryon-icon.jpg";

interface TryOnProduct {
  id: string;
  name: string;
  category: "glasses" | "clothing" | "electronics";
  imageUrl: string;
  price: number;
}

const mockProducts: TryOnProduct[] = [
  { id: "1", name: "Ray-Ban Aviators", category: "glasses", imageUrl: "/placeholder.svg", price: 299 },
  { id: "2", name: "Vintage T-Shirt", category: "clothing", imageUrl: "/placeholder.svg", price: 49 },
  { id: "3", name: "iPhone 15 Pro", category: "electronics", imageUrl: "/placeholder.svg", price: 999 },
];

export const VirtualTryOn = () => {
  const [selectedProduct, setSelectedProduct] = useState<TryOnProduct | null>(null);
  const [userDimensions, setUserDimensions] = useState({
    height: "",
    width: "",
    faceWidth: "",
    shoulderWidth: ""
  });
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast.success("📸 Image uploaded! Ready for try-on magic!");
      };
      reader.readAsDataURL(file);
    }
  };

  const startWebcam = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsWebcamActive(true);
      toast.success("📷 Camera activated! Strike a pose!");
    } catch (error) {
      toast.error("Camera access denied. Please upload an image instead!");
    }
  };

  const applyTryOn = () => {
    if (!selectedProduct) {
      toast.error("Please select a product to try on!");
      return;
    }
    
    if (!uploadedImage && !isWebcamActive) {
      toast.error("Please upload an image or start the camera!");
      return;
    }

    // Mock try-on application
    toast.success(`✨ Applying ${selectedProduct.name} with your dimensions!`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "glasses": return <Glasses className="h-4 w-4" />;
      case "clothing": return <Shirt className="h-4 w-4" />;
      case "electronics": return <Smartphone className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="p-6 bg-gradient-secondary border-2 border-border shadow-colorful">
      <div className="flex items-center gap-3 mb-6">
        <img src={virtualTryOnIcon} alt="Virtual Try-On" className="w-12 h-12 rounded-lg" />
        <div>
          <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Virtual Try-On Magic ✨
          </h3>
          <p className="text-muted-foreground">Try before you buy with AR technology!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Input Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Step 1: Your Photo</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="playful"
              onClick={startWebcam}
              className="h-20 flex-col gap-2"
            >
              <Camera className="h-6 w-6" />
              Use Camera
            </Button>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="h-20 flex-col gap-2 hover:bg-accent"
            >
              <Upload className="h-6 w-6" />
              Upload Photo
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Preview Area */}
          <div className="bg-muted rounded-lg p-4 min-h-[200px] flex items-center justify-center border-2 border-dashed border-border">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Preview" className="max-h-48 rounded-lg" />
            ) : isWebcamActive ? (
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground animate-pulse-glow" />
                <p className="text-muted-foreground">Camera is active</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Upload your photo or use camera</p>
              </div>
            )}
          </div>

          {/* Dimensions Input */}
          <div className="space-y-3">
            <h5 className="font-medium">Your Dimensions (optional for better fit)</h5>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Height (cm)"
                value={userDimensions.height}
                onChange={(e) => setUserDimensions(prev => ({ ...prev, height: e.target.value }))}
                className="px-3 py-2 border border-border rounded-md bg-background"
              />
              <input
                type="number"
                placeholder="Face Width (cm)"
                value={userDimensions.faceWidth}
                onChange={(e) => setUserDimensions(prev => ({ ...prev, faceWidth: e.target.value }))}
                className="px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Step 2: Choose Product</h4>
          
          <div className="space-y-3">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedProduct?.id === product.id
                    ? "border-primary bg-primary/10 shadow-colorful"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(product.category)}
                  <div className="flex-1">
                    <h5 className="font-medium">{product.name}</h5>
                    <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <span className="font-bold text-primary">${product.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="hero"
              size="lg"
              onClick={applyTryOn}
              className="w-full"
            >
              ✨ Apply Virtual Try-On
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
                Save Result
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};