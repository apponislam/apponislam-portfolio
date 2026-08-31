import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IReply {
    replyMessage: string;
    sentAt: Date;
    resendId?: string;
}

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    social?: string;
    ipAddress?: string;
    userAgent?: string;
    status: "unread" | "read" | "replied" | "archived";
    resendAdminId?: string;
    resendAutoReplyId?: string;
    adminNotes?: string;
    replies: IReply[];
    repliedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ReplySchema = new Schema<IReply>({
    replyMessage: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    resendId: { type: String, default: "" },
});

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        social: {
            type: String,
            trim: true,
            default: "",
        },
        ipAddress: {
            type: String,
            default: "",
        },
        userAgent: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["unread", "read", "replied", "archived"],
            default: "unread",
        },
        resendAdminId: {
            type: String,
            default: "",
        },
        resendAutoReplyId: {
            type: String,
            default: "",
        },
        adminNotes: {
            type: String,
            default: "",
        },
        replies: [ReplySchema],
        repliedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Deep Indexing for high-performance querying, sorting & filtering
// 1. Text index for full-text search across name, email, message and reply content
ContactSchema.index(
    {
        name: "text",
        email: "text",
        message: "text",
        "replies.replyMessage": "text",
    },
    {
        weights: {
            name: 10,
            email: 8,
            message: 5,
            "replies.replyMessage": 3,
        },
        name: "ContactTextIndex",
    }
);

// 2. Compound index for status filtering + sorting by creation date (admin contacts table)
ContactSchema.index({ status: 1, createdAt: -1 });

// 3. Single field indexes for fast lookups
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ "replies.sentAt": -1 });

export const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
