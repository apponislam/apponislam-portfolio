"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

interface ContactItem {
    _id: string;
    name: string;
    email: string;
    message: string;
    social?: string;
    status: "unread" | "read" | "replied" | "archived";
    createdAt: string;
}

interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export default function AdminContactsPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchContacts = async (currentPage: number, searchQuery: string) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                limit: "5",
            });
            if (searchQuery.trim()) {
                queryParams.set("search", searchQuery.trim());
            }
            const res = await fetch(`/api/admin/contacts?${queryParams.toString()}`);
            const data = await res.json();
            if (data.success) {
                setContacts(data.data);
                setPagination(data.pagination);
            }
        } catch (err) {
            console.error("Failed to load contacts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts(page, search);
    }, [page]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchContacts(1, search);
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-border/60">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Contact Messages</h1>
                    <p className="text-muted-foreground text-sm mt-1">View and manage all inquiry messages submitted via your portfolio.</p>
                </div>
                {pagination && (
                    <Badge variant="outline" className="w-fit text-sm px-3 py-1">
                        Total Messages: {pagination.total}
                    </Badge>
                )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                    <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or message..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button type="submit" variant="secondary" className="gap-2">
                    Search
                </Button>
            </form>

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
                        <Card
                            key={c._id}
                            className="p-3.5 border border-border/60 bg-card/40 hover:bg-card/70 transition-colors backdrop-blur-sm shadow-sm gap-2"
                        >
                            {/* Header: Name, Email, Status & Date */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 border-b border-border/40 pb-2">
                                <div className="flex items-center gap-2 flex-wrap text-xs">
                                    <h3 className="font-bold text-sm text-foreground">{c.name}</h3>
                                    <span className="text-muted-foreground/30">•</span>
                                    <a
                                        href={`mailto:${c.email}`}
                                        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                                    >
                                        <Icons.mail className="h-3 w-3" />
                                        {c.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={c.status === "unread" ? "default" : "secondary"}
                                        className="capitalize text-[10px] px-1.5 py-0 h-4"
                                    >
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
                            <p className="text-xs text-foreground/90 bg-muted/20 p-2.5 rounded-md leading-relaxed whitespace-pre-wrap font-sans my-2">
                                {c.message}
                            </p>

                            {/* Footer: Social Link & Reply Button */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                {c.social ? (
                                    <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1 truncate max-w-sm">
                                        <Icons.externalLink className="h-3 w-3 shrink-0" />
                                        <span>Link: </span>
                                        <a
                                            href={c.social}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:underline font-medium truncate"
                                        >
                                            {c.social}
                                        </a>
                                    </p>
                                ) : (
                                    <div />
                                )}
                                <Button
                                    size="sm"
                                    onClick={() => router.push(`/admin/reply/${c._id}`)}
                                    className="gap-1.5 text-xs font-semibold px-3 h-7 w-full sm:w-auto"
                                >
                                    <Icons.reply className="h-3 w-3" />
                                    Reply
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-6 border-border/60">
                    <p className="text-xs text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!pagination.hasPrevPage}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            <Icons.chevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!pagination.hasNextPage}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next <Icons.chevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
