
import { useQRCode } from "@/context/qr-code-context";
import { QRCodeCanvas } from "qrcode.react";
import { Card } from "./ui/card";
import { useRef } from "react";

export function QRCodeGenerator() {
  const { qrConfig } = useQRCode();
  const { data, style } = qrConfig;
  const qrRef = useRef<HTMLDivElement>(null);

  // Logic to generate QR code based on content type
  const getQRValue = () => {
    switch (data.type) {
      case "url":
        return data.value;
      case "text":
        return data.value;
      case "email":
        return `mailto:${data.value}`;
      case "phone":
        return `tel:${data.value}`;
      case "sms":
        return `sms:${data.value}`;
      case "wifi":
        return `WIFI:T:${data.wifiEncryption};S:${data.wifiName};P:${data.wifiPassword};;`;
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName};;;
FN:${data.firstName} ${data.lastName}
ORG:${data.organization || ""}
TITLE:${data.title || ""}
TEL:${data.phone || ""}
EMAIL:${data.email || ""}
ADR:;;${data.address || ""};;;;
URL:${data.website || ""}
NOTE:${data.note || ""}
END:VCARD`;
      default:
        return data.value;
    }
  };

  // Calculate dot/corner styles based on the module shape
  const getDotStyle = () => {
    switch (style.moduleShape) {
      case "rounded":
        return { 
          width: 0.9, 
          height: 0.9, 
          rx: 5
        };
      case "dots":
        return { 
          width: 0.7, 
          height: 0.7, 
          style: "circle"
        };
      default:
        return undefined;
    }
  };

  // Calculate corner styles
  const getCornerSquareStyle = () => {
    switch (style.cornerSquareType) {
      case "rounded":
        return { type: "extra-rounded" as const };
      case "dots":
        return { type: "dot" as const };
      default:
        return undefined;
    }
  };

  const getCornerDotStyle = () => {
    switch (style.cornerDotType) {
      case "rounded":
        return { type: "rounded" as const };
      case "dots":
        return { type: "dot" as const };
      default:
        return undefined;
    }
  };

  return (
    <Card className="flex justify-center items-center p-8 overflow-hidden bg-white dark:bg-card rounded-lg shadow-md">
      <div ref={qrRef} className="qr-code-container">
        <QRCodeCanvas
          value={getQRValue()}
          size={style.size}
          bgColor={style.backgroundColor}
          fgColor={style.foregroundColor}
          level={style.errorCorrectionLevel}
          includeMargin={true}
          imageSettings={undefined}
          // @ts-expect-error QRCodeCanvas has additional props from qrcode.react
          // that are not typed in the package
          dotStyle={getDotStyle()}
          cornerSquareStyle={getCornerSquareStyle()}
          cornerDotStyle={getCornerDotStyle()}
        />
      </div>
    </Card>
  );
}
