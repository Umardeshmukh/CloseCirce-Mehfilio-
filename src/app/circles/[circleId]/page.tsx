import { CreatePostForm } from "@/components/create-post-form";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ManageMembers } from "@/components/manage-members";

// NOTE: This is a temporary solution. We will replace this with a proper data fetching solution later.
const getCircle = (id: string) => ({ id, name: "My Circle", posts: [] });

export default function CirclePage({ params }: { params: { circleId: string } }) {
    const circle = getCircle(params.circleId);


  // sort posts by expiration date, putting permanent posts at the end
  const sortedPosts = [...(circle.posts || [])].sort((a, b) => {
    const now = new Date().getTime();
    
    // Filter out expired posts
    const aIsExpired = a.expiresAt && new Date(a.expiresAt).getTime() < now;
    const bIsExpired = b.expiresAt && new Date(b.expiresAt).getTime() < now;

    if (aIsExpired && !bIsExpired) return 1;
    if (!aIsExpired && bIsExpired) return -1;
    if (aIsExpired && bIsExpired) return 0;


    const aTime = a.expiresAt ? new Date(a.expiresAt).getTime() : Infinity;
    const bTime = b.expiresAt ? new Date(b.expiresAt).getTime() : Infinity;
    
    if (aTime === Infinity && bTime === Infinity) {
      // If both are permanent, sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    return aTime - bTime;
  });

  return (
    <MotionWrapper className="container mx-auto max-w-2xl py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{circle.name}</h1>
        <div className="flex items-center gap-2">
            <ManageMembers />
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
      </div>
      <CreatePostForm />
      <div className="mt-8 space-y-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => <div key={post.id}>Post Card Placeholder</div>)
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
