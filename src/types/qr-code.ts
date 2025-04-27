export type QRCodeType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard';

export type QRCodeData = {
  type: QRCodeType;
  value: string;
  // Additional fields for wifi
  wifiName?: string;
  wifiPassword?: string;
  wifiEncryption?: 'WPA' | 'WEP' | 'nopass';
  // Additional fields for vcard
  firstName?: string;
  lastName?: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  note?: string;
};

// Define valid types for QR code styling based on qr-code-styling library's supported types
export type DotType = 'square' | 'rounded' | 'dots';
export type ModuleShape = DotType | 'classy' | 'classy-rounded' | 'sharp';
export type CornerSquareType = 'square' | 'rounded' | 'dots' | 'extra-rounded';
export type CornerDotType = 'square' | 'rounded' | 'dots';

export type GradientOptions = {
  type: 'linear';
  rotation: number;
  colorStops: [string, string];
};

export type LogoOptions = {
  src: string;
  size: number;
  opacity: number;
  margin: number;
  removeStroke: boolean;
};

export type QRCodeStyle = {
  foregroundColor: string;
  backgroundColor: string;
  moduleShape: ModuleShape;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  size: number;
  padding: number;
  logo?: LogoOptions;
  gradient?: GradientOptions;
};

export type QRCodeConfig = {
  data: QRCodeData;
  style: QRCodeStyle;
};
