
import { createContext, useContext, useState } from "react";
import { QRCodeConfig, QRCodeData, QRCodeStyle } from "@/types/qr-code";
import { toast } from "sonner";

type QRCodeContextType = {
  qrConfig: QRCodeConfig;
  updateQRData: (data: Partial<QRCodeData>) => void;
  updateQRStyle: (style: Partial<QRCodeStyle>) => void;
  resetQRCode: () => void;
};

const defaultQRData: QRCodeData = {
  type: 'url',
  value: 'https://example.com',
};

const defaultQRStyle: QRCodeStyle = {
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  moduleShape: 'square',
  cornerSquareType: 'square',
  cornerDotType: 'square',
  errorCorrectionLevel: 'M',
  size: 256,
  padding: 0,
  logo: {
    src: '',
    size: 0.2,
    margin: 5,
    removeStroke: true
  },
  gradient: {
    type: 'linear',
    rotation: 45,
    colorStops: ['#000000', '#000000']
  }
};

const defaultQRConfig: QRCodeConfig = {
  data: defaultQRData,
  style: defaultQRStyle,
};

const QRCodeContext = createContext<QRCodeContextType | undefined>(undefined);

export function QRCodeProvider({ children }: { children: React.ReactNode }) {
  const [qrConfig, setQRConfig] = useState<QRCodeConfig>(defaultQRConfig);

  const updateQRData = (data: Partial<QRCodeData>) => {
    setQRConfig((prev) => ({
      ...prev,
      data: { ...prev.data, ...data },
    }));
  };

  const updateQRStyle = (style: Partial<QRCodeStyle>) => {
    setQRConfig((prev) => {
      // Create a new style object with the updates
      const newStyle = { ...prev.style, ...style };
      
      // If foreground color is changing, also update gradient color stops if they match the old foreground color
      if (style.foregroundColor && prev.style.gradient) {
        // Check if both gradient stops are the same as the old foreground color
        if (prev.style.gradient.colorStops[0] === prev.style.foregroundColor && 
            prev.style.gradient.colorStops[1] === prev.style.foregroundColor) {
          // Update both gradient stops to the new foreground color
          newStyle.gradient = {
            ...prev.style.gradient,
            colorStops: [style.foregroundColor, style.foregroundColor]
          };
        }
      }
      
      return {
        ...prev,
        style: newStyle,
      };
    });
  };

  const resetQRCode = () => {
    setQRConfig(defaultQRConfig);
    toast.success("QR Code reset to default");
  };

  return (
    <QRCodeContext.Provider
      value={{ qrConfig, updateQRData, updateQRStyle, resetQRCode }}
    >
      {children}
    </QRCodeContext.Provider>
  );
}

export function useQRCode() {
  const context = useContext(QRCodeContext);
  if (context === undefined) {
    throw new Error("useQRCode must be used within a QRCodeProvider");
  }
  return context;
}
