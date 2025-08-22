// /resources/js/layouts/website-layout.tsx
import { type ReactNode } from 'react';
import { router, usePage } from '@inertiajs/react';
import WebsiteFooter from '@/components/website-footer';
import { Button } from '@/components/ui/button';

interface WebsiteLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

export default function WebsiteLayout({ 
    children, 
    showHeader = true, 
    showFooter = true 
}: WebsiteLayoutProps) {
    const { auth, name } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            {showHeader && (
                <header className="bg-white shadow-sm border-b">
                    {
                        /* Header content, e.g., logo, navigation links */
                    auth.user ? (
                        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                {name}
                            </div>
                            <div className="flex space-x-4 items-center">
                                <Button variant={"secondary"} asChild>
                                    <a href={route('dashboard')}>Dashboard</a>
                                </Button>
                                <Button variant={"default"} 
                                onClick={() => {router.post(route('logout'))}}
                                className='cursor-pointer'>
                                    Logout
                                </Button>
                            </div>
                        </nav>
                    ) : (   
                    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            InspireDay AI
                        </div>
                        <div className="flex space-x-4 items-center">
                            <Button variant="secondary" asChild>
                                <a href={route('login')}>Login</a>
                            </Button>
                            <Button variant="default" asChild>
                                <a href={route('register')}>Register</a>
                            </Button>
                        </div>
                    </nav>
                    )
                    }
                </header>
            )}
            
            <main className="flex-1">
                {children}
            </main>
            
            {showFooter && <WebsiteFooter />}
        </div>
    );
}