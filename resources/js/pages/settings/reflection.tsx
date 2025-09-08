import { Options, User, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { RadioCardsRoot, RadioCardsItem } from '@/components/ui/radio-cards';
import { Transition } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reflection settings',
        href: '/settings/reflection',
    },
];

interface ReflectionProps {
    user: User;
    options: Options;
}

export default function Reflection({ user, options }: ReflectionProps) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        niche: user.niche || Object.keys(options.niches)[0],
        tone: user.tone || Object.keys(options.tones)[0],
    });

    const handleSubmit = (e?: FormEvent) => {
        if (e) e.preventDefault();
        post(route('settings.reflection.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reflection settings" />

            <SettingsLayout activeTab="reflection" title="Reflection Preferences" description="Customize your daily reflection prompts">
                <Flex direction="column" gap="6">
                    <Flex direction="column" gap="4">
                        <Label className="text-lg font-semibold text-foreground">Topic Focus</Label>
                        <p className="mb-2 text-sm text-muted-foreground">Choose what areas you'd like to focus on in your reflections</p>

                        <div className="hidden md:block">
                            <RadioCardsRoot value={data.niche} onValueChange={(value) => setData('niche', value)} columns={{ initial: "1", sm: "2" }}>
                                {Object.entries(options.niches).map(([key, value]) => (
                                    <RadioCardsItem key={key} value={key} variant="secondary">
                                        {value}
                                    </RadioCardsItem>
                                ))}
                            </RadioCardsRoot>
                        </div>

                        <div className="md:hidden">
                            <Select name="niche" value={data.niche} onValueChange={(value) => setData('niche', value)}>
                                <SelectTrigger className="border-border">
                                    <SelectValue placeholder="Select a topic focus" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(options.niches).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </Flex>

                    <Flex direction="column" gap="4">
                        <Label className="text-lg font-semibold text-foreground">Reflection Style</Label>
                        <p className="mb-2 text-sm text-muted-foreground">Select the tone and approach for your daily prompts</p>

                        <div className="hidden md:block">
                            <RadioCardsRoot value={data.tone} onValueChange={(value) => setData('tone', value)} columns={{ initial: "1", sm: "2" }}>
                                {Object.entries(options.tones).map(([key, value]) => (
                                    <RadioCardsItem key={key} value={key} variant="secondary">
                                        {value}
                                    </RadioCardsItem>
                                ))}
                            </RadioCardsRoot>
                        </div>

                        <div className="md:hidden">
                            <Select name="tone" value={data.tone} onValueChange={(value) => setData('tone', value)}>
                                <SelectTrigger className="border-border">
                                    <SelectValue placeholder="Select a reflection style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(options.tones).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Flex className="md:hidden mt-4" align="center" gap="2">
                            <Button size="sm" onClick={handleSubmit} disabled={processing}>Save Preferences</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </Flex>
                    </Flex>
                </Flex>
            </SettingsLayout>
        </AppLayout>
    );
}
