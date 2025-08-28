import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fadeInLeft, fadeInUp } from '@/utils/animations';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Register" />

            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 right-[10%] h-32 w-32 rounded-full bg-blue-100 opacity-40"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-10 left-[10%] h-24 w-24 rounded-lg bg-purple-100 opacity-40"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center">
                    <motion.h1 className="mb-2 text-4xl font-bold text-gray-900" {...fadeInUp(0.2)}>
                        Welcome back to{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">InspireDay AI</span>
                    </motion.h1>
                    <motion.p className="text-lg text-gray-600" {...fadeInUp(0.3)}>
                        Start your mindful reflection journey today
                    </motion.p>
                </div>

                <motion.div
                    className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="space-y-6">
                            <motion.div className="space-y-2" {...fadeInLeft(0.6)}>
                                <Label htmlFor="email" className="font-medium text-gray-700">
                                    Email address
                                </Label>
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
                                    className="border-slate-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError message={errors.email} />
                            </motion.div>

                            <motion.div className="space-y-2" {...fadeInLeft(0.7)}>
                                <Label htmlFor="password" className="font-medium text-gray-700">
                                    Password
                                </Label>
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
                                    className="border-slate-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError message={errors.password} />
                            </motion.div>

                            <motion.div {...fadeInUp(0.9)}>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 py-3 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl disabled:opacity-50"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
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
