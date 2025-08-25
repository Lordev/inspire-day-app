import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormEvent } from 'react';
import { Label } from '@/components/ui/label';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Preferences',
        href: '/preferences',
    },
];

export default function Preferences({ user, options }: Props) {
    const { data, setData, post, processing } = useForm({
        niche: user.niche || options.niches[0],
        tone: user.tone || options.tones[0],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('storePreferences'));
    };

    return (
        <>
        <Head title="Preferences" />
            <div className="flex h-full flex-1 flex-col p-4">
                <Card className="max-w-lg mx-auto">
                    <CardHeader>
                        <CardTitle>Journal Preferences</CardTitle>
                        <CardDescription>Customize your journaling experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} id="preferences-form">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="niche">Niche</Label>
                                    <Select 
                                        name="niche"
                                        value={data.niche}
                                        onValueChange={(value) => setData('niche', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a niche" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(options.niches).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="tone">Tone</Label>
                                    <Select 
                                        name="tone"
                                        value={data.tone}
                                        onValueChange={(value) => setData('tone', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a tone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(options.tones).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" asChild>
                            <a href={route('dashboard')}>Cancel</a>
                        </Button>
                        <Button type="submit" form="preferences-form" disabled={processing}>
                            Save Preferences
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
