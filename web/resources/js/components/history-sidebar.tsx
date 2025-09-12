import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Heading, Flex } from '@radix-ui/themes';
import { Prompt } from '@/types';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { containerSlideUp } from '@/utils/animations';
import HistoryList from './history-list';

interface HistorySidebarProps {
    history: Prompt[];
}

export default function HistorySidebar({ history }: HistorySidebarProps) {
    return (
        <motion.div
            className="lg:col-span-1 max-h-[85vh] overflow-hidden"
            {...containerSlideUp(0.2)}
        >
                <Card className="pb-1 h-full">
                    <CardHeader>
                        <Flex align="center" gap="2">
                            <CalendarDays size={18} />
                            <Heading asChild size="4" className="text-lg">
                            <span>Previous Reflections</span>
                        </Heading>
                    </Flex>
                    <CardDescription>Your reflection journey</CardDescription>
                </CardHeader>
                <CardContent className="p-4 overflow-x-auto lg:overflow-y-auto">
                    {history.length > 0 ? (
                            <Flex direction="column" className="lg:flex-col lg:h-full" gap="3">
                                    <HistoryList items={history} />
                            </Flex>
                    ) : (
                        <Flex direction="column" align="center" className="py-8 text-center">
                            <p className="text-muted-foreground">No previous reflections yet</p>
                            <p className="mt-1 text-sm text-muted-foreground/60">Your history will appear here</p>
                        </Flex>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}


