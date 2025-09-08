import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { RadioCardsRoot, RadioCardsItem } from '@/components/ui/radio-cards';

interface Props {
    options: {
        niches: Record<string, string>;
        tones: Record<string, string>;
    };
}

export default function Onboarding({ options }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        niche: '',
        tone: '',
    });

    const [step, setStep] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('storePreferences'));
    };

    const goToNextStep = () => {
        if (data.niche) {
            setStep(2);
        }
    };

    const goToPrevStep = () => {
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Welcome to InspireDay" />
            
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div 
                    className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-primary/20"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute bottom-10 left-[15%] w-40 h-40 rounded-full bg-secondary/30"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ 
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div 
                    className="absolute top-[30%] left-[5%] w-24 h-24 rounded-lg bg-accent/25"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />
            </div>

            <motion.div 
                className="max-w-xl w-full relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="shadow-xl border-border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">
                                {step === 1 ? 'What are you interested in?' : 'How should we talk to you?'}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 ? 
                                'Choose a topic area for your reflection prompts' : 
                                'Select a tone that resonates with you'
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form id="onboarding-form" onSubmit={handleSubmit}>
                            {step === 1 ? (
                                <RadioCardsRoot value={data.niche} onValueChange={(value) => setData('niche', value)} className="grid-cols-2 gap-4">
                                    {Object.entries(options.niches).map(([key, label]) => (
                                        <motion.div
                                            key={key}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <RadioCardsItem
                                                value={key}
                                                size="large"
                                                variant="secondary"
                                            >
                                                <div className="text-lg font-medium text-foreground">{label}</div>
                                            </RadioCardsItem>
                                        </motion.div>
                                    ))}
                                </RadioCardsRoot>
                            ) : (
                                <RadioCardsRoot value={data.tone} onValueChange={(value) => setData('tone', value)} className="grid-cols-2 gap-4">
                                    {Object.entries(options.tones).map(([key, label]) => (
                                        <motion.div
                                            key={key}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <RadioCardsItem
                                                value={key}
                                                size="large"
                                                variant="secondary"
                                            >
                                                <div className="text-lg font-medium text-foreground">{label}</div>
                                            </RadioCardsItem>
                                        </motion.div>
                                    ))}
                                </RadioCardsRoot>
                            )}
                            {errors.niche && <p className="mt-2 text-sm text-red-600">{errors.niche}</p>}
                            {errors.tone && <p className="mt-2 text-sm text-red-600">{errors.tone}</p>}
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        {step === 1 ? (
                            <div className="flex w-full justify-end">
                                <Button 
                                    onClick={goToNextStep}
                                    disabled={!data.niche}
                                    className="px-6 py-2"
                                >
                                    Continue
                                </Button>
                            </div>
                        ) : (
                            <div className="flex w-full justify-between">
                                <Button 
                                    variant="outline" 
                                    onClick={goToPrevStep}
                                >
                                    Back
                                </Button>
                                <Button 
                                    type="submit"
                                    form="onboarding-form"
                                    disabled={processing || !data.niche || !data.tone}
                                    className="px-6 py-2"
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Setting Up...
                                        </>
                                    ) : (
                                        'Start My Journey'
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>You can always change these preferences later</p>
                </div>
            </motion.div>
        </div>
    );
}