"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, ArrowRight, RotateCcw } from "lucide-react";

interface OtpVerificationFormProps {
    email: string;
    onVerifySuccess: (token: string) => void;
    onVerifyOtp: (otpCode: string) => Promise<{ success: boolean; token?: string; message?: string }>;
    onResendOtp: () => Promise<{ success: boolean; message?: string }>;
    isVerifying: boolean;
    isResending: boolean;
    errorMessage: string | null;
    successMessage: string | null;
}

export function OtpVerificationForm({ email, onVerifySuccess, onVerifyOtp, onResendOtp, isVerifying, isResending, errorMessage, successMessage }: OtpVerificationFormProps) {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        if (value.length > 1) {
            const digits = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newOtp[i] = digits[i] || "";
            }
            setOtp(newOtp);
            const nextFocus = Math.min(digits.length, 5);
            inputRefs.current[nextFocus]?.focus();
            return;
        }

        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6).split("");
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = digits[i] || "";
        }
        setOtp(newOtp);
        const nextFocus = Math.min(digits.length, 5);
        inputRefs.current[nextFocus]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length !== 6) return;

        const res = await onVerifyOtp(otpCode);
        if (res.success && res.token) {
            onVerifySuccess(res.token);
        }
    };

    const handleResend = async () => {
        setOtp(new Array(6).fill(""));
        await onResendOtp();
        inputRefs.current[0]?.focus();
    };

    return (
        <div>
            {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-red-400" />
                    <p>{errorMessage}</p>
                </div>
            )}

            {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-emerald-400" />
                    <p>{successMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 text-center">6-Digit Verification Code</label>

                    <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono bg-slate-950/80 border border-slate-700/80 rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition-all shadow-inner"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Didn't receive the code?</span>
                    <button type="button" onClick={handleResend} disabled={isResending} className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium transition-colors disabled:opacity-50">
                        {isResending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                        <span>Resend Code</span>
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isVerifying || otp.join("").length !== 6}
                    className="w-full py-3.5 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {isVerifying ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying Code...</span>
                        </>
                    ) : (
                        <>
                            <span>Verify & Continue</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
