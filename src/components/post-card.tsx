'use client';

import { useState } from 'react';
import type { Post } from '@/lib/data';
import { getUser } from '@/lib/data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

export function PostCard({ post }: { post: Post }) {
  const author = getUser(post.authorId);
  const [isLiked, setIsLiked] = useState(post.likes.includes('1')); // Check if current user '1' liked
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  
  if (!author) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-2">
            <Heart className={cn("h-5 w-5", isLiked ? "text-red-500 fill-current" : "")}/>
            <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5"/>
            <span>{post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </Button>
        </div>
        <div className="w-full flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/user0/200/200" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Input placeholder="Write a comment..." />
        </div>
      </CardFooter>
    </Card>
  );
}
