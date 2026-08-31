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

export const Contact = models.Contact || model<IContact>("Contact", ContactSchema);
