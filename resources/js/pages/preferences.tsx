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

export default function Preferences({ user }: Props) {
    const { data, setData, post, processing } = useForm({
        niche: user.niche || 'personal growth',
        tone: user.tone || 'reflective',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('storePreferences'));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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
                                            <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                                            <SelectItem value="creativity">Creativity & Writing</SelectItem>
                                            <SelectItem value="wellness">Health & Wellness</SelectItem>
                                            <SelectItem value="personal growth">Personal Growth</SelectItem>
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
                                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                                            <SelectItem value="professional">Professional</SelectItem>
                                            <SelectItem value="reflective">Reflective</SelectItem>
                                            <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
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
        </AppLayout>
    );
}
