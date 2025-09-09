import { Heading, Flex } from '@radix-ui/themes';
import { SidebarTrigger } from '@/components/ui/sidebar';


export default function DashboardHeader({title}: {title?: string}) {
    return (
        <Flex align="center" className="h-[10vh]" gap="4">
            <SidebarTrigger />
            <Heading size="6" weight="bold">
                {title || "Your Dashboard"}
            </Heading>
        </Flex>
    );
}
