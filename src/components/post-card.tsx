'use client';

import { useState, useEffect } from 'react';
import type { Post } from '@/lib/data';
import { getUser } from '@/lib/data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Clock } from 'lucide-react';
import { formatDistanceToNow, formatDistance } from 'date-fns';
import Image from 'next/image';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function PostCard({ post }: { post: Post }) {
  const author = getUser(post.authorId);
  const [isLiked, setIsLiked] = useState(post.likes.includes('1')); // Check if current user '1' liked
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (post.expiresAt) {
      const calculateTimeLeft = () => {
        const expires = new Date(post.expiresAt!).getTime();
        const now = new Date().getTime();
        
        if (expires > now) {
          const distance = formatDistance(expires, now);
          setTimeLeft(`Visible for ${distance}`);
        } else {
          setTimeLeft("Expired");
        }
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [post.expiresAt]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  
  if (!author) return null;

  return (
    <Card className="rounded-none border-x-0 sm:border-x sm:rounded-lg">
      <CardHeader className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{author.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {post.imageUrl && (
          <div className="relative aspect-square w-full overflow-hidden">
            <Image 
              src={post.imageUrl} 
              alt="Post image" 
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="social media post"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-3">
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleLike} className="h-8 w-8">
                <Heart className={cn("h-6 w-6", isLiked ? "text-red-500 fill-current" : "")}/>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-6 w-6"/>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href={`/messages/${post.authorId}`}>
                <Send className="h-6 w-6"/>
              </Link>
            </Button>
            </div>
        </div>
        
        {likesCount > 0 && (
            <p className="font-semibold text-sm">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</p>
        )}

        <div>
            <span className="font-semibold text-sm mr-2">{author.name}</span>
            <span className="text-sm">{post.content}</span>
        </div>
        
        {post.expiresAt ? (
            <div className="flex items-center text-xs text-muted-foreground uppercase">
                <Clock className="h-3 w-3 mr-1" />
                <span>{timeLeft}</span>
            </div>
        ) : (
            <p className="text-xs text-muted-foreground uppercase">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
        )}

        {post.comments.length > 0 && (
            <p className="text-sm text-muted-foreground font-medium cursor-pointer">
                View all {post.comments.length} comments
            </p>
        )}

        <div className="w-full flex items-center gap-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src="https://picsum.photos/seed/user0/200/200" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Input placeholder="Add a comment..." className="h-8 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"/>
        </div>
      </CardFooter>
    </Card>
  );
}
