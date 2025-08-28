import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Heading, Flex } from '@radix-ui/themes';
import { Prompt } from '@/types';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import HistoryItem from '@/components/history-item';

interface HistorySidebarProps {
    history: Prompt[];
}

export default function HistorySidebar({ history }: HistorySidebarProps) {
    return (
        <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card>
                <CardHeader>
                    <Flex align="center" gap="2">
                        <CalendarDays size={18} />
                        <Heading asChild size="md" className="text-lg">
                            <span>Previous Reflections</span>
                        </Heading>
                    </Flex>
                    <CardDescription>Your reflection journey</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto p-4">
                    {history.length > 0 ? (
                        <Flex direction="column" gap="3">
                            {history.map((item, index) => (
                                <HistoryItem key={item.id} item={item} index={index} />
                            ))}
                        </Flex>
                    ) : (
                        <Flex direction="column" align="center" className="py-8 text-center">
                            <p className="text-slate-500">No previous reflections yet</p>
                            <p className="mt-1 text-sm text-slate-400">Your history will appear here</p>
                        </Flex>
                    )}
                </CardContent>
                {history.length > 4 && (
                    <CardFooter className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                        <Button variant="outline" size="sm" className="w-full">
                            View All Reflections
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}


