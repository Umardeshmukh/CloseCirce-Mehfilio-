'use client';

import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithCredential,
  PhoneAuthProvider
} from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { setDocumentNonBlocking } from '../non-blocking-updates';

// This hook encapsulates authentication actions.
export function useAuthActions() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  // After a user signs up or signs in, create their profile in Firestore.
  const createUserProfile = useCallback(async (user: any, additionalData = {}) => {
    if (!user?.email) {
      console.warn("User has no email, skipping profile creation.");
      return;
    }
    const userRef = doc(firestore, `user_profiles`, user.email);
    const profileData = {
      email: user.email,
      userName: user.displayName || user.email.split('@')[0],
      profilePicture: user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`,
      ...additionalData,
    };
    // Use non-blocking write
    setDocumentNonBlocking(userRef, profileData, { merge: true });
  }, [firestore]);


  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      toast({ title: 'Signed in successfully!' });
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast({ variant: 'destructive', title: 'Sign-in failed', description: error.message });
      throw error;
    }
  }, [auth, createUserProfile, toast]);


  // Sign up with email and password
  const signUpWithEmail = useCallback(async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await createUserProfile(userCredential.user);
        toast({
            title: "Verification email sent!",
            description: "Please check your inbox to verify your account.",
        });
    } catch (error: any) {
        console.error("Email sign-up error:", error);
        toast({ variant: 'destructive', title: 'Sign-up failed', description: error.message });
        throw error;
    }
  }, [auth, createUserProfile, toast]);


  // Sign in with email and password
  const signInWithEmail = useCallback(async (email, password) => {
     try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Signed in successfully!' });
    } catch (error: any) {
      console.error("Email sign-in error:", error);
      toast({ variant: 'destructive', title: 'Sign-in failed', description: error.message });
      throw error;
    }
  }, [auth, toast]);
  

  // Sign in with phone number
  const signInWithPhoneNumber: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<string> = useCallback(
    async (phoneNumber, appVerifier) => {
      try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        // In a real app, you might store this confirmationResult in component state
        // to use it when the user enters the OTP. For this hook, we'll return the verificationId
        return confirmationResult.verificationId;
      } catch (error: any) {
        console.error("Phone sign-in error:", error);
        toast({ variant: 'destructive', title: 'Phone sign-in failed', description: error.message });
        throw error;
      }
    }, [auth, toast]
  );
  
  // Verify OTP
  const verifyOtp = useCallback(async (verificationId: string, otp: string) => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        const userCredential = await signInWithCredential(auth, credential);
        // Phone users may not have an email, so we need to handle that.
        // For now, we'll create a profile with a placeholder.
        await createUserProfile(userCredential.user, { mobileNumber: userCredential.user.phoneNumber });
        toast({ title: 'Signed in successfully!' });
    } catch(error: any) {
        console.error("OTP verification error:", error);
        toast({ variant: 'destructive', title: 'OTP verification failed', description: error.message });
        throw error;
    }
  }, [auth, createUserProfile, toast]);


  // Sign out
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      toast({ title: 'Signed out.' });
    } catch (error: any) {
      console.error("Sign-out error:", error);
      toast({ variant: 'destructive', title: 'Sign-out failed', description: error.message });
      throw error;
    }
  }, [auth, toast]);

  return {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signInWithPhoneNumber,
    verifyOtp,
    signOut,
  };
}

export { useAuth };
