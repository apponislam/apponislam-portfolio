"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/pagination";
import { useGetAllAnalyticsQuery, useGetAnalyticsSummaryQuery } from "@/redux/features/page-analytics/pageAnalyticsApi";
import { BarChart3, Users, Eye, Link as LinkIcon, MousePointerClick, CalendarDays } from "lucide-react";

export default function AnalyticsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    const { data: summaryResponse, isLoading: isLoadingSummary } = useGetAnalyticsSummaryQuery();
    
    const { data: analyticsResponse, isLoading: isLoadingAnalytics } = useGetAllAnalyticsQuery({
        page,
        limit: 10,
        path: appliedSearch.trim() ? appliedSearch.trim() : undefined,
    });

    const summary = summaryResponse?.data;
    const analytics = analyticsResponse?.data || [];
    const meta = analyticsResponse?.meta;

    const paginationMeta = meta
        ? {
              total: meta.total,
              page: meta.page,
              limit: meta.limit,
              totalPages: meta.totalPages,
              hasNextPage: meta.hasNext ?? meta.page < meta.totalPages,
              hasPrevPage: meta.hasPrev ?? meta.page > 1,
          }
        : null;

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setAppliedSearch(search);
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight inline-flex items-center gap-2">
                        <BarChart3 className="h-7 w-7 text-primary" />
                        Page Analytics
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Analyze your website traffic, views, and unique visitors.
                    </p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5" /> : summary?.totalViews || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Across all pages</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5" /> : summary?.totalUniqueVisitors || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Unique IP addresses</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Top Path</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold truncate">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5" /> : (summary?.topPages?.[0]?._id || "N/A")}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Most visited page</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Recorded Paths</CardTitle>
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5" /> : (summary?.topPages?.length || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Tracked endpoints</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
                <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Filter by page path (e.g. /projects)" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="pl-9 bg-card shadow-sm" 
                        />
                    </div>
                    <Button type="submit" variant="default" className="gap-2 shadow-sm">
                        Filter
                    </Button>
                </form>
            </div>

            {/* Analytics Table/List */}
            <Card className="border border-border/50 bg-card/30 backdrop-blur-md shadow-sm overflow-hidden">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        Detailed Page Logs
                    </CardTitle>
                    <CardDescription>Individual page view records with user agent details.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoadingAnalytics ? (
                        <div className="flex justify-center items-center py-20 text-muted-foreground gap-3">
                            <Icons.spinner className="animate-spin h-6 w-6 text-primary" />
                            <span className="font-medium">Loading analytics data...</span>
                        </div>
                    ) : analytics.length === 0 ? (
                        <div className="py-16 text-center">
                            <BarChart3 className="mx-auto h-10 w-10 mb-3 text-muted-foreground/30" />
                            <p className="text-base font-medium text-foreground">No analytics records found</p>
                            <p className="text-sm text-muted-foreground mt-1">Waiting for user traffic.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/40">
                            {analytics.map((log: any) => (
                                <div key={log._id} className="p-4 hover:bg-muted/10 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">
                                                {log.path}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                {new Date(log.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xl">
                                            <span className="font-medium text-foreground/70">User Agent:</span> {log.userAgent || "Unknown"}
                                        </div>
                                        {log.referrer && (
                                            <div className="text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground/70">Referrer:</span> {log.referrer}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-4 shrink-0 sm:border-l sm:pl-4 border-border/40">
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Views</div>
                                            <div className="font-bold text-lg leading-none">{log.views}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Visitors</div>
                                            <div className="font-bold text-lg leading-none text-primary">{log.uniqueVisitors || 1}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {paginationMeta && paginationMeta.totalPages > 1 && (
                <div className="pt-2">
                    <Pagination pagination={paginationMeta} onPageChange={(p) => setPage(p)} />
                </div>
            )}
        </div>
    );
}
