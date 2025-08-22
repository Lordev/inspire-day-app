import EditHistoryResponse from '@/components/edit-history-response';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TextArea } from '@/components/ui/textarea';
import { Head, router, useForm } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { CalendarDays, Pencil, SendHorizontal, Settings } from 'lucide-react';
import { FormEvent } from 'react';

interface Prompt {
    id: number;
    prompt: string;
    response: string | null;
    date: string;
    status: 'answered' | 'unanswered';
}

interface Props {
    prompt: Prompt;
    history: Prompt[];
}

export default function Dashboard({ prompt, history }: Props) {
    const { data, setData, post, processing } = useForm({
        response: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('saveResponse', { prompt: prompt.id }));
    };

    return (
        <>
            <Head title="Daily Reflection" />
            <div className="mx-auto flex h-full max-w-5xl flex-1 flex-col overflow-x-auto p-4 md:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">Daily Reflection</h1>
                    <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={route('preferences')}>
                            <Settings size={16} />
                            <span className="hidden sm:inline">Preferences</span>
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="overflow-hidden border-slate-200 shadow-md">
                            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                <div className="flex items-start justify-between">
                                    <div>
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
                                    {prompt.status === 'answered' && <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Completed</span>}
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                                    <p className="text-lg font-medium text-slate-800 italic">"{prompt.prompt}"</p>
                                </div>

                                {prompt.status === 'unanswered' ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="response" className="mb-2 block text-sm font-medium text-slate-700">
                                                Your Reflection:
                                            </label>
                                            <TextArea
                                                id="response"
                                                name="response"
                                                value={data.response}
                                                onChange={(e) => setData('response', e.target.value)}
                                                placeholder="Take a moment to reflect on this prompt. How does it relate to your day or recent experiences?"
                                                required
                                                className="min-h-[180px] resize-y text-base"
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="submit" disabled={processing} className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                                {processing ? 'Saving...' : 'Save Reflection'}
                                                {!processing && <SendHorizontal size={18} />}
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                        <h4 className="mb-3 text-lg font-medium text-slate-800">Your Reflection:</h4>
                                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                                            <p className="whitespace-pre-wrap">{prompt.response}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Dialog.Root>
                                                <Dialog.Trigger asChild>
                                                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                        <Pencil size={14} />
                                                        Edit Reflection
                                                    </Button>
                                                </Dialog.Trigger>
                                                <Dialog.Content className="sm:max-w-[500px]">
                                                    <Dialog.Title>Edit Your Reflection</Dialog.Title>
                                                    <div className="mt-4">
                                                        <h2 className="mb-2 font-bold text-slate-800">"{prompt.prompt}"</h2>
                                                        <EditHistoryResponse
                                                            prompt={prompt}
                                                            onSave={(response) => {
                                                                router.post(route('saveResponse', { prompt: prompt.id }), { response });
                                                            }}
                                                            processing={processing}
                                                        />
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog.Root>
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* History sidebar - takes 1/3 width on large screens */}
                    <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Card className="h-full border-slate-200 shadow-md">
                            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={18} className="text-indigo-600" />
                                    <CardTitle className="text-lg">Previous Reflections</CardTitle>
                                </div>
                                <CardDescription>Your reflection journey</CardDescription>
                            </CardHeader>

                            <CardContent className="max-h-[500px] overflow-y-auto p-4">
                                {history.length > 0 ? (
                                    <div className="space-y-3">
                                        {history.map((item, index) => (
                                            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }}>
                                                <div className={`rounded-lg p-3 transition-all ${item.status === 'answered' ? 'border border-green-100 bg-gradient-to-r from-blue-50 to-green-50' : 'border border-slate-200 bg-slate-50'}`}>
                                                    <div className="mb-1 flex items-start justify-between">
                                                        <p className="text-sm font-medium text-slate-700">{item.date}</p>
                                                        <div className="flex items-center">
                                                            {item.status === 'answered' ? (
                                                                <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-green-500" title="Completed"></span>
                                                            ) : (
                                                                <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-amber-500" title="Pending"></span>
                                                            )}
                                                            <Dialog.Root>
                                                                <Dialog.Trigger asChild>
                                                                    <button className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700" aria-label="Edit journal">
                                                                        <Pencil size={14} />
                                                                    </button>
                                                                </Dialog.Trigger>
                                                                <Dialog.Content className="sm:max-w-[500px]">
                                                                    <Dialog.Title>Edit Previous Reflection</Dialog.Title>
                                                                    <div className="mt-4">
                                                                        <h2 className="mb-2 font-bold text-slate-800">"{item.prompt}"</h2>
                                                                        <EditHistoryResponse
                                                                            prompt={item}
                                                                            onSave={(response) => {
                                                                                router.post(route('saveResponse', { prompt: item.id }), { response });
                                                                            }}
                                                                            processing={processing}
                                                                        />
                                                                    </div>
                                                                </Dialog.Content>
                                                            </Dialog.Root>
                                                        </div>
                                                    </div>
                                                    <p className="line-clamp-2 text-sm text-slate-600">"{item.prompt}"</p>
                                                    {item.response && <p className="mt-1 line-clamp-1 text-xs text-slate-500">{item.response.length > 60 ? `${item.response.substring(0, 60)}...` : item.response}</p>}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-slate-500">No previous reflections yet</p>
                                        <p className="mt-1 text-sm text-slate-400">Your history will appear here</p>
                                    </div>
                                )}
                            </CardContent>

                            {history.length > 4 && (
                                <CardFooter className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                                    <Button variant="outline" size="sm" className="w-full text-sm">
                                        View All Reflections
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
