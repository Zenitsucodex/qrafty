import { useQRCode } from "@/context/qr-code-context";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

export function QRCodeGenerator() {
  const { qrConfig } = useQRCode();
  const { data, style } = qrConfig;
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

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

  useEffect(() => {
    if (!qrRef.current) return;

    qrCode.current = new QRCodeStyling({
      width: style.size,
      height: style.size,
      data: getQRValue(),
      dotsOptions: {
        color: style.foregroundColor,
        type: style.moduleShape === "dots" ? "dots" : 
              style.moduleShape === "rounded" ? "rounded" : "square"
      },
      backgroundOptions: {
        color: style.backgroundColor,
      },
      cornersSquareOptions: {
        color: style.foregroundColor,
        type: style.cornerSquareType === "dots" ? "dot" : 
              style.cornerSquareType === "rounded" ? "rounded" : "square"
      },
      cornersDotOptions: {
        color: style.foregroundColor,
        type: style.cornerDotType === "dots" ? "dot" : 
              style.cornerDotType === "rounded" ? "rounded" : "square"
      },
      qrOptions: {
        errorCorrectionLevel: style.errorCorrectionLevel
      }
    });

    // Clear previous content and append new QR code
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, [data, style]);

  return (
    <Card className="flex justify-center items-center p-8 overflow-hidden bg-white dark:bg-card rounded-lg shadow-md">
      <div ref={qrRef} className="qr-code-container"></div>
    </Card>
  );
}
