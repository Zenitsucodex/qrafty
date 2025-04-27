
import { useQRCode } from "@/context/qr-code-context";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { DotType } from "@/types/qr-code";

export function QRCodeGenerator() {
  const { qrConfig } = useQRCode();
  const { data, style } = qrConfig;
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

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

  useEffect(() => {
    if (!qrRef.current) return;

    const moduleShape: DotType = (['square', 'rounded', 'dots'] as DotType[]).includes(style.moduleShape as DotType) 
      ? style.moduleShape as DotType
      : 'square';

    const config: any = {
      width: style.size,
      height: style.size,
      data: getQRValue(),
      margin: style.padding,
      dotsOptions: {
        color: style.gradient ? undefined : style.foregroundColor,
        gradient: style.gradient ? {
          type: style.gradient.type,
          rotation: style.gradient.rotation,
          colorStops: style.gradient.colorStops,
        } : undefined,
        type: moduleShape
      },
      backgroundOptions: {
        color: style.backgroundColor,
      },
      cornersSquareOptions: {
        color: style.gradient ? style.gradient.colorStops[0] : style.foregroundColor,
        type: style.cornerSquareType
      },
      cornersDotOptions: {
        color: style.gradient ? style.gradient.colorStops[0] : style.foregroundColor,
        type: style.cornerDotType
      },
      qrOptions: {
        errorCorrectionLevel: style.errorCorrectionLevel
      }
    };

    // Add logo configuration if a logo source is provided
    if (style.logo?.src) {
      config.image = style.logo.src;
      config.imageOptions = {
        hideBackgroundDots: style.logo.removeStroke,
        imageSize: style.logo.size,
        margin: style.logo.margin,
        crossOrigin: "anonymous",
      };
    }

    qrCode.current = new QRCodeStyling(config);

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, [data, style]);

  return (
    <Card className="flex justify-center items-center p-4 sm:p-8 overflow-hidden bg-white dark:bg-card rounded-lg shadow-md">
      <div ref={qrRef} className="qr-code-container"></div>
    </Card>
  );
}
