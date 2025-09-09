import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { NotebookPen, Settings, BarChart3 } from 'lucide-react';

const mainNavItems: NavItem[] = [
	{
		title: 'Reflections',
		href: '/dashboard',
		icon: NotebookPen,
	},
	{
		title: 'Settings',
		href: '/settings',
		icon: Settings,
	},
	{
		title: 'Statistics',
		href: '/statistics',
		icon: BarChart3,
	},
];

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarContent>
				<NavMain items={mainNavItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavFooter className="mt-4" />
			</SidebarFooter>
		</Sidebar>
	);
}
