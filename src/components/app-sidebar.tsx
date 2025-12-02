'use client';

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
  CirclePlus,
  Cog,
  Plus,
  Users,
  Wind,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { circles, users } from '@/lib/data';
import { UserNav } from './user-nav';

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users.find((u) => u.id === '1'); // Mock current user

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
                <SidebarMenuButton variant="outline" className="border-dashed">
                    <CirclePlus className="mr-2" />
                    Create Circle
                </SidebarMenuButton>
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
