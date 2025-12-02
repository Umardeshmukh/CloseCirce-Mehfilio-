'use client';
import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Cog,
  MessageSquare,
  Users,
  Wind,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserNav } from './user-nav';
import { getUser } from '@/lib/data';
import { CreateCircleDialog } from './create-circle-dialog';
import { type Circle } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = getUser('1'); 
  const [circles, setCircles] = useState<Circle[]>([]);

  const handleCreateCircle = (name: string) => {
    const newCircle = {
        id: `circle-${Date.now()}`,
        name,
        members: ['1'],
        posts: []
    }
    setCircles(prev => [...prev, newCircle]);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" className="text-primary">
              <Wind />
            </Link>
          </Button>
          <span className="font-semibold text-lg">CircleShare</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/messages')}>
                    <Link href="/messages"><MessageSquare />Messages</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Users className="mr-2" />
            My Circles
          </SidebarGroupLabel>
          <SidebarMenu>
            {circles.map((circle) => (
              <SidebarMenuItem key={circle.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/circles/${circle.id}`}
                >
                  <Link href={`/circles/${circle.id}`}>{circle.name}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <CreateCircleDialog onCreate={handleCreateCircle} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                    <Link href="/settings"><Cog />Settings</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        {currentUser && <UserNav user={currentUser} />}
      </SidebarFooter>
    </Sidebar>
  );
}
