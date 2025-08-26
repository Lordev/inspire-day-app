import DashboardHeader from '@/components/dashboard-header';
import ReflectionCard from '@/components/reflection-card';
import HistorySidebar from '@/components/history-sidebar';
import { Head } from '@inertiajs/react';
import { Prompt } from '@/types';


interface Props {
    prompt: Prompt;
    history: Prompt[];
}

export default function Dashboard({ prompt, history }: Props) {
    return (
        <>
            <Head title="Daily Reflection" />
            <div className="mx-auto flex h-full max-w-5xl flex-1 flex-col overflow-x-auto p-4 md:p-6">
                <DashboardHeader />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <ReflectionCard prompt={prompt} />
                    <HistorySidebar history={history} />
                </div>
            </div>
        </>
    );
}
