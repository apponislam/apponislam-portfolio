"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, KeyRound, Loader2, Lock, CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(6, "New password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "New passwords do not match",
        path: ["confirmPassword"],
    });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            reset();
            setErrorMessage(null);
            setSuccessMessage(null);
        }
        onOpenChange(isOpen);
    };

    const onSubmit = async (data: ChangePasswordFormData) => {
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const res = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }).unwrap();

            if (res.success) {
                setSuccessMessage(res.message || "Password changed successfully!");
                reset();
                setTimeout(() => {
                    handleClose(false);
                }, 1500);
            } else {
                setErrorMessage(res.message || "Failed to change password.");
            }
        } catch (err: any) {
            setErrorMessage(err?.data?.message || err?.message || "Failed to change password. Please verify your current password.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-background border-border/80 shadow-2xl">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <KeyRound className="h-5 w-5 text-primary" />
                        Change Password
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Update your account password securely.
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                        <span className="shrink-0 w-2 h-2 rounded-full bg-red-400" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <p>{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                    <div>
                        <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                            Current Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("currentPassword")}
                                className="w-full pl-9 pr-9 py-2.5 bg-card/60 border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-xs text-red-400 mt-1">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("newPassword")}
                                className="w-full pl-9 pr-9 py-2.5 bg-card/60 border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-xs text-red-400 mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-1.5">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                className="w-full pl-9 pr-9 py-2.5 bg-card/60 border border-border rounded-lg text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleClose(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <span>Update Password</span>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
