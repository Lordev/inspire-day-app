import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
                        Join{' '}
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
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </motion.div>

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
                                />
                                <InputError message={errors.password} />
                            </motion.div>

                            <motion.div 
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                />
                                <InputError message={errors.password_confirmation} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <Button 
                                    type="submit"
                                    variant={"default"}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                                    Create your account
                                </Button>
                            </motion.div>
                        </div>

                        <motion.div 
                            className="text-center text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                        >
                            Already have an account?{' '}
                            <TextLink 
                                href={route('login')} 
                                tabIndex={6}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Sign in
                            </TextLink>
                        </motion.div>
                    </form>
                </motion.div>

                <motion.div 
                    className="text-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                >
                    By creating an account, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</a>
                </motion.div>
            </motion.div>
        </div>
    );
}