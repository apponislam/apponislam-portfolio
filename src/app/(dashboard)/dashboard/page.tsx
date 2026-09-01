"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { useGetAnalyticsSummaryQuery } from "@/redux/features/page-analytics/pageAnalyticsApi";
import { useGetAllActivitiesQuery } from "@/redux/features/activity/activityApi";
import { BarChart3, Users, Eye, Activity, LayoutDashboard, ArrowRight, MousePointerClick, Clock } from "lucide-react";

export default function DashboardPage() {
    const { data: summaryResponse, isLoading: isLoadingSummary } = useGetAnalyticsSummaryQuery();
    const { data: activityResponse, isLoading: isLoadingActivity } = useGetAllActivitiesQuery({
        page: 1,
        limit: 5,
    });

    const summary = summaryResponse?.data;
    const activities = activityResponse?.data || [];

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight inline-flex items-center gap-2">
                        <LayoutDashboard className="h-7 w-7 text-primary" />
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's a high-level overview of your portfolio's performance.</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-linear-to-br from-card to-card/50 backdrop-blur-sm border-border/60 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Total Page Views</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Eye className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6" /> : summary?.totalViews || 0}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">All time views</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-card to-card/50 backdrop-blur-sm border-border/60 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Unique Visitors</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <Users className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6" /> : summary?.totalUniqueVisitors || 0}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Unique IP addresses</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-card to-card/50 backdrop-blur-sm border-border/60 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Top Route</CardTitle>
                        <div className="p-2 bg-emerald-500/10 rounded-full">
                            <MousePointerClick className="h-4 w-4 text-emerald-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold truncate">{isLoadingSummary ? <Icons.spinner className="animate-spin h-6 w-6" /> : summary?.topPages?.[0]?._id || "N/A"}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Most popular page</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-card to-card/50 backdrop-blur-sm border-border/60 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">Recent Activities</CardTitle>
                        <div className="p-2 bg-purple-500/10 rounded-full">
                            <Activity className="h-4 w-4 text-purple-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{isLoadingActivity ? <Icons.spinner className="animate-spin h-6 w-6" /> : activityResponse?.meta?.total || 0}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">Total logged actions</p>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section: Recent Activity & Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                {/* Recent Activity List */}
                <Card className="lg:col-span-2 border-border/50 bg-card/30 backdrop-blur-md shadow-sm">
                    <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription className="mt-1">Latest actions performed on the platform.</CardDescription>
                        </div>
                        <Link href="/admin/activity">
                            <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary/80">
                                View All <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoadingActivity ? (
                            <div className="flex justify-center items-center py-16 text-muted-foreground">
                                <Icons.spinner className="animate-spin h-6 w-6 text-primary mr-2" />
                                Loading...
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                <Activity className="mx-auto h-8 w-8 mb-2 opacity-30" />
                                <p>No recent activity logs.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {activities.map((activity: any) => (
                                    <div key={activity._id} className="p-4 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
                                                    {activity.action}
                                                </Badge>
                                                <span className="text-sm font-medium text-foreground/90">{activity.details || "Action performed"}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(activity.createdAt).toLocaleDateString()} at {new Date(activity.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="space-y-6">
                    <Card className="border-border/50 bg-card/30 backdrop-blur-md shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Quick Access</CardTitle>
                            <CardDescription>Navigate to other admin modules quickly.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/admin/analytics" className="block">
                                <Button variant="outline" className="w-full justify-start h-12 gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all">
                                    <BarChart3 className="h-5 w-5 text-blue-500" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm">Full Analytics</span>
                                        <span className="text-[10px] text-muted-foreground">Deep dive into traffic stats</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/admin/contacts" className="block">
                                <Button variant="outline" className="w-full justify-start h-12 gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all">
                                    <Icons.mail className="h-5 w-5 text-emerald-500" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm">Messages</span>
                                        <span className="text-[10px] text-muted-foreground">Manage incoming inquiries</span>
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
