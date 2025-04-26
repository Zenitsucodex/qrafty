import { QRContent } from "@/components/qr-content";
import { QRDownload } from "@/components/qr-download";
import { QRCodeGenerator } from "@/components/qr-code-generator";
import { QRStyle } from "@/components/qr-style";
import { Header } from "@/components/header";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">QR Code Generator</h1>
          <p className="text-center text-muted-foreground">
            Create, customize, and download QR codes for any purpose
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with settings */}
          <div className="order-2 lg:order-1 space-y-6">
            <QRContent />
            <QRStyle />
            <QRDownload />
          </div>
          
          {/* QR code preview area */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{Math.round(zoomLevel * 100)}%</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 min-h-[400px] bg-secondary/50 rounded-md overflow-auto">
                <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s" }}>
                  <QRCodeGenerator />
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Drag to move or use zoom controls
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Qrafty QR Code Generator © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
