import ReflectionForm from '@/components/reflection-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { currentPromptAtom } from '@/lib/atoms';
import { Prompt } from '@/types';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Badge } from './ui/badge';

interface ReflectionCardProps {
    prompt: Prompt;
}

export default function ReflectionCard({ prompt }: ReflectionCardProps) {
    const [currentPrompt] = useAtom(currentPromptAtom);

    const activePrompt = currentPrompt || prompt;

    return (
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-slate-200 shadow-md">
                <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle className="text-xl text-slate-800">Today's Reflection</CardTitle>
                            <CardDescription>
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </CardDescription>
                        </div>
                        {activePrompt.status === 'answered' ? (
                            <Badge variant={'default'}>Completed</Badge>
                        ) : (
                            <Badge variant={'outline'} className="text-slate-600">
                                Unanswered
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                        <p className="text-lg font-medium text-slate-800 italic">"{activePrompt.prompt}"</p>
                    </div>
                    <ReflectionForm prompt={activePrompt} />
                </CardContent>
            </Card>
        </motion.div>
    );
}
