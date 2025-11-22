import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Choose Your Path</h1>
          <p className="text-muted-foreground">MatchaTrainer - Select your role to continue</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate("/vendor-onboarding")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join as a Vendor</CardTitle>
              <CardDescription className="text-base">
                Showcase your products and services to a wide audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• List your products and services</li>
                <li>• Reach potential customers</li>
                <li>• Manage your business profile</li>
                <li>• Track sales and analytics</li>
              </ul>
              <Button className="w-full" size="lg">
                Continue as Vendor
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate("/trainer-onboarding")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join as a Trainer</CardTitle>
              <CardDescription className="text-base">
                Share your expertise and help others learn and grow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Create and share courses</li>
                <li>• Connect with learners</li>
                <li>• Build your professional brand</li>
                <li>• Track your impact</li>
              </ul>
              <Button className="w-full" size="lg">
                Continue as Trainer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
