'use client';

import { useState, useEffect } from 'react';
import { RegistrationDialog } from './registration-dialog';

export function AuthHandler() {
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    // Check if the user has registered before.
    // In a real app, this would be a proper session check.
    const hasRegistered = localStorage.getItem('hasRegistered');
    if (!hasRegistered) {
      setShowRegistration(true);
    }
  }, []);

  const handleRegister = () => {
    // Mark the user as registered.
    localStorage.setItem('hasRegistered', 'true');
    setShowRegistration(false);
    // Here you would typically also update user data, maybe refetch it.
    window.location.reload(); // Simple way to refresh the app state
  };

  return <RegistrationDialog open={showRegistration} onRegister={handleRegister} />;
}
