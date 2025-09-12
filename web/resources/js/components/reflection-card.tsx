import ReflectionEditor from './reflection-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { currentPromptAtom, currentUserIdAtom, resetUserStateAtom } from '@/lib/atoms';
import { Prompt } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { Flex } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { Blockquote } from './ui/blockquote';
import { useEffect } from 'react';

interface ReflectionCardProps {
    prompt: Prompt;
}

export default function ReflectionCard({ prompt }: ReflectionCardProps) {
    const [currentPrompt, setCurrentPrompt] = useAtom(currentPromptAtom);
    const [currentUserId, setCurrentUserId] = useAtom(currentUserIdAtom);
    const resetUserState = useSetAtom(resetUserStateAtom);

    useEffect(() => {
        if (currentUserId !== null && prompt.user_id !== currentUserId) {
            resetUserState();
            setCurrentUserId(prompt.user_id);
            setCurrentPrompt(prompt);
            return;
        }
        
        if (currentUserId === null) {
            setCurrentUserId(prompt.user_id);
        }
        
        if (!currentPrompt && prompt) {
            setCurrentPrompt(prompt);
        }
    }, [prompt.id, prompt.user_id, setCurrentPrompt, prompt, currentPrompt, currentUserId, setCurrentUserId, resetUserState]);

    if (!currentPrompt) {
        return (
            <motion.section className="lg:col-span-2 xl:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                    <CardContent className="p-6">
                        <CardDescription>No prompt available at the moment. Please try again later.</CardDescription>
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
                            <CardTitle>Today's Reflection</CardTitle>
                            <CardDescription>{formatDate(new Date())}</CardDescription>
                        </Flex>

                    </Flex>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 p-6 h-full">
                    <Blockquote>"{currentPrompt.prompt}"</Blockquote>
                    <ReflectionEditor />
                </CardContent>
            </Card>
        </motion.section>
    );
}
