'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Image as ImageIcon, Video } from "lucide-react"

export function CreatePostForm() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user0/200/200" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea 
              placeholder="What's on your mind?" 
              className="mb-2 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
