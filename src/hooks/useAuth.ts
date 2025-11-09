import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
} from '../lib/auth';

export const useAuth = () => {
  const { user, loading, getIdToken } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleSignInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmail(email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setError(null);
      await signUpWithEmail(email, password, displayName);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOut();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    getIdToken,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
  };
};