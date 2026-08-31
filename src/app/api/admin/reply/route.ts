import React from "react";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/contact";
import { AdminReplyEmailTemplate } from "@/emails/admin-reply-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { contactId, replyMessage } = body;

        if (!contactId || !replyMessage) {
            return NextResponse.json(
                { success: false, error: "contactId and replyMessage are required." },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return NextResponse.json(
                { success: false, error: "Contact record not found." },
                { status: 404 }
            );
        }

        const fromEmail = process.env.RESEND_FROM_EMAIL;
        if (!fromEmail) {
            throw new Error("RESEND_FROM_EMAIL environment variable is not set.");
        }

        // Send custom reply email to sender via Resend
        const sendResult = await resend.emails.send({
            from: fromEmail,
            to: contact.email,
            subject: `Re: Your inquiry on apponislam.com`,
            react: AdminReplyEmailTemplate({
                recipientName: contact.name,
                replyMessage: replyMessage,
                originalMessage: contact.message,
            }) as React.ReactElement,
        });

        // Update Contact document status to 'replied' and store reply in replies array
        contact.status = "replied";
        contact.repliedAt = new Date();
        if (!contact.replies) {
            contact.replies = [];
        }
        contact.replies.push({
            replyMessage: replyMessage,
            sentAt: new Date(),
            resendId: sendResult.data?.id || "",
        });
        await contact.save();

        return NextResponse.json({
            success: true,
            message: "Reply sent successfully!",
            resendId: sendResult.data?.id,
        });
    } catch (error: any) {
        console.error("Error sending admin reply:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to send reply." },
            { status: 500 }
        );
    }
}
