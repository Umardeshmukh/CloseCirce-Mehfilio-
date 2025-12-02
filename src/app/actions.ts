'use server';

import { generateProfileBlurb } from '@/ai/flows/generate-profile-blurb';
import { z } from 'zod';

const blurbSchema = z.object({
  interests: z.string().min(3, { message: 'Please enter at least one interest.' }),
});

type State = {
  blurb?: string | null;
  message?: string | null;
};

export async function handleGenerateBlurb(
  prevState: State,
  formData: FormData
): Promise<State> {

  const validatedFields = blurbSchema.safeParse({
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.interests?.join(', '),
      blurb: prevState.blurb
    };
  }

  try {
    const result = await generateProfileBlurb({ interests: validatedFields.data.interests });
    return {
      blurb: result.blurb,
      message: 'blurb_generated',
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate blurb. Please try again.',
      blurb: prevState.blurb,
    };
  }
}
