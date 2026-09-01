"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

interface ResetPasswordFormData {
  newPassword?: string;
  confirmPassword?: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const newPasswordValue = watch("newPassword");

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("reset_token") || "" : "";
    setToken(storedToken);
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!data.newPassword) return;
    setErrorMessage(null);
    try {
      const res = await resetPassword({
        token,
        newPassword: data.newPassword,
      }).unwrap();
      if (res.success) {
        setIsSuccess(true);
        localStorage.removeItem("reset_token");
        localStorage.removeItem("reset_email");
      } else {
        setErrorMessage(res.message || "Failed to reset password.");
      }
    } catch (err: any) {
      setErrorMessage(err?.data?.message || err?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {!isSuccess && (
          <Link
            href="/dashboard/verify-otp"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Link>
        )}

        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            {isSuccess ? "Password Reset!" : "Set New Password"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSuccess
              ? "Your password has been updated successfully."
              : "Please enter your new password below."}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
            {errorMessage}
          </div>
        )}

        {isSuccess ? (
          <div className="text-center space-y-6">
            <div className="p-3 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              Password updated successfully!
            </div>

            <Button onClick={() => router.push("/dashboard/login")} className="w-full">
              Back to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-destructive">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPasswordValue || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
