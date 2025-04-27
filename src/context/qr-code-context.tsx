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
  foregroundColor: '#000000e6',
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
    opacity: 1,
    margin: 5,
    removeStroke: true
  },
  gradient: {
    type: 'linear',
    rotation: 45,
    colorStops: ['#000000e6', '#000000e6']
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
    setQRConfig((prev) => ({
      ...prev,
      style: { ...prev.style, ...style },
    }));
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
