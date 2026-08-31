"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Loader2, ArrowRight } from "lucide-react";

interface RequestOtpFormInputs {
  email: string;
}

interface RequestOtpFormProps {
  onSuccess: (email: string) => void;
  onSubmitEmail: (email: string) => Promise<{ success: boolean; message?: string }>;
  isLoading: boolean;
  errorMessage: string | null;
}

export function RequestOtpForm({
  onSuccess,
  onSubmitEmail,
  isLoading,
  errorMessage,
}: RequestOtpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestOtpFormInputs>();

  const onSubmit = async (data: RequestOtpFormInputs) => {
    const res = await onSubmitEmail(data.email);
    if (res.success) {
      onSuccess(data.email);
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
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="admin@example.com"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Code...</span>
            </>
          ) : (
            <>
              <span>Send Reset Code</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
