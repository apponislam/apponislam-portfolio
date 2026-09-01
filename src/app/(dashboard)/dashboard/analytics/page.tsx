"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/pagination";
import { useGetAllAnalyticsQuery, useGetAnalyticsSummaryQuery, TPageAnalytics } from "@/redux/features/page-analytics/pageAnalyticsApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BarChart3, Users, Eye, MousePointerClick, CalendarDays, Globe, Monitor, ExternalLink, Clock, TrendingUp, Info } from "lucide-react";

export default function AnalyticsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [selectedLog, setSelectedLog] = useState<TPageAnalytics | null>(null);

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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight inline-flex items-center gap-2">
                        <BarChart3 className="h-7 w-7 text-primary" />
                        Page Analytics
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Comprehensive overview of traffic metrics, visitor activity, and page logs.</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Today's Views</CardTitle>
                        <Eye className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">{isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5 text-primary" /> : (summary?.todayTotalPageViews ?? 0)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Page views recorded today</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Views</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">{isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5 text-emerald-500" /> : (summary?.totalPageViews ?? 0)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all time</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Unique Visitors</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">{isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5 text-purple-500" /> : (summary?.totalUniqueVisitors ?? 0)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Unique IP addresses</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Page Route</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold font-mono truncate text-primary">{isLoadingSummary ? <Icons.spinner className="animate-spin h-5 w-5 text-amber-500" /> : summary?.topPages?.[0]?.path || "N/A"}</div>
                        <p className="text-xs text-muted-foreground mt-1">Most visited path</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Filter by page path (e.g. /projects)" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card shadow-sm" />
                    </div>
                    <Button type="submit" variant="default" className="gap-2 shadow-sm">
                        Filter
                    </Button>
                </form>
            </div>

            {/* Detailed Analytics Logs List */}
            <Card className="border border-border/50 bg-card/30 backdrop-blur-md shadow-sm overflow-hidden">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        Detailed Page Logs
                    </CardTitle>
                    <CardDescription>Individual page view records. Click any row or 'Details' for technical metadata.</CardDescription>
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
                            {analytics.map((log: TPageAnalytics) => (
                                <div key={log._id} className="p-4 hover:bg-muted/10 transition-colors flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20 text-xs">
                                                {log.path}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(log.createdAt).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-0.5">
                                            {log.ipAddress && (
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span>IP: {log.ipAddress}</span>
                                                </div>
                                            )}
                                            {log.userAgent && (
                                                <div className="inline-flex items-center gap-1.5 max-w-sm truncate">
                                                    <Monitor className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                    <span className="truncate">{log.userAgent}</span>
                                                </div>
                                            )}
                                            {log.referrer && (
                                                <div className="inline-flex items-center gap-1.5 text-primary/80">
                                                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">Ref: {log.referrer}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end md:border-l md:pl-4 border-border/40">
                                        <Badge variant="outline" className="font-mono text-xs text-muted-foreground bg-muted/20 border-border/60">
                                            <Eye className="h-3 w-3 mr-1 text-primary" />
                                            {log.count ?? log.views ?? 0} Views
                                        </Badge>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedLog(log)}
                                            className="h-8 gap-1 text-xs cursor-pointer hover:bg-primary/5 hover:border-primary/40"
                                        >
                                            <Info className="h-3.5 w-3.5 text-primary" />
                                            <span>Details</span>
                                        </Button>
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

            {/* Detailed Log Modal Inspector */}
            {selectedLog && (
                <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
                    <DialogContent className="sm:max-w-md bg-background border-border/80 shadow-2xl space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Log Metadata Details
                            </DialogTitle>
                            <DialogDescription className="text-xs">Technical information captured for this page view record.</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-3 text-xs">
                            <div className="p-3 rounded-lg bg-card/60 border border-border/50 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">Page Route:</span>
                                    <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/20 text-xs">
                                        {selectedLog.path}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground font-medium">Visit Count:</span>
                                    <span className="font-mono font-bold text-emerald-500">{selectedLog.count ?? selectedLog.views ?? 0}</span>
                                </div>
                                {selectedLog.date && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground font-medium">Recorded Date:</span>
                                        <span className="font-mono font-semibold text-foreground">{selectedLog.date}</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 rounded-lg bg-card/60 border border-border/50 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold text-foreground">IP Address</div>
                                        <div className="font-mono text-muted-foreground">{selectedLog.ipAddress || "Not recorded"}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-card/60 border border-border/50 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Monitor className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-foreground">User Agent</div>
                                        <div className="font-mono text-muted-foreground break-all text-[11px] mt-0.5">{selectedLog.userAgent || "Unknown User Agent"}</div>
                                    </div>
                                </div>
                            </div>

                            {selectedLog.referrer && (
                                <div className="p-3 rounded-lg bg-card/60 border border-border/50 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <div className="font-semibold text-foreground">Referrer Source</div>
                                            <a href={selectedLog.referrer} target="_blank" rel="noreferrer" className="font-mono text-primary hover:underline break-all text-[11px] mt-0.5 block">
                                                {selectedLog.referrer}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-3 rounded-lg bg-card/60 border border-border/50 space-y-1 text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>Created At:</span>
                                    <span className="font-mono text-foreground">{new Date(selectedLog.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Last Visited At:</span>
                                    <span className="font-mono text-foreground">{new Date(selectedLog.lastVisitedAt || selectedLog.updatedAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)}>
                                Close
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
