import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Wind } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

export default function Home() {
  return (
    <MotionWrapper className="flex-1 p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Wind className="w-10 h-10 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Welcome to CircleShare</h1>
      </div>
      <Card className="bg-card/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users />
            Select a Circle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Choose a circle from the sidebar to see what your friends are up to, or create a new one to get started.
          </p>
        </CardContent>
      </Card>
    </MotionWrapper>
  );
}
