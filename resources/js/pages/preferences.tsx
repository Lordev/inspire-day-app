import AppLayout from '@/layouts/app-layout';
import { options, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import ReflectionPreferences from '@/components/preferences/reflection-preferences';
import ProfileSettings from '@/components/preferences/profile-settings';
import PasswordSettings from '@/components/preferences/password-settings';
import DangerZone from '@/components/preferences/danger-zone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User as UserIcon, Lock, AlertTriangle } from 'lucide-react';

interface Props {
    user: User;
    options: options;
    mustVerifyEmail?: boolean;
    status?: string;
}

const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Preferences', url: '/preferences' },
];

export default function PreferencesPage({ user, options, mustVerifyEmail, status }: Props) {
    const { data: reflectionData, setData: setReflectionData, post: postReflection, processing: reflectionProcessing } = useForm({
        niche: user.niche || Object.values(options.niches)[0],
        tone: user.tone || Object.values(options.tones)[0],
    });

    const { data: profileData, setData: setProfileData, patch: patchProfile, errors: profileErrors, processing: profileProcessing, recentlySuccessful: profileSuccess } = useForm({
        name: user.name,
        email: user.email,
    });

    const { data: passwordData, setData: setPasswordData, put: putPassword, errors: passwordErrors, processing: passwordProcessing, recentlySuccessful: passwordSuccess, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { delete: deleteAccount, processing: deleteProcessing } = useForm();

    const handleReflectionSubmit = (e: FormEvent) => {
        e.preventDefault();
        postReflection(route('storePreferences'));
    };

    const handleProfileSubmit = () => {
        patchProfile(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = () => {
        putPassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
            onError: (errors) => {
                if (errors.password) {
                    resetPassword('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    resetPassword('current_password');
                }
            },
        });
    };


    const handleDeleteAccount = () => {
        deleteAccount(route('profile.destroy'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preferences" />
            <div className="flex flex-col px-4 md:px-6 h-full">
                <DashboardHeader title='Settings & Preferences'/>
                <div className="flex h-full max-w-2xl flex-1 flex-col overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                        className="flex-1 flex flex-col"
                    >
                        <Tabs defaultValue="reflection" className="flex-1 flex flex-col">
                            <TabsList className="grid w-full grid-cols-4 gap-2 mb-6">
                                <TabsTrigger value="reflection" className="flex items-center gap-2 justify-center">
                                    <Settings className="h-4 w-4" />
                                    <span className="hidden sm:inline">Reflection</span>
                                </TabsTrigger>
                                <TabsTrigger value="profile" className="flex items-center gap-2 justify-center">
                                    <UserIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="password" className="flex items-center gap-2 justify-center">
                                    <Lock className="h-4 w-4" />
                                    <span className="hidden sm:inline">Password</span>
                                </TabsTrigger>
                                <TabsTrigger value="danger" className="flex items-center gap-2 justify-center">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span className="hidden sm:inline">Account</span>
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex-1 overflow-auto">
                                <TabsContent value="reflection" className="mt-0 h-full">
                                    <ReflectionPreferences
                                        niche={reflectionData.niche}
                                        tone={reflectionData.tone}
                                        nicheOptions={options.niches}
                                        toneOptions={options.tones}
                                        onNicheChange={(value) => setReflectionData('niche', value)}
                                        onToneChange={(value) => setReflectionData('tone', value)}
                                        onSubmit={handleReflectionSubmit}
                                    />
                                </TabsContent>

                                <TabsContent value="profile" className="mt-0 h-full p-2">
                                    <ProfileSettings
                                        name={profileData.name}
                                        email={profileData.email}
                                        onNameChange={(value) => setProfileData('name', value)}
                                        onEmailChange={(value) => setProfileData('email', value)}
                                        onSubmit={handleProfileSubmit}
                                        processing={profileProcessing}
                                        recentlySuccessful={profileSuccess}
                                        errors={profileErrors}
                                    />
                                </TabsContent>

                                <TabsContent value="password" className="mt-0 h-full p-2">
                                    <PasswordSettings
                                        currentPassword={passwordData.current_password}
                                        password={passwordData.password}
                                        passwordConfirmation={passwordData.password_confirmation}
                                        onCurrentPasswordChange={(value) => setPasswordData('current_password', value)}
                                        onPasswordChange={(value) => setPasswordData('password', value)}
                                        onPasswordConfirmationChange={(value) => setPasswordData('password_confirmation', value)}
                                        onSubmit={handlePasswordSubmit}
                                        processing={passwordProcessing}
                                        recentlySuccessful={passwordSuccess}
                                        errors={passwordErrors}
                                    />
                                </TabsContent>

                                <TabsContent value="danger" className="mt-0 h-full p-2">
                                    <DangerZone
                                        onDeleteAccount={handleDeleteAccount}
                                        processing={deleteProcessing}
                                    />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}
