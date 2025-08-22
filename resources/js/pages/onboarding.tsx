import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Welcome to InspireDay" />
            
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div 
                    className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-blue-100 opacity-60"
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
                    className="absolute bottom-10 left-[15%] w-40 h-40 rounded-full bg-indigo-100 opacity-60"
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
                    className="absolute top-[30%] left-[5%] w-24 h-24 rounded-lg bg-purple-100 opacity-60"
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
                <Card className="shadow-xl border-slate-200">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                {step === 1 ? 'What are you interested in?' : 'How should we talk to you?'}
                            </span>
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
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(options.niches).map(([key, label]) => (
                                        <motion.div
                                            key={key}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <button
                                                type="button"
                                                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                                                    data.niche === key 
                                                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                                                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm'
                                                }`}
                                                onClick={() => setData('niche', key)}
                                            >
                                                <div className="flex flex-col h-24 justify-between">
                                                    <div className="text-lg font-medium text-slate-800">{label}</div>
                                                    {data.niche === key && (
                                                        <motion.div 
                                                            className="self-end rounded-full bg-blue-500 text-white p-1"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(options.tones).map(([key, label]) => (
                                        <motion.div
                                            key={key}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <button
                                                type="button"
                                                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                                                    data.tone === key 
                                                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                                                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm'
                                                }`}
                                                onClick={() => setData('tone', key)}
                                            >
                                                <div className="flex flex-col h-24 justify-between">
                                                    <div className="text-lg font-medium text-slate-800">{label}</div>
                                                    {data.tone === key && (
                                                        <motion.div 
                                                            className="self-end rounded-full bg-blue-500 text-white p-1"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
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

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>You can always change these preferences later</p>
                </div>
            </motion.div>
        </div>
    );
}