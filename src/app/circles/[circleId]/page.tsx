import { circles } from "@/lib/data";
import { CreatePostForm } from "@/components/create-post-form";
import { PostCard } from "@/components/post-card";
import { notFound } from "next/navigation";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Link, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CirclePage({ params }: { params: { circleId: string } }) {
  const circle = circles.find(c => c.id === params.circleId);
  if (!circle) notFound();

  // sort posts chronologically
  const sortedPosts = [...circle.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <MotionWrapper className="container mx-auto max-w-2xl py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{circle.name}</h1>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy invite link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
      <CreatePostForm />
      <div className="mt-8 space-y-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No posts here yet.</p>
                <p className="text-muted-foreground">Be the first to share something!</p>
            </div>
        )}
      </div>
    </MotionWrapper>
  );
}
