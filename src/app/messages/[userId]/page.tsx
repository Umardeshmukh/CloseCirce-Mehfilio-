'use client';

import { notFound, useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { MotionWrapper } from '@/components/motion-wrapper';
import { use } from 'react';
import { useUser } from '@/firebase';
import { adaptFirebaseUser, UserProfile } from '@/lib/data';

// This is a mock function. Replace with actual data fetching.
const getOtherUser = (userId: string): UserProfile | undefined => {
    // In a real app, you would fetch this from Firestore
    if (userId === 'mock-user-2') {
        return {
            id: 'mock-user-2',
            name: 'Alex',
            email: 'alex@example.com',
            avatarUrl: 'https://picsum.photos/seed/user2/200/200'
        }
    }
    return undefined;
}


export default function MessagePage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const otherUser = getOtherUser(userId);
  const { user: firebaseUser } = useUser();
  const currentUser = firebaseUser ? adaptFirebaseUser(firebaseUser) : null;

  if (!otherUser) {
    notFound();
  }

  // Mock messages
  const messages = [
    { id: 1, authorId: otherUser.id, text: 'Hey there!' },
    { id: 2, authorId: currentUser?.id, text: 'Hi! How are you?' },
    { id: 3, authorId: otherUser.id, text: 'Doing great, thanks for asking!' },
  ];

  return (
    <MotionWrapper className="flex flex-col h-screen">
      <header className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/circles/circle-1`}>
            <ArrowLeft />
          </Link>
        </Button>
        <Avatar>
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
          <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold">{otherUser.name}</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.authorId === currentUser?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.authorId !== currentUser?.id && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs rounded-lg px-4 py-2 ${
                message.authorId === currentUser?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p>{message.text}</p>
            </div>
            {message.authorId === currentUser?.id && currentUser && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <footer className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="icon">
            <Send />
          </Button>
        </div>
      </footer>
    </MotionWrapper>
  );
}
