"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

interface ReplyItem {
    replyMessage: string;
    sentAt: string;
    resendId?: string;
}

interface ContactDetails {
    _id: string;
    name: string;
    email: string;
    message: string;
    social?: string;
    status: string;
    replies?: ReplyItem[];
    createdAt: string;
}

export default function AdminReplyPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [contact, setContact] = useState<ContactDetails | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchContactDetails = async () => {
        try {
            const res = await fetch(`/api/admin/contacts/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
                setContact(data.data);
            }
        } catch (err) {
            console.error("Failed to load message:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchContactDetails();
        }
    }, [id]);

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        setSending(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/admin/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contactId: id,
                    replyMessage: replyMessage.trim(),
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to send reply");
            }

            setSuccessMessage("Reply email sent successfully to " + (contact?.email || "sender"));
            setReplyMessage("");
            fetchContactDetails();
        } catch (err: any) {
            setErrorMessage(err.message || "Failed to send reply");
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center text-muted-foreground gap-2">
                <Icons.spinner className="animate-spin h-5 w-5" />
                <span>Loading inquiry details...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-8">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => router.push("/admin/contacts")}>
                    <Icons.chevronLeft className="h-4 w-4 mr-1" /> Back to Messages
                </Button>
            </div>

            <div className="border-b pb-4 border-border/60 flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Direct Reply</h1>
                    <p className="text-muted-foreground text-sm mt-1">Send an official email response directly from apponislam.com</p>
                </div>
                {contact && <Badge variant={contact.status === "replied" ? "secondary" : "default"}>{contact.status}</Badge>}
            </div>

            {/* Original Message Card */}
            {contact ? (
                <Card className="p-6 border border-border/60 bg-card/40 backdrop-blur-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-border/40">
                        <div>
                            <h3 className="font-bold text-lg text-foreground">{contact.name}</h3>
                            <a href={`mailto:${contact.email}`} className="text-sm font-medium text-primary hover:underline">
                                {contact.email}
                            </a>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {new Date(contact.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Message</p>
                        <div className="text-sm text-foreground/90 bg-muted/30 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">{contact.message}</div>
                    </div>
                </Card>
            ) : (
                <Card className="p-6 border border-border/60 text-center text-muted-foreground">
                    <p>Inquiry record loaded. Write your response below:</p>
                </Card>
            )}

            {/* Sent Replies History */}
            {contact && contact.replies && contact.replies.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                        <span>Past Sent Replies</span>
                        <Badge variant="outline">{contact.replies.length}</Badge>
                    </h3>
                    <div className="space-y-3">
                        {contact.replies.map((reply, idx) => (
                            <Card key={idx} className="p-5 border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                    <span>Sent by Appon Islam</span>
                                    <span>{new Date(reply.sentAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                                <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{reply.replyMessage}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Your Email Reply Message</label>
                    <Textarea
                        placeholder="Write your response here..."
                        rows={6}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="w-full resize-y"
                    />
                </div>

                {successMessage && (
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
                        {errorMessage}
                    </div>
                )}

                <Button type="submit" disabled={sending || !replyMessage.trim()} className="w-full sm:w-auto">
                    {sending ? (
                        <>
                            <Icons.spinner className="animate-spin h-4 w-4 mr-2" /> Sending Email...
                        </>
                    ) : (
                        "Send Reply Email"
                    )}
                </Button>
            </form>
        </div>
    );
}
