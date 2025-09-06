import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flex } from '@radix-ui/themes';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';

interface ProfileSettingsProps {
    name: string;
    email: string;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onSubmit: () => void;
    processing: boolean;
    recentlySuccessful: boolean;
    errors: Record<string, string>;
}

export default function ProfileSettings({
    name,
    email,
    onNameChange,
    onEmailChange,
    onSubmit,
    processing,
    recentlySuccessful,
    errors,
}: ProfileSettingsProps) {
    return (
        <Card className="overflow-hidden border-border shadow-sm">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl text-slate-800">Profile Information</CardTitle>
                <CardDescription>Update your name and email address</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <Flex direction="column" gap="6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className="border-slate-200"
                            autoComplete="name"
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            className="border-slate-200"
                            autoComplete="username"
                        />
                        {errors.email && <InputError message={errors.email} />}
                    </div>

                    <Flex direction="row" align="center" justify="between" className="pt-4">
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Profile updated successfully.</p>
                        </Transition>

                        <Button onClick={onSubmit} disabled={processing} className="ml-auto">
                            {processing ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </Flex>
                </Flex>
            </CardContent>
        </Card>
    );
}
