
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQRCode } from "@/context/qr-code-context";
import { Download, RotateCw } from "lucide-react";
import { useState } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { toast } from "sonner";

type ExportFormat = "png" | "svg" | "jpeg";

export function QRDownload() {
  const { qrConfig, resetQRCode } = useQRCode();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const qrElement = document.querySelector(".qr-code-container");
      
      if (!qrElement) {
        toast.error("QR code element not found");
        return;
      }
      
      let dataUrl: string;
      let filename = `qrafty-qrcode-${Date.now()}`;
      
      switch (format) {
        case "png":
          dataUrl = await htmlToImage.toPng(qrElement as HTMLElement);
          filename += ".png";
          break;
        case "svg":
          dataUrl = await htmlToImage.toSvg(qrElement as HTMLElement);
          filename += ".svg";
          break;
        case "jpeg":
          dataUrl = await htmlToImage.toJpeg(qrElement as HTMLElement, { quality: 0.95 });
          filename += ".jpg";
          break;
        default:
          dataUrl = await htmlToImage.toPng(qrElement as HTMLElement);
          filename += ".png";
      }
      
      saveAs(dataUrl, filename);
      toast.success(`QR code downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download QR Code</CardTitle>
        <CardDescription>Export your QR code in different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Select
            value={format}
            onValueChange={(val) => setFormat(val as ExportFormat)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full"
          >
            {isDownloading ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetQRCode}
            className="w-full"
          >
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
