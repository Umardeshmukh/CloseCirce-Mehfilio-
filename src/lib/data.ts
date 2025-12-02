import { type User as FirebaseUser } from 'firebase/auth';

export type UserProfile = {
  id: string; // This will be the Firebase Auth UID
  name: string;
  avatarUrl: string;
  blurb?: string;
  interests?: string;
  email: string | null;
};

export type Comment = {
  id: string;
  text: string;
  authorId: string;
  createdAt: string;
};

export type Post = {
  id:string;
  authorId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  expiresAt: string | null; // null means it never expires
  likes: string[];
  comments: Comment[];
};

export type Circle = {
  id: string;
  name: string;
  members: string[];
  posts: Post[];
};

// This function adapts a Firebase User to your app's UserProfile type.
// You'll use this to maintain a consistent user object shape in your app.
export function adaptFirebaseUser(firebaseUser: FirebaseUser): UserProfile {
    return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Anonymous User',
        email: firebaseUser.email,
        avatarUrl: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/200/200`,
        blurb: '',
        interests: '',
    }
}
