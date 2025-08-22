import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Register" />
            
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                    className="absolute top-10 right-[10%] w-32 h-32 rounded-full bg-blue-100 opacity-40"
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
                    className="absolute bottom-10 left-[10%] w-24 h-24 rounded-lg bg-purple-100 opacity-40"
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -20, 0]
                    }}
                    transition={{ 
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <motion.div 
                className="max-w-md w-full space-y-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center">
                    <motion.h1 
                        className="text-4xl font-bold text-gray-900 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Welcome back to{ ' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            InspireDay AI
                        </span>
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Start your mindful reflection journey today
                    </motion.p>
                </div>

                <motion.div 
                    className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="space-y-6">

                            <motion.div 
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Label htmlFor="email" className="text-gray-700 font-medium">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-slate-300"
                                />
                                <InputError message={errors.email} />
                            </motion.div>

                            <motion.div 
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-slate-300"
                                />
                                <InputError message={errors.password} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <Button 
                                    type="submit" 
                                    className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50" 
                                    tabIndex={5} 
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                                    login
                                </Button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}