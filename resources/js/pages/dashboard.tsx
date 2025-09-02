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
            <div className="mx-auto flex flex-col px-4 md:px-6">
                <DashboardHeader />
                <div className="grid min-h-0 flex-1 grid-cols-3 gap-6 lg:grid-cols-4 overflow-hidden">
                    <HistorySidebar history={history} />
                    <ReflectionCard prompt={prompt} />
                </div>
            </div>
        </AppLayout>
    );
}
