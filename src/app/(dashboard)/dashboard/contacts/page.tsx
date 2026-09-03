"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/pagination";
import { useGetAllContactsQuery } from "@/redux/features/contact/contactApi";
import { RefreshCw } from "lucide-react";

export default function AdminContactsPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const { data: contactsResponse, isLoading: loading, refetch } = useGetAllContactsQuery({
        page,
        limit: 5,
        searchTerm: appliedSearch.trim() ? appliedSearch.trim() : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
    });

    const contacts = contactsResponse?.data || [];
    const meta = contactsResponse?.meta;

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

    const handleStatusChange = (status: string) => {
        setStatusFilter(status);
        setPage(1);
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Contact Messages</h1>
                    <p className="text-muted-foreground text-sm mt-1">View and manage all inquiry messages submitted via your portfolio.</p>
                </div>
                <div className="flex items-center gap-3">
                    {paginationMeta && (
                        <Badge variant="outline" className="w-fit text-sm px-3 py-1">
                            Total Messages: {paginationMeta.total}
                        </Badge>
                    )}
                    <Button variant="outline" size="icon" onClick={() => refetch()} className="shrink-0 h-9 w-9 rounded-full border-primary/20 hover:border-primary/50" title="Refetch">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Filter Controls: Search & Status Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name, email, or message..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                    </div>
                    <Button type="submit" variant="secondary" className="gap-2">
                        Search
                    </Button>
                </form>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    {[
                        { label: "All", value: "all" },
                        { label: "Unread", value: "unread" },
                        { label: "Read", value: "read" },
                        { label: "Replied", value: "replied" },
                    ].map((tab) => (
                        <Button key={tab.value} type="button" size="sm" variant={statusFilter === tab.value ? "default" : "outline"} onClick={() => handleStatusChange(tab.value)} className="text-xs capitalize h-8 px-3 rounded-full font-medium">
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Messages List */}
            {loading ? (
                <div className="flex justify-center items-center py-20 text-muted-foreground gap-2">
                    <Icons.spinner className="animate-spin h-5 w-5" />
                    <span>Loading messages...</span>
                </div>
            ) : contacts.length === 0 ? (
                <Card className="p-12 text-center text-muted-foreground border-dashed">
                    <Icons.mail className="mx-auto h-8 w-8 mb-3 text-muted-foreground/60" />
                    <p className="text-base font-medium">No contact messages found.</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {contacts.map((c) => (
                        <Card key={c._id} className="p-3.5 border border-border/60 bg-card/40 hover:bg-card/70 transition-colors backdrop-blur-sm shadow-sm gap-2">
                            {/* Header: Name, Email, Status & Date */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 border-b border-border/40 pb-2">
                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    <h3 className="font-bold text-sm text-foreground">{c.name}</h3>
                                    <span className="text-muted-foreground/30">•</span>
                                    <a href={`mailto:${c.email}`} className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                                        <Icons.mail className="h-3 w-3" />
                                        {c.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={c.status === "unread" ? "default" : "secondary"} className="capitalize text-[10px] px-1.5 py-0 h-4">
                                        {c.status}
                                    </Badge>
                                    <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                                        <Icons.calendar className="h-3 w-3" />
                                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Body: Message text with tight padding */}
                            <p className="text-xs text-foreground/90 bg-muted/20 p-2.5 rounded-md leading-relaxed whitespace-pre-wrap font-sans my-2">{c.message}</p>

                            {/* Footer: Social Link & Reply Button */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                {c.social ? (
                                    <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1 truncate max-w-sm">
                                        <Icons.externalLink className="h-3 w-3 shrink-0" />
                                        <span>Link: </span>
                                        <a href={c.social} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium truncate">
                                            {c.social}
                                        </a>
                                    </p>
                                ) : (
                                    <div />
                                )}
                                <Button size="sm" onClick={() => router.push(`/dashboard/contacts/${c._id}`)} className="gap-1.5 text-xs font-semibold px-3 h-7 w-full sm:w-auto">
                                    <Icons.reply className="h-3 w-3" />
                                    Reply
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination Controls - Shown when there are more than 5 messages (totalPages > 1) */}
            {paginationMeta && paginationMeta.totalPages > 1 && <Pagination pagination={paginationMeta} onPageChange={(p) => setPage(p)} />}
        </div>
    );
}
