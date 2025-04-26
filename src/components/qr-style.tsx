
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useQRCode } from "@/context/qr-code-context";
import { useIsMobile } from "@/hooks/use-mobile";

export function QRStyle() {
  const { qrConfig, updateQRStyle } = useQRCode();
  const { style } = qrConfig;
  const isMobile = useIsMobile();

  const moduleShapes = [
    { value: "square", label: "Square" },
    { value: "rounded", label: "Rounded" },
    { value: "dots", label: "Dots" },
    { value: "classy", label: "Classy" },
    { value: "classy-rounded", label: "Classy Rounded" },
    { value: "sharp", label: "Sharp" },
  ];

  const cornerShapes = [
    { value: "square", label: "Square" },
    { value: "extra-rounded", label: "Extra Rounded" },
    { value: "rounded", label: "Rounded" },
    { value: "dots", label: "Dots" },
  ];

  const errorCorrectionLevels = [
    { value: "L", label: "Low (7%)" },
    { value: "M", label: "Medium (15%)" },
    { value: "Q", label: "Quartile (25%)" },
    { value: "H", label: "High (30%)" },
  ];

  return (
    <Card className="w-full">
      <CardHeader className={isMobile ? "p-4" : "p-6"}>
        <CardTitle>QR Style</CardTitle>
        <CardDescription>Customize the appearance of your QR code</CardDescription>
      </CardHeader>
      <CardContent className={`space-y-6 ${isMobile ? "p-4" : "p-6"} pt-0`}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="foregroundColor">Foreground Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="foregroundColor"
                type="color"
                className="w-12 h-10 p-1"
                value={style.foregroundColor}
                onChange={(e) => updateQRStyle({ foregroundColor: e.target.value })}
              />
              <Input
                value={style.foregroundColor}
                onChange={(e) => updateQRStyle({ foregroundColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="backgroundColor"
                type="color"
                className="w-12 h-10 p-1"
                value={style.backgroundColor}
                onChange={(e) => updateQRStyle({ backgroundColor: e.target.value })}
              />
              <Input
                value={style.backgroundColor}
                onChange={(e) => updateQRStyle({ backgroundColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="moduleShape">Module Shape</Label>
          <Select 
            defaultValue={style.moduleShape}
            onValueChange={(val) => updateQRStyle({ moduleShape: val as any })}
          >
            <SelectTrigger id="moduleShape">
              <SelectValue placeholder="Select module shape" />
            </SelectTrigger>
            <SelectContent>
              {moduleShapes.map((shape) => (
                <SelectItem key={shape.value} value={shape.value}>
                  {shape.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cornerSquareType">Corner Square Style</Label>
          <Select 
            defaultValue={style.cornerSquareType}
            onValueChange={(val) => updateQRStyle({ cornerSquareType: val as any })}
          >
            <SelectTrigger id="cornerSquareType">
              <SelectValue placeholder="Select corner square style" />
            </SelectTrigger>
            <SelectContent>
              {cornerShapes.map((shape) => (
                <SelectItem key={shape.value} value={shape.value}>
                  {shape.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cornerDotType">Corner Dot Style</Label>
          <Select 
            defaultValue={style.cornerDotType}
            onValueChange={(val) => updateQRStyle({ cornerDotType: val as any })}
          >
            <SelectTrigger id="cornerDotType">
              <SelectValue placeholder="Select corner dot style" />
            </SelectTrigger>
            <SelectContent>
              {moduleShapes.slice(0, 3).map((shape) => (
                <SelectItem key={shape.value} value={shape.value}>
                  {shape.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="errorCorrectionLevel">Error Correction Level</Label>
          <Select 
            defaultValue={style.errorCorrectionLevel}
            onValueChange={(val) => updateQRStyle({ errorCorrectionLevel: val as any })}
          >
            <SelectTrigger id="errorCorrectionLevel">
              <SelectValue placeholder="Select error correction level" />
            </SelectTrigger>
            <SelectContent>
              {errorCorrectionLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="size">Size: {style.size}px</Label>
          </div>
          <Slider
            id="size"
            min={128}
            max={512}
            step={8}
            value={[style.size]}
            onValueChange={(val) => updateQRStyle({ size: val[0] })}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="padding">Padding: {style.padding}px</Label>
          </div>
          <Slider
            id="padding"
            min={0}
            max={50}
            step={2}
            value={[style.padding || 0]}
            onValueChange={(val) => updateQRStyle({ padding: val[0] })}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
