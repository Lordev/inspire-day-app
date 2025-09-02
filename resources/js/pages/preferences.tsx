import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEvent } from 'react';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Flex } from '@radix-ui/themes';
import AppLayout from '@/layouts/app-layout';
import { options, User } from '@/types';

interface Props {
    user: User;
    options: options
}

const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Preferences', url: '/preferences' },
];


export default function PreferencesPage({ user, options }: Props) {
    const { data, setData, post, processing } = useForm({
        niche: user.niche || Object.values(options.niches)[0],
        tone: user.tone || Object.values(options.tones)[0],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('storePreferences'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preferences" />
            <div className="mx-auto flex h-full max-w-5xl flex-1 flex-col overflow-x-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden border-slate-200 shadow-md max-w-md mx-auto">
                        <CardHeader className="border-b border-slate-100">
                            <Flex direction="row" align="start">
                                <div>
                                    <CardTitle className="text-xl text-slate-800">Customize Your Experience</CardTitle>
                                    <CardDescription>Personalize your daily reflection prompts</CardDescription>
                                </div>
                            </Flex>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} id="preferences-form">
                                <Flex direction="column" gap="6">
                                    <Flex direction="column" gap="3">
                                        <Label htmlFor="niche" className="text-sm font-medium text-slate-700">Topic Focus</Label>
                                        <Select 
                                            name="niche"
                                            value={data.niche}
                                            onValueChange={(value) => setData('niche', value)}
                                        >
                                            <SelectTrigger className="border-slate-200">
                                                <SelectValue placeholder="Select a topic focus" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(options.niches).map(([key, value]) => (
                                                    <SelectItem key={key} value={value}>
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-slate-500">This will influence the types of prompts you receive</p>
                                    </Flex>
                                    
                                    <Flex direction="column" gap="3">
                                        <Label htmlFor="tone" className="text-sm font-medium text-slate-700">Reflection Style</Label>
                                        <Select 
                                            name="tone"
                                            value={data.tone}
                                            onValueChange={(value) => setData('tone', value)}
                                        >
                                            <SelectTrigger className="border-slate-200">
                                                <SelectValue placeholder="Select a reflection style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(options.tones).map(([key, value]) => (
                                                    <SelectItem key={key} value={value}>
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-slate-500">The tone and approach of your daily prompts</p>
                                    </Flex>
                                </Flex>
                            </form>
                        </CardContent>

                        <CardFooter className="border-t px-6 py-4">
                            <Flex direction="row" justify="between" gap="3" className="w-full">
                                <Button variant="outline" asChild>
                                    <a href={route('dashboard')}>Cancel</a>
                                </Button>
                                <Button 
                                    type="submit" 
                                    form="preferences-form" 
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Preferences'}
                                </Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
            </AppLayout>
    );
}
