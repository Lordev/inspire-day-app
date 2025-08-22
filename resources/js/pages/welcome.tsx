import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import WebsiteLayout from '@/layouts/website-layout';

export default function Welcome() {
    return (
            <WebsiteLayout showHeader showFooter>
                {/* Hero Section with Geometric Shapes */}
                <div className="relative overflow-hidden">
                    {/* Background Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
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
                        className="absolute bottom-10 right-[15%] w-40 h-40  bg-purple-100 opacity-60"
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
                    
                    <div className="container mx-auto px-4 pt-48 pb-48 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div 
                                className="md:w-1/2 text-left mb-10 md:mb-0 md:pr-10"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport= {{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                >
                                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                        Reflect & Grow with <br/>
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                            InspireDay AI
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-xl text-gray-600">
                                        Your personal AI-powered reflection assistant that helps you develop mindfulness through daily prompts.
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport= {{once : true }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    <Button 
                                        variant={"secondary"}
                                        asChild
                                    >
                                        <a href="/register">Get Started</a>
                                    </Button>
                                </motion.div>
                            </div>

                            <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport= {{once : true }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transform rotate-3"></div>
                                    <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                                        <div className="bg-slate-50 p-4 rounded-xl mb-4">
                                            <p className="font-medium text-gray-700 mb-2">Today's Reflection Prompt:</p>
                                            <p className="text-lg text-gray-800">"What small victory are you grateful for today?"</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex-1">
                                                <div className="h-2 bg-blue-100 rounded"></div>
                                            </div>
                                            <div className="ml-4">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
                                                    AI
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Features Section with Cards */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport= {{once : true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900">Experience Mindful Growth</h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                                Discover how InspireDay AI can transform your daily reflection practice
                            </p>
                        </motion.div>
                        
                        <div className="flex flex-wrap -mx-4">
                            {[
                                {
                                    title: "AI-Generated Prompts",
                                    description: "Receive thoughtful prompts tailored to your journey and preferences.",
                                    icon: "✨",
                                    color: "bg-blue-500"
                                },
                                {
                                    title: "Visual Progress Tracking",
                                    description: "See your growth over time with intuitive visualizations and insights.",
                                    icon: "📈",
                                    color: "bg-green-500"
                                },
                                {
                                    title: "Personalized Insights",
                                    description: "Gain deeper understanding through AI analysis of your reflections.",
                                    icon: "🤖",
                                    color: "bg-purple-500"
                                },
                                {
                                    title: "Customizable Experience",
                                    description: "Tailor tone, topics, and timing to match your unique preferences.",
                                    icon: "⚙️",
                                    color: "bg-amber-500"
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport= {{once : true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <div className="h-full flex flex-col bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow hover:shadow-md transition-shadow">
                                        <div className={`${feature.color} text-white text-center py-5`}>
                                            <span className="text-4xl">{feature.icon}</span>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                            <p className="text-gray-600 flex-1">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* How It Works Section */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport= {{once : true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900">How InspireDay Works</h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                                Simple steps to transform your mindfulness practice
                            </p>
                        </motion.div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
                            {[
                                {
                                    step: "1",
                                    title: "Create Your Profile",
                                    description: "Set your preferences for prompts and reflection style"
                                },
                                {
                                    step: "2",
                                    title: "Receive Daily Prompts",
                                    description: "Get AI-generated questions tailored to your journey"
                                },
                                {
                                    step: "3",
                                    title: "Reflect & Record",
                                    description: "Document your thoughts and track your progress"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center max-w-xs text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport= {{once : true }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <div className="container mx-auto px-4">
                        <motion.div 
                            className="max-w-3xl mx-auto text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport= {{once : true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Reflection Practice?</h2>
                            <p className="text-xl mb-8 text-blue-100">
                                Join thousands of users who've improved their mindfulness with InspireDay AI.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button 
                                        variant={"default"}
                                        asChild
                                    >
                                        <a href={route('register')}>Get Started Now</a>
                                    </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
        </WebsiteLayout>
    );
}