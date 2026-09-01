"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/pagination";
import { useModalStore } from "@/components/hooks/use-modal-store";
import { useGetAllActivitiesQuery, useDeleteActivityMutation } from "@/redux/features/activity/activityApi";
import { Trash2, Activity, Globe, Monitor, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function ActivityPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const storeModal = useModalStore();

    const { data: activityResponse, isLoading } = useGetAllActivitiesQuery({
        page,
        limit: 10,
        searchTerm: appliedSearch.trim() ? appliedSearch.trim() : undefined,
    });

    const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation();

    const activities = activityResponse?.data || [];
    const meta = activityResponse?.meta;

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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this activity log?")) return;
        try {
            await deleteActivity(id).unwrap();
            storeModal.onOpen({
                title: "Success!",
                description: "Activity deleted successfully.",
                icon: () => <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />,
            });
        } catch (error: any) {
            storeModal.onOpen({
                title: "Error!",
                description: error?.data?.message || "Failed to delete activity.",
                icon: () => <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />,
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight inline-flex items-center gap-2">
                        <Activity className="h-7 w-7 text-primary" />
                        Activity Log
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">Monitor recent user actions, security logs, and platform activities.</p>
                </div>
                {paginationMeta && (
                    <Badge variant="outline" className="w-fit text-sm px-4 py-1.5 rounded-full shadow-sm bg-background">
                        Total Records: {paginationMeta.total}
                    </Badge>
                )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by action, IP, or details..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card shadow-sm" />
                    </div>
                    <Button type="submit" variant="default" className="gap-2 shadow-sm">
                        Search
                    </Button>
                </form>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20 text-muted-foreground gap-3">
                    <Icons.spinner className="animate-spin h-6 w-6 text-primary" />
                    <span className="font-medium">Loading activity logs...</span>
                </div>
            ) : activities.length === 0 ? (
                <Card className="p-16 text-center border-dashed border-2 bg-transparent shadow-none">
                    <Activity className="mx-auto h-12 w-12 mb-4 text-muted-foreground/30" />
                    <p className="text-lg font-medium text-foreground">No activities found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria.</p>
                </Card>
            ) : (
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div key={activity._id} className="p-3 sm:p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200 bg-card/40 backdrop-blur-sm shadow-xs group flex flex-col md:flex-row md:items-center gap-3 justify-between">
                            <div className="flex-1 space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="px-2 py-0.5 rounded-md font-mono text-[11px] text-primary bg-primary/10 border border-primary/20">
                                        {activity.action}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/90 font-medium">{activity.details || "No additional details provided."}</p>
                                {(activity.ipAddress || activity.userAgent) && (
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-0.5">
                                        {activity.ipAddress && (
                                            <div className="inline-flex items-center gap-1.5">
                                                <Globe className="h-3.5 w-3.5" />
                                                <span>IP: {activity.ipAddress}</span>
                                            </div>
                                        )}
                                        {activity.userAgent && (
                                            <div className="inline-flex items-center gap-1.5 max-w-50 sm:max-w-xs md:max-w-md lg:max-w-lg truncate">
                                                <Monitor className="h-3.5 w-3.5 shrink-0" />
                                                <span className="truncate">{activity.userAgent}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="shrink-0 md:pl-3 md:border-l border-border/50 flex md:flex-col items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(activity._id)} disabled={isDeleting} className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="h-3.5 w-3.5 md:mr-1.5" />
                                    <span className="hidden md:inline">Delete</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {paginationMeta && paginationMeta.totalPages > 1 && (
                <div className="pt-4">
                    <Pagination pagination={paginationMeta} onPageChange={(p) => setPage(p)} />
                </div>
            )}
        </div>
    );
}
