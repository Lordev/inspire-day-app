import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEvent } from 'react';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        niche: string | null;
        tone: string | null;
    };
    options: {
        niches: Record<string, string>;
        tones: Record<string, string>;
    };
}

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
        <>
            <Head title="Preferences" />
            <div className="mx-auto flex h-full max-w-5xl flex-1 flex-col overflow-x-auto p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="overflow-hidden border-slate-200 shadow-md max-w-md mx-auto">
                        <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <div className="flex items-start">
                                <div>
                                    <CardTitle className="text-xl text-slate-800">Customize Your Experience</CardTitle>
                                    <CardDescription>Personalize your daily reflection prompts</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} id="preferences-form">
                                <div className="space-y-6">
                                    <div className="space-y-3">
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
                                    </div>
                                    
                                    <div className="space-y-3">
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
                                    </div>
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="border-t px-6 py-4">
                            <div className="flex w-full justify-between gap-3">
                                <Button variant="outline" asChild>
                                    <a href={route('dashboard')}>Cancel</a>
                                </Button>
                                <Button 
                                    type="submit" 
                                    form="preferences-form" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? 'Saving...' : 'Save Preferences'}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
