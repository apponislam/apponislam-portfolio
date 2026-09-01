"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, RotateCcw } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("reset_email") || "" : "";
    setEmail(storedEmail);
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
    if (otpCode.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await verifyOtp({ email, otp: otpCode }).unwrap();
      if (res.success && res.data?.token) {
        localStorage.setItem("reset_token", res.data.token);
        setSuccessMessage("OTP verified successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard/reset-password");
        }, 1000);
      } else {
        setErrorMessage(res.message || "Invalid or expired OTP code.");
      }
    } catch (err: any) {
      setErrorMessage(err?.data?.message || err?.message || "Invalid verification code.");
    }
  };

  const handleResend = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setOtp(new Array(6).fill(""));
    try {
      const res = await resendOtp({ email }).unwrap();
      if (res.success) {
        setSuccessMessage("A new 6-digit code has been sent to your email.");
        inputRefs.current[0]?.focus();
      } else {
        setErrorMessage(res.message || "Failed to resend code.");
      }
    } catch (err: any) {
      setErrorMessage(err?.data?.message || err?.message || "Failed to resend code.");
    }
  };

  return (
    <div className="min-h-[65vh] flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Link
          href="/dashboard/forgot-password"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </Link>

        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Verify Code</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to <span className="font-medium text-foreground">{email || "your email"}</span>
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-center text-muted-foreground">
              6-Digit Verification Code
            </label>

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
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>Didn't receive code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium disabled:opacity-50"
            >
              {isResending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
              <span>Resend Code</span>
            </button>
          </div>

          <Button type="submit" disabled={isVerifying || otp.join("").length !== 6} className="w-full">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
