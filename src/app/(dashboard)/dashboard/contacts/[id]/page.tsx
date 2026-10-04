"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { useModalStore } from "@/components/hooks/use-modal-store";
import { useGetSingleContactQuery, useReplyToContactMutation, useUpdateContactStatusMutation, useDeleteContactMutation } from "@/redux/features/contact/contactApi";
import { ArrowLeft, Mail, Calendar, ExternalLink, Send, CheckCircle2, XCircle, Trash2, Clock, CheckCheck, CornerUpLeft, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function ContactReplyPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const storeModal = useModalStore();

    const [replyMessage, setReplyMessage] = useState("");
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const {
        data: contactResponse,
        isLoading,
        refetch,
    } = useGetSingleContactQuery(id, {
        skip: !id,
    });

    const [replyToContact, { isLoading: isReplying }] = useReplyToContactMutation();
    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateContactStatusMutation();
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const contact = contactResponse?.data;

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        try {
            await replyToContact({ id, replyMessage }).unwrap();
            setReplyMessage("");
            storeModal.onOpen({
                title: "Reply Sent!",
                description: "Your reply has been successfully sent to the user via email.",
                icon: () => <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />,
            });
            refetch();
        } catch (error: any) {
            storeModal.onOpen({
                title: "Error!",
                description: error?.data?.message || "Failed to send reply. Please try again.",
                icon: () => <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />,
            });
        }
    };

    const handleStatusChange = async (newStatus: "unread" | "read" | "replied") => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            storeModal.onOpen({
                title: "Status Updated",
                description: `Message status changed to "${newStatus}".`,
                icon: () => <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />,
            });
            refetch();
        } catch (error: any) {
            storeModal.onOpen({
                title: "Error!",
                description: error?.data?.message || "Failed to update status.",
                icon: () => <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />,
            });
        }
    };

    const handleDelete = async () => {
        setIsConfirmDeleteOpen(false);
        try {
            await deleteContact(id).unwrap();
            storeModal.onOpen({
                title: "Deleted!",
                description: "Contact message deleted successfully.",
                icon: () => <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />,
            });
            router.push("/dashboard/contacts");
        } catch (error: any) {
            storeModal.onOpen({
                title: "Error!",
                description: error?.data?.message || "Failed to delete message.",
                icon: () => <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-24 text-muted-foreground gap-3">
                <Icons.spinner className="animate-spin h-6 w-6 text-primary" />
                <span className="font-medium">Loading message details...</span>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-4xl text-center space-y-4">
                <Card className="p-12 border-dashed">
                    <Mail className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                    <h2 className="text-xl font-bold">Contact Message Not Found</h2>
                    <p className="text-sm text-muted-foreground mt-1">The requested contact message does not exist or may have been deleted.</p>
                    <Button onClick={() => router.push("/dashboard/contacts")} variant="outline" className="mt-6 gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Messages
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 space-y-6">
            {/* Header & Back Button */}
            <div className="flex items-center justify-between border-b pb-4 border-border/60">
                <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/contacts")} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Contacts
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant={contact.status === "unread" ? "default" : "secondary"} className="capitalize text-xs px-2.5 py-0.5">
                        {contact.status}
                    </Badge>
                    <Button variant="destructive" size="sm" onClick={() => setIsConfirmDeleteOpen(true)} disabled={isDeleting} className="gap-1.5 text-xs h-8">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                </div>
            </div>

            {/* Original Contact Message Card */}
            <Card className="p-6 border border-border/60 bg-card/50 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{contact.name}</h1>
                        <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline inline-flex items-center gap-1.5 mt-0.5">
                            <Mail className="h-3.5 w-3.5" />
                            {contact.email}
                        </a>
                    </div>
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(contact.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </div>
                </div>

                {/* Social / Website Link if available */}
                {contact.social && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/20 p-2.5 rounded-md">
                        <ExternalLink className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-foreground">Attached Link:</span>
                        <a href={contact.social} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
                            {contact.social}
                        </a>
                    </div>
                )}

                {/* Message Body */}
                <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message Content</h3>
                    <div className="p-4 rounded-lg bg-muted/30 text-foreground text-sm leading-relaxed whitespace-pre-wrap font-sans border border-border/30">{contact.message}</div>
                </div>
            </Card>

            {/* Previous Replies (if any) */}
            {contact.replies && contact.replies.length > 0 && (
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <CornerUpLeft className="h-5 w-5 text-primary" /> Previous Replies ({contact.replies.length})
                    </h2>
                    <div className="space-y-3">
                        {contact.replies.map((reply: any, index: number) => (
                            <Card key={index} className="p-4 border border-primary/20 bg-primary/5 space-y-2">
                                <div className="flex justify-between items-center text-xs text-muted-foreground border-b border-primary/10 pb-2">
                                    <span className="font-semibold text-primary">Admin Reply</span>
                                    <span>{new Date(reply.sentAt || reply.createdAt || Date.now()).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-foreground whitespace-pre-wrap">{reply.message || reply.replyMessage}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Reply Form Card */}
            <Card className="p-6 border border-border/60 bg-card shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                    <Send className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold">Send Reply Email</h2>
                </div>

                <form onSubmit={handleSendReply} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                            Compose email response to <span className="text-foreground font-semibold">{contact.email}</span>:
                        </label>
                        <Textarea rows={6} placeholder="Write your response message here..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} required className="bg-background" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/contacts")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isReplying || !replyMessage.trim()} className="gap-2">
                            {isReplying ? (
                                <>
                                    <Icons.spinner className="animate-spin h-4 w-4" />
                                    Sending Email...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send Reply
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>

            <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" /> Delete Contact Message
                        </DialogTitle>
                        <DialogDescription className="pt-2">Are you sure you want to delete this contact message? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
