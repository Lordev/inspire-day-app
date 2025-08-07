import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ prompt, history }: Props) {
    const { data, setData, post, processing } = useForm({
        response: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('saveResponse', { prompt: prompt.id }));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 overflow-x-auto">
                <div className="flex justify-end">
                    <Button variant="outline" asChild>
                        <a href={route('preferences')}>Edit Preferences</a>
                    </Button>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Prompt</CardTitle>
                        <CardDescription>Reflect on your day with the following prompt</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md mb-6">
                            <p className="text-lg">{prompt.prompt}</p>
                        </div>
                        
                        {prompt.status === 'unanswered' ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="response" className="block text-sm font-medium mb-2">
                                        Your Response:
                                    </label>
                                    <Input
                                        id="response"
                                        type="text"
                                        name="response"
                                        value={data.response}
                                        onChange={(e) => setData('response', e.target.value)}
                                        placeholder="Write your reflection here..."
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    Save Response
                                </Button>
                            </form>
                        ) : (
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Your Response:</h4>
                                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                                    <p>{prompt.response}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                {history.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt History</CardTitle>
                            <CardDescription>Your previous reflection prompts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {history.map((item) => (
                                    <div 
                                        key={item.id}
                                        className={`border rounded-lg p-4 ${
                                            item.status === 'answered' ? 'border-green-200' : 'border-gray-200'
                                        }`}
                                    >
                                        <p className="font-medium">
                                            {item.date} - {item.status === 'answered' ? '✓' : '◯'}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">{item.prompt}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
