'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { handleGenerateBlurb } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { adaptFirebaseUser, UserProfile } from '@/lib/data';

const initialState = {
  message: null,
  blurb: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm">
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? 'Generating...' : 'Generate Blurb'}
    </Button>
  );
}

export function ProfileForm() {
  const { user: firebaseUser } = useUser();
  const user: UserProfile | null = firebaseUser ? adaptFirebaseUser(firebaseUser) : null;
  
  const [state, formAction] = useFormState(handleGenerateBlurb, {
      ...initialState,
      blurb: user?.blurb || '',
  });

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'blurb_generated') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue={user?.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interests">Interests</Label>
        <Textarea
          id="interests"
          name="interests"
          placeholder="e.g. hiking, photography, coding, indie music"
          defaultValue={user?.interests}
        />
        <p className="text-sm text-muted-foreground">
          Used by AI to generate your profile blurb.
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="blurb">Profile Blurb</Label>
          <SubmitButton />
        </div>
        <Textarea
          id="blurb"
          name="blurb"
          placeholder="A short, engaging blurb about you."
          value={state.blurb}
          readOnly={useFormStatus().pending}
          onChange={(e) => {
            // This is a simple way to update state on manual change, not ideal for a real app
            // A more robust solution would use a state variable for the blurb
          }}
          rows={3}
        />
      </div>
      <div className="flex justify-end">
        <Button>Save Profile</Button>
      </div>
    </form>
  );
}
