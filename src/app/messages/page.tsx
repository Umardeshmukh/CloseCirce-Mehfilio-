import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { users } from "@/lib/data";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Messages() {
    // Exclude current user from conversation list
    const otherUsers = users.filter(u => u.id !== '1');
  return (
    <MotionWrapper className="flex-1 p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <MessageSquare className="w-10 h-10 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Conversations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {otherUsers.map(user => (
                <li key={user.id}>
                    <Link href={`/messages/${user.id}`} className="flex items-center gap-4 p-4 hover:bg-accent transition-colors">
                        <Avatar>
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                                Click to view conversation
                            </p>
                        </div>
                    </Link>
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </MotionWrapper>
  );
}
