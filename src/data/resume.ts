export interface ResumeItem {
    id: string;
    title: string;
    organization: string;
    location?: string;
    duration: string;
    description: string[];
}

export interface CertificateItem {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
    isOngoing?: boolean;
    description: string[];
}

export const experienceData: ResumeItem[] = [
    {
        id: "exp-1",
        title: "Full Stack Developer",
        organization: "Sparktech Agency",
        duration: "August 2025 - Present",
        description: [
            "Develop modern, responsive web applications using the MERN stack (MongoDB, Express, React, Node.js) and Next.js.",
            "Design and implement secure RESTful APIs, database schemas (MongoDB, PostgreSQL), and role-based authentication systems (JWT, Firebase).",
            "Convert complex Figma/PSD design layouts into clean, semantic, and pixel-perfect React/Tailwind CSS components.",
            "Integrate third-party services, including payment gateways (SurjoPay, SSLCommerz) and state management solutions (Zustand, Redux)."
        ]
    }
];

export const educationData: ResumeItem[] = [
    {
        id: "edu-1",
        title: "B.Sc. in Computer Science & Engineering",
        organization: "Northern University Bangladesh",
        location: "Dhaka, Bangladesh",
        duration: "2025 - Present",
        description: [
            "Pursuing a Bachelor of Science degree in Computer Science and Engineering.",
            "Acquiring advanced knowledge in Algorithms, Software Architecture, System Design, and Database Systems."
        ]
    },
    {
        id: "edu-2",
        title: "Diploma in Computer Technology",
        organization: "Dinajpur Polytechnic Institute",
        location: "Dinajpur, Bangladesh",
        duration: "2020 - 2024",
        description: [
            "Graduated with a focus on Computer Technology, Network Administration, and core software engineering concepts.",
            "Engaged in practical projects involving system administration, database creation, and software development."
        ]
    }
];

export const certificatesData: CertificateItem[] = [
    {
        id: "cert-3",
        title: "Computer Science & Fundamentals",
        issuer: "Phitron",
        issueDate: "Ongoing",
        isOngoing: true,
        credentialUrl: "https://phitron.io/",
        description: [
            "In-depth learning of Data Structures & Algorithms, C++, Object-Oriented Programming (OOP), Software Engineering principles, and Problem Solving.",
        ],
    },
    {
        id: "cert-2",
        title: "Next Level Web Development",
        issuer: "Programming Hero",
        issueDate: "2025",
        credentialUrl: "https://next.programming-hero.com/",
        description: [
            "Advanced web engineering focusing on TypeScript, Next.js, Redux Toolkit, PostgreSQL, Prisma/Mongoose, and microservices architecture.",
            "Mastered enterprise-level application design, performance optimization, and scalable backend implementations.",
        ],
    },
    {
        id: "cert-1",
        title: "Complete Web Development Course",
        issuer: "Programming Hero",
        issueDate: "2024",
        credentialUrl: "https://web.programming-hero.com",
        description: [
            "Comprehensive training covering modern JavaScript, React, Node.js, Express, and MongoDB.",
            "Built multiple full-stack production-ready applications with clean code and industry standards.",
        ],
    },
];
