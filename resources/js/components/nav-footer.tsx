import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LogOut, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* Current Time */}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-muted-foreground cursor-default hover:bg-transparent">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{formatTime(currentTime)}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Logout Button */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Link href={route('logout')} method="post" as="button">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
