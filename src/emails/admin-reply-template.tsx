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
                                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "1px", display: "inline-block" }}>
                                            Response from Appon Islam
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h1 style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>
                            Reply to your inquiry
                        </h1>
                    </td>
                </tr>

                {/* Content Body */}
                <tr>
                    <td style={{ padding: "32px 28px" }}>
                        <p style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginTop: 0 }}>
                            Hi {recipientName},
                        </p>

                        {/* Admin's Reply Content */}
                        <div
                            style={{
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderLeft: "4px solid #10b981",
                                borderRadius: "8px",
                                padding: "20px",
                                fontSize: "15px",
                                lineHeight: "1.6",
                                color: "#0f172a",
                                whiteSpace: "pre-wrap",
                                margin: "20px 0 24px 0",
                            }}
                        >
                            {replyMessage}
                        </div>

                        {/* Original Message Quote */}
                        {originalMessage && (
                            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                                <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                    Your Original Message
                                </p>
                                <div
                                    style={{
                                        backgroundColor: "#f8fafc",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        padding: "14px 16px",
                                        fontSize: "13px",
                                        lineHeight: "1.5",
                                        color: "#64748b",
                                        fontStyle: "italic",
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    "{originalMessage}"
                                </div>
                            </div>
                        )}

                        {/* Sign-off & SVG Social Icons Table */}
                        <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                            <tbody>
                                <tr>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>Appon Islam</p>
                                        <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#64748b" }}>Full Stack Developer & Software Engineer</p>
                                    </td>
                                    <td align="right" style={{ verticalAlign: "middle" }}>
                                        <table border={0} cellPadding={0} cellSpacing={0}>
                                            <tbody>
                                                <tr>
                                                    {/* 1. LinkedIn */}
                                                    <td style={{ paddingLeft: "8px" }}>
                                                        <a
                                                            href="https://www.linkedin.com/in/apponislam/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="LinkedIn"
                                                            style={{
                                                                display: "inline-block",
                                                                width: "36px",
                                                                height: "36px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#0077b5",
                                                                textAlign: "center",
                                                                lineHeight: "36px",
                                                                textDecoration: "none",
                                                            }}
                                                        >
                                                            <img
                                                                src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png"
                                                                alt="LinkedIn"
                                                                width="18"
                                                                height="18"
                                                                style={{ verticalAlign: "middle", border: 0 }}
                                                            />
                                                        </a>
                                                    </td>

                                                    {/* 2. WhatsApp */}
                                                    <td style={{ paddingLeft: "8px" }}>
                                                        <a
                                                            href="https://wa.me/8801722779803"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="WhatsApp"
                                                            style={{
                                                                display: "inline-block",
                                                                width: "36px",
                                                                height: "36px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#25d366",
                                                                textAlign: "center",
                                                                lineHeight: "36px",
                                                                textDecoration: "none",
                                                            }}
                                                        >
                                                            <img
                                                                src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
                                                                alt="WhatsApp"
                                                                width="18"
                                                                height="18"
                                                                style={{ verticalAlign: "middle", border: 0 }}
                                                            />
                                                        </a>
                                                    </td>

                                                    {/* 3. Facebook */}
                                                    <td style={{ paddingLeft: "8px" }}>
                                                        <a
                                                            href="https://facebook.com/apponislam"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="Facebook"
                                                            style={{
                                                                display: "inline-block",
                                                                width: "36px",
                                                                height: "36px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#1877f2",
                                                                textAlign: "center",
                                                                lineHeight: "36px",
                                                                textDecoration: "none",
                                                            }}
                                                        >
                                                            <img
                                                                src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
                                                                alt="Facebook"
                                                                width="18"
                                                                height="18"
                                                                style={{ verticalAlign: "middle", border: 0 }}
                                                            />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                            Sent from{" "}
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
