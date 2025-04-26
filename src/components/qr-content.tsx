
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQRCode } from "@/context/qr-code-context";
import { QRCodeType } from "@/types/qr-code";
import { useState } from "react";

export function QRContent() {
  const { qrConfig, updateQRData } = useQRCode();
  const { data } = qrConfig;

  const contentTypes: { value: QRCodeType; label: string }[] = [
    { value: "text", label: "Text" },
    { value: "url", label: "URL" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "sms", label: "SMS" },
    { value: "wifi", label: "WiFi" },
    { value: "vcard", label: "Contact (vCard)" },
  ];

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("Hello, World!");
  const [sms, setSms] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [note, setNote] = useState("");

  const handleTypeChange = (type: QRCodeType) => {
    updateQRData({ type });
    
    // Set default value based on type
    switch (type) {
      case "url":
        updateQRData({ value: url });
        break;
      case "text":
        updateQRData({ value: text });
        break;
      case "email":
        updateQRData({ value: email });
        break;
      case "phone":
        updateQRData({ value: phone });
        break;
      case "sms":
        updateQRData({ value: sms });
        break;
      case "wifi":
        updateQRData({ 
          value: "WIFI", 
          wifiName, 
          wifiPassword, 
          wifiEncryption 
        });
        break;
      case "vcard":
        updateQRData({ 
          value: "VCARD", 
          firstName, 
          lastName, 
          organization, 
          title, 
          email, 
          phone, 
          address, 
          website, 
          note 
        });
        break;
    }
  };

  const renderContentForm = () => {
    switch (data.type) {
      case "url":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  updateQRData({ value: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      case "text":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                placeholder="Enter your text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  updateQRData({ value: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      case "email":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  updateQRData({ value: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      case "phone":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  updateQRData({ value: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      case "sms":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sms">SMS Number</Label>
              <Input
                id="sms"
                type="tel"
                placeholder="+1234567890"
                value={sms}
                onChange={(e) => {
                  setSms(e.target.value);
                  updateQRData({ value: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      case "wifi":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifiName">Network Name (SSID)</Label>
              <Input
                id="wifiName"
                placeholder="WiFi Network Name"
                value={wifiName}
                onChange={(e) => {
                  setWifiName(e.target.value);
                  updateQRData({ wifiName: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wifiPassword">Password</Label>
              <Input
                id="wifiPassword"
                type="password"
                placeholder="WiFi Password"
                value={wifiPassword}
                onChange={(e) => {
                  setWifiPassword(e.target.value);
                  updateQRData({ wifiPassword: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wifiEncryption">Encryption</Label>
              <Select 
                value={wifiEncryption} 
                onValueChange={(val: "WPA" | "WEP" | "nopass") => {
                  setWifiEncryption(val);
                  updateQRData({ wifiEncryption: val });
                }}
              >
                <SelectTrigger id="wifiEncryption">
                  <SelectValue placeholder="Select encryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case "vcard":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    updateQRData({ firstName: e.target.value });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    updateQRData({ lastName: e.target.value });
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Organization"
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  updateQRData({ organization: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="Job Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  updateQRData({ title: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vcardEmail">Email</Label>
              <Input
                id="vcardEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  updateQRData({ email: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vcardPhone">Phone</Label>
              <Input
                id="vcardPhone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  updateQRData({ phone: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  updateQRData({ address: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="Website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  updateQRData({ website: e.target.value });
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Input
                id="note"
                placeholder="Note"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  updateQRData({ note: e.target.value });
                }}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Content</CardTitle>
        <CardDescription>Choose what information to encode in your QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contentType">Content Type</Label>
          <Select 
            defaultValue={data.type} 
            onValueChange={(val) => handleTypeChange(val as QRCodeType)}
          >
            <SelectTrigger id="contentType">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {renderContentForm()}
      </CardContent>
    </Card>
  );
}
