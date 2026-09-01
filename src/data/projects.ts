export interface Project {
    _id: string;
    type: string;
    companyName: string;
    category: string[];
    shortDescription: string;
    websiteLink?: string;
    githubLink?: string;
    githubFrontendLink?: string;
    githubBackendLink?: string;
    liveLink?: string;
    productionLink?: string;
    appLink?: string;
    techStack: string[];
    startDate: string;
    endDate: string;
    companyLogoImg: string;
    images: string[];
    descriptionDetails: {
        paragraphs: string[];
        bullets: string[];
    };
    warning?: string;
}

export const projectsData: Project[] = [
    {
        _id: "1",
        type: "Personal Project",
        companyName: "Bike Shop Application",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A complete bike e-commerce platform with secure JWT-based authentication, role-based dashboards, product filters, and integrated SurjoPay payment system.",
        websiteLink: "https://peppy-hotteok-65ea2d.netlify.app/",
        githubLink: "https://github.com/apponislam/bike-store-frontend",
        techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "Typescript", "MongoDB", "JWT", "SurjoPay"],
        startDate: "2025-04-01",
        endDate: "2025-06-10",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945838/iihrwdulbus4qb2gel5v.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945841/rgp4xeabeuvswee7imac.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945864/hayfdpeujq8d4gkryzct.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945888/avgeqomzudclaycntwud.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945910/vclcacoupuket5xv5nom.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945987/dctqfpcag7sxnpxnt3bi.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750946015/ghizuld8wtalp8x6dscp.png",
        ],
        descriptionDetails: {
            paragraphs: [
                "Bike Shop is an online platform that allows customers to browse, search, and filter bikes with ease. Authenticated users can place orders, track status, and manage their profiles securely.",
                "Admins can manage all users, orders, and product listings with complete control from their dedicated dashboard. SurjoPay is integrated for secure payment transactions.",
            ],
            bullets: ["JWT-based role authentication for customers and admins", "Dynamic search, filters, and product detail pages", "SurjoPay integration for secure checkout", "Admin dashboard for user, product, and order management", "Track orders with real-time status updates"],
        },
    },
    {
        _id: "2",
        type: "Personal Project",
        companyName: "AP Classroom",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A MERN-stack learning-management platform with role-based dashboards for students, teachers, and admins, featuring class creation, enrollment, assignments, payments, and comprehensive analytics.",
        websiteLink: "https://assignmentb9a12.web.app/",
        githubLink: "https://github.com/apponislam/Classrooms-client",
        techStack: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "TanStack Query", "react-hook-form", "SurjoPay"],
        startDate: "2025-05-15",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750942876/alwzdx9qsdzhzneplt6g.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750942876/alwzdx9qsdzhzneplt6g.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943047/gfyr0aun4kpxmgepge47.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943494/k1rvltakhcyboljsrawu.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943436/di4hflf7ii8f33jvt5fs.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943466/dyub7fc2zrdb6do2vfxt.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943151/y7zqotr9wmeli7zsa1lf.png",
        ],
        descriptionDetails: {
            paragraphs: [
                "EduManage streamlines class management by connecting institutions, tutors, and students on a single, responsive platform. Users register securely, browse approved classes, and enroll using SurjoPay-powered checkout.",
                "Role-based dashboards empower teachers to add classes and assignments, students to track progress and submit work, and admins to approve content, handle user roles, and monitor site analytics—all with real-time feedback and toast notifications.",
            ],
            bullets: [
                "JWT authentication with secure password hashing",
                "Student, Teacher, and Admin dashboards with protected routes",
                "Teacher request workflow and class approval pipeline",
                "TanStack Query for optimized GET data fetching",
                "Full CRUD on users, classes, orders, and assignments",
                "Nested feedback system displayed on the Home page",
                "SurjoPay integration for paid course enrollment",
                "Responsive UI for mobile, tablet, and desktop",
                "Toast alerts for all CRUD operations and auth events",
                "Environment-secured MongoDB & Firebase credentials",
            ],
        },
    },
    {
        _id: "3",
        type: "Personal Project",
        companyName: "Appon Assignment Library",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "An online group study platform built with the MERN stack allowing users to create, attempt, and grade assignments collaboratively with secure auth, role-based logic, and PDF preview.",
        websiteLink: "https://assignmentb9a11.web.app/",
        githubLink: "https://github.com/apponislam/assignments-client",
        techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "Google Auth"],
        startDate: "2025-06-10",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943676/btd2rfqpojdayjpuug2q.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750943676/btd2rfqpojdayjpuug2q.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959049/rwfagwqiqehoaxfpd596.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959055/jcyozxekp7btgahvey65.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959062/nb8rvtdiirfea4syw1pi.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959084/cdgzpcmj8ouelt3jt8qk.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959086/atoigwjnipll8jh0d99e.png",
        ],
        descriptionDetails: {
            paragraphs: [
                "GroupStudy Hub is a MERN stack web app for students to collaboratively create, take, and evaluate assignments. Each user can post new assignments, attempt others', and grade pending submissions from friends. The system supports file-based submissions, grading workflows, and personalized dashboards.",
                "The platform features a custom design, PDF preview in submitted assignments, JWT-based protected routes, responsive layout, and dark/light mode toggle for better user experience.",
            ],
            bullets: [
                "JWT-based auth with token storage in localStorage for Email/Google login",
                "Create, view, filter, update, and delete assignments (CRUD)",
                "Only the creator can delete an assignment (with secure checks)",
                "Users can submit assignments via link + notes with file preview support",
                "Admins and users can mark assignments and give feedback",
                "Dark/Light theme toggle for accessibility and user preference",
                "PDF preview in iframe on submitted assignments page",
                "Form validation on all forms with `react-hook-form`",
                "Difficulty level filtering using a dropdown menu",
                "Responsive design for desktop, tablet, and mobile devices",
            ],
        },
    },
    {
        _id: "4",
        type: "Personal Project",
        companyName: "Appon Painting & Drawing",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "Appon Painting & Drawing is a Jute & Wooden-Craft e-commerce platform with secure auth, private dashboards, and fully responsive design.",
        websiteLink: "https://assignmentb9a10.web.app/",
        githubLink: "https://github.com/apponislam/painting-drawing-client",
        techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Typescript", "Javascript", "HTML 5", "CSS 3", "Google Auth"],
        startDate: "2025-06-12",
        endDate: "2025-06-26",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959177/q5uqgngk8eubzpk0nwe3.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959171/wninbrdrznaha0zigbf6.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959201/napz9rqmkh7a4pdikrrm.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959208/tw4rrpapdelf0t8s32wl.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959238/kbjmhli2oryjvsp8hgqh.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750959256/mxtpijllql1uym6yakqo.png",
        ],
        descriptionDetails: {
            paragraphs: [
                "CraftNest lets artists and buyers connect over unique jute and wooden crafts. Users can securely add, update, and manage their own products, while visitors explore curated items by sub-category.",
                "The site features JWT-protected routes, Google/Firebase authentication, TanStack-Query data fetching, and dark/light theme switching for an engaging shopping experience.",
            ],
            bullets: [
                "Private dashboards for adding, updating, and deleting crafts",
                "Category & sub-category filtering with responsive UI",
                "Form validation and toast notifications for all CRUD actions",
                "Dark / light theme toggle and Lottie animations on the home page",
                "Fully environment-secured Firebase & MongoDB credentials",
            ],
        },
    },
    {
        _id: "5",
        type: "Personal Project",
        companyName: "Sustainability Idea Hub",
        category: ["Full Stack", "Web Dev"],
        shortDescription: "A full-stack platform for sharing and managing sustainability-focused ideas with role-based access, voting, comments, and paid content system.",
        websiteLink: "https://idea-hub-client.vercel.app/",
        githubLink: "https://github.com/apponislam/idea-hub-client",
        githubFrontendLink: "https://github.com/apponislam/idea-hub-client",
        githubBackendLink: "https://github.com/apponislam/idea-hub-server",
        liveLink: "https://idea-hub-client.vercel.app/",
        productionLink: "https://idea-hub-client.vercel.app/",
        appLink: "https://idea-hub-client.vercel.app/",
        techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "Typescript", "PostgreSQL", "Prisma", "JWT"],
        startDate: "2025-03-10",
        endDate: "2025-05-01",
        companyLogoImg: "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945636/uljmooa6wwmk8nyxoya1.png",
        images: [
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945645/tbvxsx4gd0oxi1zppiou.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945689/vttlmzd2glycl6ej3en2.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945728/otqcoz6fkoaqd4l2ylmy.png",
            "https://res.cloudinary.com/dqkx3gcnm/image/upload/v1750945760/rnrvbemx7rlvr0hlqo37.png",
        ],
        descriptionDetails: {
            paragraphs: [
                "Sustainability Idea Hub is a web application where users can submit, discuss, and vote on eco-friendly ideas. Members can categorize ideas, comment with nested threads, and interact through a Reddit-style voting system.",
                "Admins can review submissions, give feedback, and highlight impactful projects. Additionally, members can monetize their ideas by marking them as 'Paid', which requires payment for access.",
            ],
            bullets: [
                "JWT-based authentication and role management (Member/Admin)",
                "Paid/free idea visibility control with SSLCommerz integration",
                "Nested commenting and voting system like Reddit",
                "Admin approval/rejection with feedback mechanism",
                "Search and filter ideas by keyword or category",
            ],
        },
        warning: "Note: This project is hosted on a free tier and may take a few seconds to spin up on initial load. Sandbox payment mode is enabled.",
    },
    {
        _id: "6",
        type: "Personal Project",
        companyName: "Bazar Hisab",
        category: ["FinTech", "Expense Tracker", "Web Application", "Mobile Application"],
        shortDescription: "Your family and group market expense tracker, budget planner, and daily bazar account book.",
        websiteLink: "https://bazarhisab.com",
        githubFrontendLink: "https://github.com/apponislam/mybazarhisab-frontend-web",
        githubBackendLink: "https://github.com/apponislam/bazarhisab-backend",
        liveLink: "https://bazarhisab.com",
        productionLink: "https://bazarhisab.com",
        appLink: "https://bazarhisab.com/download",
        techStack: ["Next.js 16", "React 19", "React Native", "TypeScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Redux Toolkit", "RTK Query", "Tailwind CSS", "Zod", "PDFKit"],
        startDate: "2025-01-15",
        endDate: "Present",
        companyLogoImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
        ],
        descriptionDetails: {
            paragraphs: [
                "Bazar Hisab is a comprehensive, full-stack financial platform and mobile application specifically designed for household budgeting, grocery market expense calculation (bazar), shared flat/mess accounting, and daily expenditure ledger management.",
                "The system consists of a RESTful Express.js backend, a Next.js 16 web application with admin portal features, and a cross-platform React Native mobile app. It solves common group financial management challenges by enabling real-time ledger settlement, automated bill calculations, itemized grocery logging, and analytical tracking of product price growth over time.",
            ],
            bullets: [
                "Bulk Bazar & Grocery Entry Grid with itemized quantity, unit, price logging, and automated user balance updating.",
                "Shared Mess & Household Budget Ledger supporting multi-user groups, member deposits, and instant balance calculations.",
                "Product Price Trend Analytics tracking historical market price fluctuations across custom categories.",
                "Role-Based Access Control (RBAC) with secure JWT authentication, cookie management, and user permissions.",
                "Cross-Platform Accessibility via Next.js web application and React Native mobile application.",
                "Automated Statement & Invoice Generation exporting PDF financial reports via PDFKit.",
            ],
        },
    },
    {
        _id: "7",
        type: "Professional",
        companyName: "LetANest - Short-Term Lets & Festival Stays",
        category: ["Professional", "Booking Platform", "Full Stack", "Web Dev"],
        shortDescription: "LetANest is a premium UK-based festival and short-term accommodation booking platform featuring glamping reservations, Stripe checkouts, and custom Lexical text editor messaging.",
        websiteLink: "https://letanest.com/",
        liveLink: "https://letanest.com/",
        productionLink: "https://letanest.com/",
        githubFrontendLink: "https://github.com/apponislam/letanest",
        githubBackendLink: "https://github.com/apponislam/letanest-server",
        techStack: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Stripe", "Lexical Editor", "Socket.io", "Typescript"],
        startDate: "2025-11-10",
        endDate: "2026-02-20",
        companyLogoImg: "/projects/letanest/banner.webp",
        images: ["/projects/letanest/banner.webp", "/projects/letanest/desktop_home.webp", "/projects/letanest/mobile_home.webp", "/projects/letanest/desktop_details.webp"],
        descriptionDetails: {
            paragraphs: [
                "LetANest is a full-featured premium event and festival accommodation booking platform operating in the United Kingdom. Designed to streamline short-term rentals during events like the Edinburgh Festival, it offers event-goers a smooth experience for finding, reserving, and paying for glamping setups, bell tents, and event pods.",
                "The platform incorporates a rich text messaging system built with Lexical Editor for smooth host-guest communication, secure checkout via Stripe, custom search filters, interactive calendars, and structured host/guest dashboards for complete bookings management.",
            ],
            bullets: [
                "Next.js App Router for optimized static generation and server-side rendering",
                "Stripe payment gateway integration with webhooks and transactional success pipelines",
                "Real-time guest-host messaging system featuring a customized Lexical Rich Text Editor",
                "Dynamic event-based filters, booking calendar dates, and price calculators",
                "Advanced client-side state management using Redux Toolkit",
                "Comprehensive dashboards for hosts (listings, bookings, earnings analytics) and guests (booking schedule, history)",
            ],
        },
    },
    {
        _id: "8",
        type: "Full Stack E-Commerce Platform",
        companyName: "Peptide Club",
        category: ["E-Commerce", "Full Stack", "Healthcare & Research", "Web Application"],
        shortDescription: "A premium full-stack e-commerce platform for research peptides featuring dynamic user pricing tiers, Stripe payment integration, automated ShipStation logistics, and a comprehensive admin analytics portal.",
        websiteLink: "https://peptide.club",
        liveLink: "https://peptide.club",
        productionLink: "https://peptide.club",
        githubFrontendLink: "https://github.com/apponislam/Peptide-Frontend",
        githubBackendLink: "https://github.com/apponislam/Peptide-Backend",
        techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Redux Toolkit", "RTK Query", "Node.js", "Express.js", "Prisma ORM", "PostgreSQL", "Stripe API", "ShipStation API", "Resend API", "Zod"],
        startDate: "Jan 2026",
        endDate: "Apr 2026",
        companyLogoImg: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=300&q=80",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
        ],
        descriptionDetails: {
            paragraphs: [
                "PEPTIDE.CLUB is a state-of-the-art e-commerce platform custom-built for research peptides and laboratory compounds. Designed with high performance and security in mind, the platform integrates a modern Next.js 16 App Router frontend with a scalable Express.js backend infrastructure.",
                "The platform offers a seamless shopping experience featuring automated multi-tier discount pricing (Member, VIP, Founder), persistent cart state management powered by Redux Toolkit, secure Stripe payment processing, and automated shipping label generation through ShipStation integration.",
                "On the administration side, PEPTIDE.CLUB provides store managers with real-time sales analytics, product inventory management with dynamic pricing controls, customer order lifecycle tracking, and an invite-based referral system.",
            ],
            bullets: [
                "Architected full-stack web application using Next.js 16 (App Router), TypeScript, Express.js, PostgreSQL, and Prisma ORM.",
                "Integrated Stripe payment gateway with webhook handling for secure checkout sessions, payment verifications, and order previews.",
                "Automated logistics workflow by integrating ShipStation API for shipping order creation, rate estimation, label generation, and tracking updates.",
                "Designed a multi-tier membership system (Member 10%, VIP 20%, Founder 20% discounts) with referral invitation rewards and conditional free shipping.",
                "Implemented state management and API caching using Redux Toolkit and RTK Query with automatic JWT access and refresh token rotation.",
                "Configured transactional email notifications (OTP verification, order status, shipping confirmation) using Resend API.",
                "Engineered a dedicated Admin Panel featuring product CRUD operations, stock status toggling, soft delete/restore mechanisms, and user administration.",
            ],
        },
    },
    {
        _id: "9",
        type: "Professional",
        companyName: "Djarna - P2P Social Marketplace",
        category: ["E-Commerce", "Marketplace", "Web Development", "Mobile App"],
        shortDescription: "A multi-vendor peer-to-peer (P2P) social marketplace platform featuring real-time offer negotiation, Paydunya/Wave mobile payments with automated escrow holds, DExchange/Twilio SMS verification, seller wallets, Flutter mobile app, and a Next.js admin dashboard.",
        websiteLink: "https://dashboard.djarna.com",
        githubLink: "https://github.com/example/djarna-monorepo",
        githubFrontendLink: "https://github.com/example/djarna-dashboard",
        githubBackendLink: "https://github.com/example/djarna-backend",
        liveLink: "https://dashboard.djarna.com",
        productionLink: "https://dashboard.djarna.com",
        appLink: "https://play.google.com/store/apps/details?id=com.mohamed.djarna",
        techStack: ["Next.js", "TypeScript", "React", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "Redux Toolkit", "Tailwind CSS", "Flutter", "Paydunya Gateway", "DExchange SMS API", "Twilio SMS", "Firebase FCM", "Zod", "Nodemailer", "Multer & Sharp"],
        startDate: "2026-05-01",
        endDate: "2026-08-30",
        companyLogoImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
        ],
        descriptionDetails: {
            paragraphs: [
                "Djarna is a full-featured peer-to-peer (P2P) social marketplace platform designed to connect buyers and sellers seamlessly across Web and Mobile. It features a complete multi-vendor ecosystem with real-time price negotiation, listing promotions, seller wallet withdrawals, identity verification (KYC), and multi-channel payment integrations.",
                "The project ecosystem comprises three primary components: an Express.js & MongoDB backend REST API with Socket.IO real-time syncing, a Next.js administrative dashboard for platform moderation and business metrics analytics, and a cross-platform mobile application built with Flutter.",
            ],
            bullets: [
                "Engineered a Dual SMS & Email OTP Engine powered by DExchange SMS API and Twilio SMS for mobile phone verification, alongside Nodemailer SMTP fallbacks and OAuth (Google, Apple, Facebook).",
                "Integrated Paydunya checkout gateway supporting Mobile Money (Wave, Orange Money, Free Money, Expresso) with instant IPN webhook reconciliation and automated escrow fund release timers.",
                "Architected a real-time price negotiation bidding system using Socket.IO, allowing buyers and sellers to propose, counter, accept, or reject price and shipping offers directly in chat threads.",
                "Built a seller wallet earnings hub supporting automated payout disbursements directly to sellers' mobile money numbers upon order delivery confirmation or escrow release expiry.",
                "Implemented KYC Identity Verification (National ID / Passport upload + live selfie check) with admin review workflows to award official verified seller badges.",
                "Designed product boost & promotion packages with background cron jobs to manage boost expiry windows and send Firebase Cloud Messaging (FCM) push alerts.",
                "Developed a Next.js Admin Dashboard featuring live data widgets for report tracking, user management, identity verifications, dispute resolutions, and commission management.",
            ],
        },
        warning: "Demo environment has simulated payment gateways enabled.",
    },
];
