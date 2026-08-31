import * as React from "react";

interface ContactEmailTemplateProps {
    name: string;
    email: string;
    message: string;
    social?: string;
    replyUrl?: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({ name, email, message, social, replyUrl }) => (
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#10b981",
                            boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                        }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: "1px" }}>New Message Received</span>
                </div>
                <h1 style={{ margin: "12px 0 0 0", fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>Appon Islam Portfolio</h1>
            </div>

            {/* Content Body */}
            <div style={{ padding: "28px" }}>
                {/* Sender Details */}
                <div
                    style={{
                        backgroundColor: "#09090b",
                        border: "1px solid #27272a",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "24px",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: "6px 0", color: "#a1a1aa", width: "90px" }}>From:</td>
                                <td style={{ padding: "6px 0", color: "#ffffff", fontWeight: 600 }}>{name}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "6px 0", color: "#a1a1aa" }}>Email:</td>
                                <td style={{ padding: "6px 0" }}>
                                    <a href={`mailto:${email}`} style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 500 }}>
                                        {email}
                                    </a>
                                </td>
                            </tr>
                            {social && (
                                <tr>
                                    <td style={{ padding: "6px 0", color: "#a1a1aa" }}>Social:</td>
                                    <td style={{ padding: "6px 0" }}>
                                        <a href={social} target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>
                                            {social}
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Message Body */}
                <div style={{ marginBottom: "28px" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</p>
                    <div
                        style={{
                            backgroundColor: "#09090b",
                            border: "1px solid #27272a",
                            borderRadius: "12px",
                            padding: "20px",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "#e4e4e7",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {message}
                    </div>
                </div>

                {/* Reply CTA */}
                <div style={{ textAlign: "center", paddingTop: "8px" }}>
                    <a
                        href={replyUrl || `mailto:${email}`}
                        style={{
                            display: "inline-block",
                            backgroundColor: "#ffffff",
                            color: "#09090b",
                            padding: "12px 32px",
                            borderRadius: "10px",
                            fontWeight: 600,
                            fontSize: "14px",
                            textDecoration: "none",
                        }}
                    >
                        Reply to {name}
                    </a>
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
                    Received via{" "}
                    <a href="https://www.apponislam.com" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                        apponislam.com
                    </a>
                </p>
            </div>
        </div>
    </div>
);
