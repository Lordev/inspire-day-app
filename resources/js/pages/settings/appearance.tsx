import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';


export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Appearance settings" />

            <SettingsLayout activeTab='appearance' title="Appearance Settings" description="Update your account's appearance settings">
                <AppearanceTabs />
            </SettingsLayout>
        </AppLayout>
    );
}
