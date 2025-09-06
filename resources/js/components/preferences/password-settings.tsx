import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flex } from '@radix-ui/themes';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';

interface PasswordSettingsProps {
    currentPassword: string;
    password: string;
    passwordConfirmation: string;
    onCurrentPasswordChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onPasswordConfirmationChange: (value: string) => void;
    onSubmit: () => void;
    processing: boolean;
    recentlySuccessful: boolean;
    errors: Record<string, string>;
}

export default function PasswordSettings({
    currentPassword,
    password,
    passwordConfirmation,
    onCurrentPasswordChange,
    onPasswordChange,
    onPasswordConfirmationChange,
    onSubmit,
    processing,
    recentlySuccessful,
    errors,
}: PasswordSettingsProps) {
    return (
        <Card className="overflow-hidden border-border shadow-sm">
            <CardHeader className="border-b border-border">
                <CardTitle className="text-xl text-foreground">Update Password</CardTitle>
                <CardDescription>Ensure your account is using a long, random password to stay secure</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <Flex direction="column" gap="6">
                    <div className="space-y-2">
                        <Label htmlFor="current_password" className="text-sm font-medium text-foreground">
                            Current Password
                        </Label>
                        <Input
                            id="current_password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => onCurrentPasswordChange(e.target.value)}
                            className="border-border"
                            autoComplete="current-password"
                        />
                        {errors.current_password && <InputError message={errors.current_password} />}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            New Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            className="border-border"
                            autoComplete="new-password"
                        />
                        {errors.password && <InputError message={errors.password} />}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => onPasswordConfirmationChange(e.target.value)}
                            className="border-border"
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                    </div>

                    <Flex direction="row" align="center" justify="between" className="pt-4">
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Password updated successfully.</p>
                        </Transition>

                        <Button onClick={onSubmit} disabled={processing} className="ml-auto">
                            {processing ? 'Updating...' : 'Update Password'}
                        </Button>
                    </Flex>
                </Flex>
            </CardContent>
        </Card>
    );
}
