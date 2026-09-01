"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { useGetAnalyticsSummaryQuery } from "@/redux/features/page-analytics/pageAnalyticsApi";
import { useGetAllActivitiesQuery } from "@/redux/features/activity/activityApi";
import {
    BarChart3,
    Users,
    Eye,
    Activity,
    LayoutDashboard,
    ArrowRight,
    Clock,
    TrendingUp,
    Calendar,
    Mail,
    Flame,
} from "lucide-react";

export default function DashboardPage() {
    const { data: summaryResponse, isLoading: isLoadingSummary } = useGetAnalyticsSummaryQuery();
    const { data: activityResponse, isLoading: isLoadingActivity } = useGetAllActivitiesQuery({
        page: 1,
        limit: 5,
    });

    const summary = summaryResponse?.data;
    const activities = activityResponse?.data || [];

    const topPages = summary?.topPages || [];
    const dailyTrend = summary?.dailyTrend || [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight inline-flex items-center gap-2.5">
                        <LayoutDashboard className="h-7 w-7 text-primary" />
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        High-level overview of portfolio traffic, analytics, and activity.
                    </p>
                </div>
            </div>

            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm hover:border-primary/40 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Today's Views
                        </CardTitle>
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                            <Eye className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6 text-primary" /> : summary?.todayTotalPageViews ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">Page views recorded today</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm hover:border-blue-500/40 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Today's Visitors
                        </CardTitle>
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6 text-blue-500" /> : summary?.todayUniqueVisitors ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">Unique IP visitors today</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm hover:border-emerald-500/40 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Views
                        </CardTitle>
                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6 text-emerald-500" /> : summary?.totalPageViews ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">All time page views</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/60 shadow-sm hover:border-purple-500/40 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Visitors
                        </CardTitle>
                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6 text-purple-500" /> : summary?.totalUniqueVisitors ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">All time unique visitors</p>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Breakdown: Top Pages & Daily Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Pages List */}
                <Card className="border border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Flame className="h-4 w-4 text-amber-500" />
                                Top Visited Pages
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">Most popular routes by page views.</CardDescription>
                        </div>
                        <Link href="/dashboard/analytics">
                            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-primary hover:text-primary/80">
                                Detailed <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoadingSummary ? (
                            <div className="flex justify-center items-center py-12 text-muted-foreground">
                                <Icons.spinner className="animate-spin h-5 w-5 text-primary mr-2" />
                                Loading pages...
                            </div>
                        ) : topPages.length === 0 ? (
                            <div className="py-10 text-center text-xs text-muted-foreground">No page views recorded yet.</div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {topPages.slice(0, 5).map((page: any, idx: number) => (
                                    <div key={idx} className="p-3.5 hover:bg-muted/10 transition-colors flex items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="w-5 text-center font-mono font-bold text-muted-foreground">#{idx + 1}</span>
                                            <Badge variant="outline" className="font-mono text-xs bg-primary/5 text-primary border-primary/20 truncate">
                                                {page.path}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 shrink-0 font-medium">
                                            <span className="text-muted-foreground">
                                                <strong className="text-foreground">{page.totalViews}</strong> views
                                            </span>
                                            <span className="text-muted-foreground">
                                                <strong className="text-primary">{page.uniqueVisitors}</strong> visitors
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Daily Traffic Trend */}
                <Card className="border border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                Daily Traffic Trend
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">Traffic breakdown by date.</CardDescription>
                        </div>
                        <Link href="/dashboard/analytics">
                            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-primary hover:text-primary/80">
                                View All <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoadingSummary ? (
                            <div className="flex justify-center items-center py-12 text-muted-foreground">
                                <Icons.spinner className="animate-spin h-5 w-5 text-primary mr-2" />
                                Loading trend...
                            </div>
                        ) : dailyTrend.length === 0 ? (
                            <div className="py-10 text-center text-xs text-muted-foreground">No traffic trend data available.</div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {dailyTrend.slice(0, 5).map((trend: any, idx: number) => (
                                    <div key={idx} className="p-3.5 hover:bg-muted/10 transition-colors flex items-center justify-between gap-3 text-xs">
                                        <span className="font-mono font-semibold text-foreground">{trend.date}</span>
                                        <div className="flex items-center gap-4 shrink-0 font-medium">
                                            <span className="text-muted-foreground">
                                                <strong className="text-foreground">{trend.totalPageViews}</strong> views
                                            </span>
                                            <span className="text-muted-foreground">
                                                <strong className="text-blue-500">{trend.uniqueVisitors}</strong> visitors
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row: Recent Activity & Quick Navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
                    <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Clock className="h-4 w-4 text-purple-500" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">Latest actions logged on the platform.</CardDescription>
                        </div>
                        <Link href="/dashboard/activity">
                            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-primary hover:text-primary/80">
                                View All <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoadingActivity ? (
                            <div className="flex justify-center items-center py-12 text-muted-foreground">
                                <Icons.spinner className="animate-spin h-5 w-5 text-primary mr-2" />
                                Loading activities...
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="py-10 text-center text-xs text-muted-foreground">No recent activity logs.</div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {activities.slice(0, 5).map((activity: any) => (
                                    <div key={activity._id} className="p-3.5 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Badge variant="outline" className="font-mono text-[10px] uppercase bg-primary/5 text-primary border-primary/20 shrink-0">
                                                {activity.action}
                                            </Badge>
                                            <span className="font-medium text-foreground/90 truncate">{activity.details || "Action performed"}</span>
                                        </div>
                                        <span className="text-muted-foreground shrink-0 font-mono text-[11px]">
                                            {new Date(activity.createdAt).toLocaleDateString()} {new Date(activity.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Navigation Cards */}
                <div className="space-y-4">
                    <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Quick Access</CardTitle>
                            <CardDescription className="text-xs">Quickly jump to admin management modules.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/dashboard/analytics" className="block">
                                <Button variant="outline" className="w-full justify-start h-11 gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-semibold text-xs">Full Page Analytics</span>
                                        <span className="text-[10px] text-muted-foreground">Views & visitor statistics</span>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/dashboard/contacts" className="block">
                                <Button variant="outline" className="w-full justify-start h-11 gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer">
                                    <Mail className="h-4 w-4 text-emerald-500" />
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-semibold text-xs">Contact Messages</span>
                                        <span className="text-[10px] text-muted-foreground">Manage incoming inquiries</span>
                                    </div>
                                </Button>
                            </Link>

                            <Link href="/dashboard/activity" className="block">
                                <Button variant="outline" className="w-full justify-start h-11 gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer">
                                    <Activity className="h-4 w-4 text-purple-500" />
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-semibold text-xs">Activity Logs</span>
                                        <span className="text-[10px] text-muted-foreground">Security & user action history</span>
                                    </div>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
