import DashboardHeader from '@/components/dashboard-header';
import ReflectionCard from '@/components/reflection-card';
import HistorySidebar from '@/components/history-sidebar';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Prompt } from '@/types';


interface Props {
    prompt: Prompt;
    history: Prompt[];
}

const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Dashboard', url: '/dashboard' },
];


export default function Dashboard({ prompt, history }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daily Reflection" />
            <div className="px-4 md:px-6 md:pb-6 lg:overflow-hidden h-full bg-background">
                <DashboardHeader title='Daily Reflection' />
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <HistorySidebar history={history} />
                    <ReflectionCard prompt={prompt} />
                </div>
            </div>
        </AppLayout>
    );
}
