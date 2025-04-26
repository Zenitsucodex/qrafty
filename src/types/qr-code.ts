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

export type QRCodeStyle = {
  foregroundColor: string;
  backgroundColor: string;
  moduleShape: 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'sharp';
  cornerSquareType: 'square' | 'rounded' | 'dots' | 'extra-rounded';
  cornerDotType: 'square' | 'rounded' | 'dots';
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  size: number;
  padding: number;
};

export type QRCodeConfig = {
  data: QRCodeData;
  style: QRCodeStyle;
};
