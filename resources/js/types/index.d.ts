import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    niche: string | null;
    tone: string | null;
}

export interface Options {
    niches: Record<string, string>;
    tones: Record<string, string>;
}

export interface Prompt {
    id: number;
    prompt: string;
    response: string | null;
    date: string;
    status: 'answered' | 'unanswered';
    analysis?: string | null;
}

export interface StatisticsData {
    statistics: {
        totalReflections: number
        averageReflectionLength: number
        mostActiveDay: string | null
    }
    trends: {
        total_reflections: number
        recent_reflections: number
    }
    insights: Array<{
        prompt_id: number
        analysis: string
    }>
}

