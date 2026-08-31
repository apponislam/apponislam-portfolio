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

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
                <Input
                    placeholder="Search by name, email, or message..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" variant="secondary">
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
                <Card className="p-12 text-center text-muted-foreground">
                    <p className="text-base">No contact messages found.</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {contacts.map((c) => (
                        <Card key={c._id} className="p-6 border border-border/60 bg-card/40 backdrop-blur-sm space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground">{c.name}</h3>
                                    <a href={`mailto:${c.email}`} className="text-sm text-primary hover:underline font-medium">
                                        {c.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={c.status === "unread" ? "default" : "secondary"}>{c.status}</Badge>
                                    <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => router.push(`/admin/reply/${c._id}`)}
                                        className="gap-1.5 text-xs font-semibold"
                                    >
                                        Reply
                                    </Button>
                                </div>
                            </div>

                            <p className="text-sm text-foreground/90 bg-muted/30 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">{c.message}</p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                                {c.social ? (
                                    <p className="text-xs text-muted-foreground">
                                        Link:{" "}
                                        <a href={c.social} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                                            {c.social}
                                        </a>
                                    </p>
                                ) : <div />}
                                <Button
                                    size="sm"
                                    onClick={() => router.push(`/admin/reply/${c._id}`)}
                                    className="w-full sm:w-auto"
                                >
                                    Reply to {c.name}
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
