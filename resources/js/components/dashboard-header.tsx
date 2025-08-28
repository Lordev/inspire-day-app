import { Button } from '@/components/ui/button';
import { Heading, Flex } from '@radix-ui/themes';
import { Settings } from 'lucide-react';


export default function DashboardHeader() {
    return (
        <Flex align="center" justify="between" className="mb-6">
            <Heading variant="accent" size="lg" weight="bold">
                Daily Reflection
            </Heading>
            <Button variant="outline" size="sm" asChild>
                <a href={route('preferences')}>
                    <Settings size={16} />
                    <span className="hidden sm:inline">Preferences</span>
                </a>
            </Button>
        </Flex>
    );
}
