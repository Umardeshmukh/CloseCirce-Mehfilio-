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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";

type CreateCircleDialogProps = {
    onCreate: (name: string) => void;
}

export function CreateCircleDialog({ onCreate }: CreateCircleDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleCreate = () => {
        if(name.trim()){
            onCreate(name.trim());
            setName('');
            setOpen(false);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed w-full justify-start">
            <CirclePlus className="mr-2" />
            Create Circle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new Circle</DialogTitle>
          <DialogDescription>
            Give your new circle a name. You can invite friends later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Create Circle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
