'use client';

import { useUser } from '@/firebase';
import { RegistrationDialog } from './registration-dialog';
import { Skeleton } from './ui/skeleton';

export function AuthHandler() {
  const { user, isUserLoading } = useUser();

  // Show a loading state while Firebase is checking the auth status
  if (isUserLoading) {
    return (
      <div className="fixed inset-0 z-[101] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  // If the user is not logged in after the check, show the registration dialog
  const showRegistration = !user;

  return <RegistrationDialog open={showRegistration} />;
}
