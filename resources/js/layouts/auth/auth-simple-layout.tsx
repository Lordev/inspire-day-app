import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';
import { 
    fadeInUp, 
    floatingCircle, 
    floatingSquare, 
    floatingDot, 
    containerSlideUp, 
    cardScaleIn 
} from '@/utils/animations';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-10 right-[10%] h-32 w-32 rounded-full bg-primary/20 opacity-60"
                    {...floatingCircle()}
                />
                <motion.div
                    className="absolute bottom-10 left-[10%] h-24 w-24 rounded-lg bg-accent/20 opacity-60"
                    {...floatingSquare()}
                />
                <motion.div
                    className="absolute top-1/2 left-[5%] h-16 w-16 rounded-full bg-secondary/30 opacity-50"
                    {...floatingDot()}
                />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md space-y-8"
                {...containerSlideUp()}
            >
                <div className="text-center">
                    <motion.h1 className="mb-2 text-4xl font-bold text-foreground" {...fadeInUp(0.2)}>
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            InspireDay
                        </span>
                    </motion.h1>
                    {title && (
                        <motion.h2 className="mb-2 text-xl font-medium text-foreground" {...fadeInUp(0.25)}>
                            {title}
                        </motion.h2>
                    )}
                </div>

                <motion.div
                    className="rounded-2xl border border-border bg-card p-8 shadow-xl backdrop-blur-sm"
                    {...cardScaleIn()}
                >
                    {description && (
                        <motion.p className="mb-6 text-center text-sm text-muted-foreground" {...fadeInUp(0.3)}>
                            {description}
                        </motion.p>
                    )}
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
