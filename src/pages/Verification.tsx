import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const TIMER_DURATION = 60; // 60 seconds countdown

const Verification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isVerified]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 4-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification (in production, this would call your backend)
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      toast({
        title: "Success!",
        description: "Phone number verified successfully",
      });

      // Navigate to role selection after a brief delay
      setTimeout(() => {
        navigate("/role-selection");
      }, 1500);
    }, 1000);
  };

  const handleResend = () => {
    setTimeLeft(TIMER_DURATION);
    setCanResend(false);
    setOtp("");
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your phone",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className={`w-full max-w-md shadow-lg transition-colors duration-300 ${isVerified ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}`}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            {isVerified ? "Verification Successful!" : "Mobile Phone Verification"}
          </CardTitle>
          <CardDescription>
            {isVerified 
              ? "Your phone number has been verified. Redirecting..." 
              : "Enter the 4-digit verification code that was sent to your phone number."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={setOtp}
            disabled={isVerified}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          {!isVerified && (
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-muted-foreground">
                  Code expires in <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="text-sm text-destructive font-medium">
                  Code expired
                </p>
              )}
            </div>
          )}

          <Button 
            onClick={handleVerify} 
            className="w-full"
            disabled={isVerifying || isVerified || otp.length !== 4 || canResend}
          >
            {isVerifying ? "Verifying..." : isVerified ? "Verified ✓" : "Verify Account"}
          </Button>

          {!isVerified && (
            <div className="text-sm text-muted-foreground">
              Didn't receive code?{" "}
              <button
                onClick={handleResend}
                className={`font-medium ${canResend ? 'text-primary hover:underline' : 'text-muted-foreground cursor-not-allowed'}`}
                type="button"
                disabled={!canResend}
              >
                Resend {!canResend && `(${formatTime(timeLeft)})`}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;
