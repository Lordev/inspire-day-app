import { Head } from '@inertiajs/react'
import { motion } from 'framer-motion'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flex, Section } from '@radix-ui/themes'
import { BarChart3, Calendar, Clock, Target, TrendingUp, Users } from 'lucide-react'
import type { StatisticsData } from '@/types'
import DashboardHeader from '@/components/dashboard-header'

interface StatisticProps {
    statistics: StatisticsData['statistics']
    trends: StatisticsData['trends']
    insights: StatisticsData['insights']
}

export default function Statistic({ statistics, trends, insights }: StatisticProps) {
    const breadcrumbs = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Statistics', href: '/statistics' }
    ]

    const statisticCards = [
        {
            title: 'Total Reflections',
            value: statistics.totalReflections || 0,
            icon: BarChart3,
            description: 'Reflections created',
            color: 'text-blue-600'
        },
        {
            title: 'Recent Activity',
            value: trends.recent_reflections || 0,
            icon: TrendingUp,
            description: 'Last 30 days',
            color: 'text-green-600'
        },
        {
            title: 'Average Length',
            value: statistics.averageReflectionLength ? `${Math.round(statistics.averageReflectionLength)} chars` : '0 chars',
            icon: Clock,
            description: 'Per reflection',
            color: 'text-purple-600'
        },
        {
            title: 'Most Active Day',
            value: statistics.mostActiveDay || 'No data',
            icon: Calendar,
            description: 'Your most productive day',
            color: 'text-orange-600'
        },
        {
            title: 'Analyzed Reflections',
            value: insights.length || 0,
            icon: Target,
            description: 'AI analyzed',
            color: 'text-teal-600'
        },
        {
            title: 'Activity Rate',
            value: trends.total_reflections && trends.recent_reflections 
                ? `${Math.round((trends.recent_reflections / trends.total_reflections) * 100)}%`
                : '0%',
            icon: Users,
            description: 'Recent vs total',
            color: 'text-rose-600'
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Statistics" />
            <div className="flex flex-col px-4 md:px-6 h-full max-w-5xl">
                <DashboardHeader title='Statistics'/>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {statisticCards.map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="hover:shadow-lg transition-shadow duration-300">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium text-slate-600">
                                                {card.title}
                                            </CardTitle>
                                            <card.icon className={`h-5 w-5 ${card.color}`} />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-slate-800 mb-1">
                                                {card.value}
                                            </div>
                                            <CardDescription className="text-xs">
                                                {card.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                    {statistics && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-8"
                        >
                            <Card className="border-slate-200">
                                <CardHeader>
                                    <CardTitle className="text-xl text-slate-800">Summary</CardTitle>
                                    <CardDescription>Your reflection journey at a glance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Flex direction="column" gap="4">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                                            <p className="text-slate-700">
                                                You've created <span className="font-semibold text-blue-600">{statistics.totalReflections}</span> total reflections, 
                                                with <span className="font-semibold text-green-600">{trends.recent_reflections}</span> in the last 30 days.
                                            </p>
                                        </div>
                                        
                                        {statistics.mostActiveDay && (
                                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                                                <p className="text-slate-700">
                                                    Your most active day is <span className="font-semibold text-orange-600">{statistics.mostActiveDay}</span>.
                                                    {statistics.averageReflectionLength && (
                                                        <span> Your reflections average <span className="font-semibold">{Math.round(statistics.averageReflectionLength)}</span> characters.</span>
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {insights.length > 0 && (
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                                                <p className="text-slate-700">
                                                    You've analyzed <span className="font-semibold text-purple-600">{insights.length}</span> reflection{insights.length !== 1 ? 's' : ''} with AI assistance to gain deeper insights.
                                                </p>
                                            </div>
                                        )}
                                    </Flex>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AppLayout>
    )
}
