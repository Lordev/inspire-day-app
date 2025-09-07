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
            color: 'text-primary'
        },
        {
            title: 'Recent Activity',
            value: trends.recent_reflections || 0,
            icon: TrendingUp,
            description: 'Last 30 days',
            color: 'text-primary'
        },
        {
            title: 'Average Length',
            value: statistics.averageReflectionLength ? `${Math.round(statistics.averageReflectionLength)} chars` : '0 chars',
            icon: Clock,
            description: 'Per reflection',
            color: 'text-primary'
        },
        {
            title: 'Most Active Day',
            value: statistics.mostActiveDay || 'No data',
            icon: Calendar,
            description: 'Your most productive day',
            color: 'text-primary'
        },
        {
            title: 'Analyzed Reflections',
            value: insights.length || 0,
            icon: Target,
            description: 'AI analyzed',
            color: 'text-primary'
        },
        {
            title: 'Activity Rate',
            value: trends.total_reflections && trends.recent_reflections 
                ? `${Math.round((trends.recent_reflections / trends.total_reflections) * 100)}%`
                : '0%',
            icon: Users,
            description: 'Recent vs total',
            color: 'text-primary'
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Statistics" />
            <div className="px-4 md:px-6 h-full max-w-5xl">
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
                                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                                {card.title}
                                            </CardTitle>
                                            <card.icon className={`h-5 w-5 ${card.color}`} />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-foreground mb-1">
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
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-xl text-foreground">Summary</CardTitle>
                                    <CardDescription>Your reflection journey at a glance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Flex direction="column" gap="4">
                                        <div className="bg-muted/50 border border-border rounded-lg p-4">
                                            <p className="text-foreground">
                                                You've created <span className="font-semibold text-primary">{statistics.totalReflections}</span> total reflections, 
                                                with <span className="font-semibold text-primary">{trends.recent_reflections}</span> in the last 30 days.
                                            </p>
                                        </div>
                                        
                                        {statistics.mostActiveDay && (
                                            <div className="bg-muted/50 border border-border rounded-lg p-4">
                                                <p className="text-foreground">
                                                    Your most active day is <span className="font-semibold text-primary">{statistics.mostActiveDay}</span>.
                                                    {statistics.averageReflectionLength && (
                                                        <span> Your reflections average <span className="font-semibold text-primary">{Math.round(statistics.averageReflectionLength)}</span> characters.</span>
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {insights.length > 0 && (
                                            <div className="bg-muted/50 border border-border rounded-lg p-4">
                                                <p className="text-foreground">
                                                    You've analyzed <span className="font-semibold text-primary">{insights.length}</span> reflection{insights.length !== 1 ? 's' : ''} with AI assistance to gain deeper insights.
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
