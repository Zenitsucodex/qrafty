
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { useQRCode } from "@/context/qr-code-context";
import { Switch } from "./ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";

export function QRLogo() {
  const { qrConfig, updateQRStyle } = useQRCode();
  const { logo } = qrConfig.style;
  const isMobile = useIsMobile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        updateQRStyle({ logo: { ...logo!, src } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (values: number[]) => {
    updateQRStyle({ logo: { ...logo!, size: values[0] } });
  };

  const handleMarginChange = (values: number[]) => {
    updateQRStyle({ logo: { ...logo!, margin: values[0] } });
  };

  return (
    <Card className="w-full">
      <CardHeader className={isMobile ? "p-4" : "p-6"}>
        <CardTitle>Logo Customization</CardTitle>
      </CardHeader>
      <CardContent className={`space-y-6 ${isMobile ? "p-4" : "p-6"} pt-0`}>
        <div className="space-y-2">
          <Label htmlFor="logo">Upload Logo</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Logo Size</Label>
              <span className="text-sm text-muted-foreground">
                {Math.round(logo!.size * 100)}%
              </span>
            </div>
            <Slider
              value={[logo!.size]}
              onValueChange={handleSizeChange}
              min={0.05}
              max={0.5}
              step={0.01}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Margin</Label>
              <span className="text-sm text-muted-foreground">{logo!.margin}px</span>
            </div>
            <Slider
              value={[logo!.margin]}
              onValueChange={handleMarginChange}
              min={0}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label>Remove Background</Label>
            <Switch
              checked={logo!.removeStroke}
              onCheckedChange={(checked) =>
                updateQRStyle({ logo: { ...logo!, removeStroke: checked } })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
