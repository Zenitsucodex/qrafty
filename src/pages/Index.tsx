
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { Header } from "@/components/header";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { QRSettingsTabs } from "@/components/qr-settings-tabs";

const Index = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const isMobile = useIsMobile();

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">QRafty Code Generator</h1>
          <p className="text-center text-muted-foreground">
            Create, customize, and download QR codes for any purpose
          </p>
        </div>

        {/* Preview section */}
        <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">Preview</h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "icon"}
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "icon"}
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-2 sm:p-4 min-h-[300px] sm:min-h-[400px] bg-secondary/50 rounded-md overflow-auto">
            <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s" }}>
              <QRCodeGenerator />
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Drag to move or use zoom controls
          </div>
        </div>

        {/* Settings tabs section */}
        <div className="w-full">
          <QRSettingsTabs />
        </div>
      </main>
      
      <footer className="border-t py-4 sm:py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>QRafty Code Generator © {new Date().getFullYear()} | Created by <a href="https://vineetcodes.vercel.app" target="_blank" rel="noopener noreferrer" className="text-qr-purple hover:underline">Vineet</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
