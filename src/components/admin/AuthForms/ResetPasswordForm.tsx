"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

interface ResetPasswordFormInputs {
    newPassword?: string;
    confirmPassword?: string;
}

interface ResetPasswordFormProps {
    token: string;
    onSuccess: () => void;
    onResetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
    isLoading: boolean;
    errorMessage: string | null;
}

export function ResetPasswordForm({ token, onSuccess, onResetPassword, isLoading, errorMessage }: ResetPasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormInputs>();

    const newPasswordValue = watch("newPassword");

    const onSubmit = async (data: ResetPasswordFormInputs) => {
        if (!data.newPassword) return;
        const res = await onResetPassword(token, data.newPassword);
        if (res.success) {
            onSuccess();
        }
    };

    return (
        <div>
            {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-red-400" />
                    <p>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full pl-10 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.newPassword && <p className="text-xs text-red-400 mt-1.5">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Confirm New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === newPasswordValue || "Passwords do not match",
                            })}
                            className="w-full pl-10 pr-10 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-400 mt-1.5">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Updating Password...</span>
                        </>
                    ) : (
                        <>
                            <span>Reset Password</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
