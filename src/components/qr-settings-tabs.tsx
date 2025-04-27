
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRContent } from "./qr-content";
import { QRStyle } from "./qr-style";
import { QRLogo } from "./qr-logo";
import { QRDownload } from "./qr-download";
import { Card } from "./ui/card";

export function QRSettingsTabs() {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="logo">Logo</TabsTrigger>
        <TabsTrigger value="download">Download</TabsTrigger>
      </TabsList>
      <Card className="mt-4 border-none shadow-none">
        <TabsContent value="content" className="m-0">
          <QRContent />
        </TabsContent>
        <TabsContent value="style" className="m-0">
          <QRStyle />
        </TabsContent>
        <TabsContent value="logo" className="m-0">
          <QRLogo />
        </TabsContent>
        <TabsContent value="download" className="m-0">
          <QRDownload />
        </TabsContent>
      </Card>
    </Tabs>
  );
}
