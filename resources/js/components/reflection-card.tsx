import ReflectionEditor from './reflection-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { currentPromptAtom } from '@/lib/atoms';
import { Prompt } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Badge } from './ui/badge';
import { Blockquote } from './ui/blockquote';

interface ReflectionCardProps {
    prompt: Prompt;
}

export default function ReflectionCard({ prompt }: ReflectionCardProps) {
    const [currentPrompt] = useAtom(currentPromptAtom);

    const activePrompt = currentPrompt || prompt;
    const status: Prompt['status'] = activePrompt.status;
    const isAnswered = status === 'answered';

    if (!activePrompt) {
        return (
            <motion.section className="lg:col-span-2 xl:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                    <CardContent className="p-6">
                        <CardDescription as="p">No prompt available at the moment. Please try again later.</CardDescription>
                    </CardContent>
                </Card>
            </motion.section>
        );
    }

    return (
        <motion.section className="xl:col-span-3 lg:col-span-2 max-h-[85vh]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full bg-card">
                <CardHeader >
                    <Flex direction="row" justify="between" align="start">
                        <Flex direction="column" gap="2">
                            <CardTitle as="h2">Today's Reflection </CardTitle>
                            <CardDescription as="p">{formatDate(new Date())} </CardDescription>
                        </Flex>

                    </Flex>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6 h-full">
                    <Blockquote>"{activePrompt.prompt}"</Blockquote>
                    <ReflectionEditor prompt={activePrompt} />
                </CardContent>
            </Card>
        </motion.section>
    );
}
