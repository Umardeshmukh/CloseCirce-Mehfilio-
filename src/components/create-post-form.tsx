'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Image as ImageIcon, Video, Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Select defaultValue="permanent">
                  <SelectTrigger className="w-auto border-0 gap-1 bg-transparent text-muted-foreground focus:ring-0 focus:ring-offset-0">
                    <Clock className="h-5 w-5" />
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Visible for 1 hour</SelectItem>
                    <SelectItem value="5h">Visible for 5 hours</SelectItem>
                    <SelectItem value="12h">Visible for 12 hours</SelectItem>
                    <SelectItem value="24h">Visible for 24 hours</SelectItem>
                    <SelectItem value="1w">Visible for 1 week</SelectItem>
                    <SelectItem value="permanent">Until I delete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
