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
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            backgroundColor: "#f8fafc",
            padding: "40px 10px",
            color: "#0f172a",
        }}
    >
        <table
            align="center"
            border={0}
            cellPadding={0}
            cellSpacing={0}
            width="100%"
            style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
            }}
        >
            <tbody>
                {/* Header */}
                <tr>
                    <td style={{ padding: "32px 28px 24px 28px", borderBottom: "1px solid #e2e8f0" }}>
                        <table border={0} cellPadding={0} cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <td style={{ verticalAlign: "middle", paddingRight: "8px" }}>
                                        <div
                                            style={{
                                                width: "8px",
                                                height: "8px",
                                                borderRadius: "50%",
                                                backgroundColor: "#10b981",
                                                fontSize: "0px",
                                                lineHeight: "0px",
                                            }}
                                        />
                                    </td>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "1px", display: "inline-block" }}>New Message Received</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h1 style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Appon Islam Portfolio</h1>
                    </td>
                </tr>

                {/* Content Body */}
                <tr>
                    <td style={{ padding: "28px" }}>
                        {/* Sender Details Box */}
                        <table
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            style={{
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                padding: "16px 20px",
                                marginBottom: "24px",
                                fontSize: "14px",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td style={{ padding: "4px 0", color: "#64748b", width: "80px", fontWeight: 500 }}>From:</td>
                                    <td style={{ padding: "4px 0", color: "#0f172a", fontWeight: 600 }}>{name}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: "4px 0", color: "#64748b", fontWeight: 500 }}>Email:</td>
                                    <td style={{ padding: "4px 0" }}>
                                        <a href={`mailto:${email}`} style={{ color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
                                            {email}
                                        </a>
                                    </td>
                                </tr>
                                {social && (
                                    <tr>
                                        <td style={{ padding: "4px 0", color: "#64748b", fontWeight: 500 }}>Link:</td>
                                        <td style={{ padding: "4px 0" }}>
                                            <a href={social} target="_blank" rel="noreferrer" style={{ color: "#0284c7", textDecoration: "none" }}>
                                                {social}
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Message Body */}
                        <div style={{ marginBottom: "28px" }}>
                            <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</p>
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "8px",
                                    padding: "18px 20px",
                                    fontSize: "15px",
                                    lineHeight: "1.6",
                                    color: "#334155",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {message}
                            </div>
                        </div>

                        {/* Reply Button */}
                        <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody>
                                <tr>
                                    <td align="center" style={{ paddingTop: "8px" }}>
                                        <a
                                            href={replyUrl || `mailto:${email}`}
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: "#0f172a",
                                                color: "#ffffff",
                                                padding: "12px 28px",
                                                borderRadius: "8px",
                                                fontWeight: 600,
                                                fontSize: "14px",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Reply to {name}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                {/* Footer */}
                <tr>
                    <td
                        style={{
                            backgroundColor: "#f8fafc",
                            padding: "18px 28px",
                            borderTop: "1px solid #e2e8f0",
                            textAlign: "center",
                            fontSize: "12px",
                            color: "#64748b",
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            Received via{" "}
                            <a href="https://www.apponislam.com" style={{ color: "#0f172a", fontWeight: 600, textDecoration: "none" }}>
                                apponislam.com
                            </a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);
