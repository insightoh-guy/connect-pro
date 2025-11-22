import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/role-selection")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Vendor Profile Setup</CardTitle>
            <CardDescription>Tell us about your business - MatchaTrainer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name *</Label>
                <Input
                  id="name"
                  placeholder="Your Company Name"
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor-type-id">Vendor Type *</Label>
                <Select required>
                  <SelectTrigger id="vendor-type-id">
                    <SelectValue placeholder="Select vendor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Training Organization</SelectItem>
                    <SelectItem value="2">Consultancy</SelectItem>
                    <SelectItem value="3">Corporate</SelectItem>
                    <SelectItem value="4">Educational Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gst-id">GST ID</Label>
                <Input
                  id="gst-id"
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                  pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                  title="GST ID must match format: 22AAAAA0000A1Z5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Name *</Label>
                <Input
                  id="contact-name"
                  placeholder="Primary Contact Person"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone *</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+919876543210"
                  required
                  maxLength={15}
                  pattern="^\+91[0-9]{10}$"
                  title="Phone number must be in format +91XXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="contact@company.com"
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-line1">Address Line 1 *</Label>
                <Input
                  id="address-line1"
                  placeholder="Street Address"
                  required
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-line2">Address Line 2</Label>
                <Input
                  id="address-line2"
                  placeholder="Building, Suite, etc."
                  maxLength={255}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    required
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code *</Label>
                  <Input
                    id="postal-code"
                    placeholder="110001"
                    required
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    placeholder="India"
                    defaultValue="India"
                    required
                    maxLength={100}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Setting up profile..." : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorOnboarding;
