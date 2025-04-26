
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export function Header() {
  return (
    <header className="border-b sticky top-0 z-30 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <QrCode className="h-6 w-6 text-qr-purple" />
          <span className="font-bold text-xl">Qrafty</span>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
