import DashboardHeader from '@/components/dashboard-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User as UserIcon, Lock, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { containerSlideUp } from '@/utils/animations';

interface SettingsLayoutProps extends PropsWithChildren {
    activeTab?: string;
    title: string;
    description: string;
}

export default function SettingsLayout({ children, activeTab = 'profile', title, description }: SettingsLayoutProps) {
    return (
        <div className="flex flex-col px-4 md:px-6 h-full">
            <DashboardHeader title='Settings & Preferences'/>
            <div className="flex h-full max-w-2xl flex-1 flex-col overflow-hidden">
                <motion.div 
                    {...containerSlideUp()}
                    className="flex-1 flex flex-col"
                >
                    <Tabs value={activeTab} className="flex-1 flex flex-col">
                        <TabsList className="grid w-full grid-cols-4 gap-2 mb-6">
                            <Link href="/settings/reflection" className="flex-1">
                                <TabsTrigger value="reflection" className="flex items-center gap-2 justify-center w-full">
                                    <Settings className="h-4 w-4" />
                                    <span className="hidden sm:inline">Reflection</span>
                                </TabsTrigger>
                            </Link>
                            <Link href="/settings/profile" className="flex-1">
                                <TabsTrigger value="profile" className="flex items-center gap-2 justify-center w-full">
                                    <UserIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </TabsTrigger>
                            </Link>
                            <Link href="/settings/password" className="flex-1">
                                <TabsTrigger value="password" className="flex items-center gap-2 justify-center w-full">
                                    <Lock className="h-4 w-4" />
                                    <span className="hidden sm:inline">Password</span>
                                </TabsTrigger>
                            </Link>
                            <Link href="/settings/appearance" className="flex-1">
                                <TabsTrigger value="appearance" className="flex items-center gap-2 justify-center w-full">
                                    <Palette className="h-4 w-4" />
                                    <span className="hidden sm:inline">Appearance</span>
                                </TabsTrigger>
                            </Link>
                        </TabsList>

                        <div className="flex-1 overflow-auto">
                            <TabsContent value={activeTab} className="mt-0 h-full">
                                <Card className="overflow-hidden border-border shadow-sm">
                                    <CardHeader className="border-b border-border">
                                        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
                                        <CardDescription>{description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="p-6">
                                        {children}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
