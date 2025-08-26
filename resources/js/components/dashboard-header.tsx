import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Settings } from 'lucide-react';

export default function DashboardHeader() {
    return (
        <div className="mb-6 flex items-center justify-between">
            <Heading variant="accent" size="lg" weight="bold">
                Daily Reflection
            </Heading>
            <Button variant="outline" size="sm" asChild>
                <a href={route('preferences')}>
                    <Settings size={16} />
                    <span className="hidden sm:inline">Preferences</span>
                </a>
            </Button>
        </div>
    );
}
