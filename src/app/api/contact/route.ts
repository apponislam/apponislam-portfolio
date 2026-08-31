import React from "react";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/contact";
import { ContactEmailTemplate } from "@/emails/contact-email-template";
import { AutoReplyEmailTemplate } from "@/emails/auto-reply-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message, social } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        // Extract requester IP and User-Agent
        const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
        const userAgent = req.headers.get("user-agent") || "unknown";

        const fromEmail = process.env.RESEND_FROM_EMAIL;
        const toEmail = process.env.RESEND_TO_EMAIL;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.apponislam.com";

        if (!fromEmail || !toEmail) {
            throw new Error("RESEND_FROM_EMAIL and RESEND_TO_EMAIL must be defined in environment variables.");
        }

        // 1. Save contact message first to obtain _id for direct website reply link
        await connectToDatabase();
        const newContact = await Contact.create({
            name,
            email,
            message,
            social: social || "",
            ipAddress,
            userAgent,
            status: "unread",
        });

        // Direct reply link on your website (no login/search required)
        const replyUrl = `${siteUrl}/admin/reply/${newContact._id}`;

        // 2. Send Notification Email to You via Resend
        const adminEmailResult = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            react: ContactEmailTemplate({ name, email, message, social, replyUrl }) as React.ReactElement,
        });

        // 3. Send Auto-Reply Email to the Visitor via Resend
        const autoReplyResult = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Thank you for reaching out! | Appon Islam",
            react: AutoReplyEmailTemplate({ name }) as React.ReactElement,
        });

        // Update document with Resend IDs
        newContact.resendAdminId = adminEmailResult.data?.id || "";
        newContact.resendAutoReplyId = autoReplyResult.data?.id || "";
        await newContact.save();

        return NextResponse.json(
            {
                success: true,
                message: "Message saved and emails dispatched successfully!",
                contactId: newContact._id,
                resendAdminId: adminEmailResult.data?.id,
                resendAutoReplyId: autoReplyResult.data?.id,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error in contact API route:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to process contact request.",
            },
            { status: 500 }
        );
    }
}
