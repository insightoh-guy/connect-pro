import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const TrainerOnboarding = () => {
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
            <CardTitle className="text-3xl">Trainer Profile Setup</CardTitle>
            <CardDescription>Share your expertise - MatchaTrainer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name *</Label>
                <Input
                  id="full-name"
                  placeholder="Your Full Name"
                  required
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer, Marketing Specialist"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience-years">Years of Experience</Label>
                <Input
                  id="experience-years"
                  type="number"
                  min="0"
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly-rate-cents">Hourly Rate (₹)</Label>
                <Input
                  id="hourly-rate-cents"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="2000"
                  title="Rate will be stored in paise (smallest currency unit)"
                />
                <p className="text-xs text-muted-foreground">Enter amount in rupees (will be converted to paise)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Share your background, teaching philosophy, and what makes you unique..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn Profile</Label>
                <Input
                  id="linkedin-url"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location-id">Location</Label>
                <Input
                  id="location-id"
                  placeholder="City, State (Location ID will be assigned)"
                />
                <p className="text-xs text-muted-foreground">This will be linked to location database</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability Status</Label>
                <Select>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Not Available</SelectItem>
                  </SelectContent>
                </Select>
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

export default TrainerOnboarding;
