import * as React from "react";

interface AdminReplyEmailTemplateProps {
    recipientName: string;
    replyMessage: string;
    originalMessage?: string;
}

export const AdminReplyEmailTemplate: React.FC<AdminReplyEmailTemplateProps> = ({
    recipientName,
    replyMessage,
    originalMessage,
}) => (
    <div
        style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            backgroundColor: "#09090b",
            padding: "40px 20px",
            color: "#f4f4f5",
        }}
    >
        <div
            style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#18181b",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #27272a",
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "32px 28px 24px 28px",
                    borderBottom: "1px solid #27272a",
                }}
            >
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#10b981",
                        }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Response from Appon Islam
                    </span>
                </div>
                <h1 style={{ margin: "8px 0 0 0", fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>
                    Reply to your inquiry
                </h1>
            </div>

            {/* Content Body */}
            <div style={{ padding: "32px 28px" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", marginTop: 0 }}>
                    Hi {recipientName},
                </p>

                {/* Admin's Reply Content */}
                <div
                    style={{
                        backgroundColor: "#09090b",
                        border: "1px solid #27272a",
                        borderLeft: "4px solid #10b981",
                        borderRadius: "12px",
                        padding: "20px",
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "#f4f4f5",
                        whiteSpace: "pre-wrap",
                        margin: "20px 0 24px 0",
                    }}
                >
                    {replyMessage}
                </div>

                {/* Original Message Quote (If provided) */}
                {originalMessage && (
                    <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #27272a" }}>
                        <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Your Original Message
                        </p>
                        <div
                            style={{
                                backgroundColor: "#09090b",
                                border: "1px solid #27272a",
                                borderRadius: "8px",
                                padding: "14px 16px",
                                fontSize: "13px",
                                lineHeight: "1.5",
                                color: "#a1a1aa",
                                fontStyle: "italic",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            "{originalMessage}"
                        </div>
                    </div>
                )}

                {/* Sign-off & Social Icons */}
                <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>
                            Appon Islam
                        </p>
                        <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#71717a" }}>
                            Full Stack Developer & Software Engineer
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        {/* 1. LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/apponislam/"
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#27272a",
                                color: "#0077b5",
                                textDecoration: "none",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                            </svg>
                        </a>

                        {/* 2. WhatsApp */}
                        <a
                            href="https://wa.me/8801722779803"
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#27272a",
                                color: "#25d366",
                                textDecoration: "none",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 16.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.67 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.66.8-.81.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
                            </svg>
                        </a>

                        {/* 3. Facebook */}
                        <a
                            href="https://facebook.com/apponislam"
                            target="_blank"
                            rel="noreferrer"
                            title="Facebook"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#27272a",
                                color: "#1877f2",
                                textDecoration: "none",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    backgroundColor: "#09090b",
                    padding: "20px 28px",
                    borderTop: "1px solid #27272a",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#71717a",
                }}
            >
                <p style={{ margin: 0 }}>
                    Sent from{" "}
                    <a href="https://www.apponislam.com" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        apponislam.com
                    </a>
                </p>
            </div>
        </div>
    </div>
);
