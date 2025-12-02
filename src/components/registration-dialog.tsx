'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth, useAuthActions } from "@/firebase/auth/use-auth-actions";
import { RecaptchaVerifier } from "firebase/auth";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.34v2.84C4.13 20.98 7.72 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.96 14.25c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18V7.03H2.34C1.47 8.83 1 10.57 1 12.32s.47 3.49 1.34 5.29l3.62-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.72 1 4.13 3.02 2.34 5.87l3.62 2.84C6.82 7.26 9.2 5.38 12 5.38z"
      fill="#EA4335"
    />
  </svg>
);

type RegistrationDialogProps = {
    open: boolean;
}

export function RegistrationDialog({ open }: RegistrationDialogProps) {
  const { signInWithGoogle, signUpWithEmail, signInWithPhoneNumber, verifyOtp } = useAuthActions();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUpWithEmail(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Ensure the reCAPTCHA verifier is created only on the client
      if (typeof window !== "undefined" && auth) {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible'
        });
        const verId = await signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
        setVerificationId(verId);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (verificationId) {
        try {
            await verifyOtp(verificationId, otp);
        } catch (err: any) {
            setError(err.message);
        }
    } else {
        setError("Verification ID not found. Please request a new OTP.");
    }
  };


  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} hideCloseButton>
        <DialogHeader className="text-center">
          <DialogTitle>Welcome to CircleShare!</DialogTitle>
          <DialogDescription>
            Sign up to connect with your friends.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Tabs defaultValue="email">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <form onSubmit={handleEmailSignUp} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
          <TabsContent value="phone">
            {!verificationId ? (
              <form onSubmit={handlePhoneSignIn} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 123 456 7890" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Send OTP</Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4">
                 <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input id="otp" type="text" placeholder="Enter 6-digit code" value={otp} onChange={e => setOtp(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Verify OTP</Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
        
        {error && <p className="text-sm text-center text-destructive">{error}</p>}
        <div id="recaptcha-container" className="my-4"></div>
      </DialogContent>
    </Dialog>
  );
}
