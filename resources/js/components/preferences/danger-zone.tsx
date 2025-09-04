import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flex } from '@radix-ui/themes';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface DangerZoneProps {
    onDeleteAccount: () => void;
    processing: boolean;
}

export default function DangerZone({ onDeleteAccount, processing }: DangerZoneProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        onDeleteAccount();
        setIsOpen(false);
    };

    return (
        <Card className="overflow-hidden border-red-200 shadow-sm">
            <CardHeader className="border-b border-red-100 bg-red-50">
                <Flex direction="row" align="center" gap="2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-xl text-red-800">Danger Zone</CardTitle>
                </Flex>
                <CardDescription className="text-red-700">
                    Once you delete your account, all of your data will be permanently deleted
                </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
                <Flex direction="column" gap="4">
                    <p className="text-sm text-slate-600">
                        Before deleting your account, please download any data or information that you wish to retain.
                        This action cannot be undone.
                    </p>

                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-fit">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove all
                                    your data from our servers, including all your reflections and preferences.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    disabled={processing}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    {processing ? 'Deleting...' : 'Delete Account'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </Flex>
            </CardContent>
        </Card>
    );
}
