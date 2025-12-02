'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./ui/separator";

export function ManageMembers() {
    const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Manage Members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription>
            Invite new members or manage existing ones.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="members">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="requests">Join Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="members">
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">Add or remove members from this circle.</p>
                </div>
            </TabsContent>
            <TabsContent value="requests">
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">Approve or deny requests to join this circle.</p>
                </div>
            </TabsContent>
        </Tabs>
        <Separator />
         <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
