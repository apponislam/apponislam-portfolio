<div align="center">

# 🌟 Appon Islam — Professional Portfolio & Admin Dashboard

### Modern Full-Stack Portfolio & Management System

  <br />

[![Live Website Banner](https://img.shields.io/badge/🌐_VISIT_LIVE_WEBSITE-WWW.APPONISLAM.COM-0070F3?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.apponislam.com)

  <br />

[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/apponislam/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

### 🔗 **Live Demo Application**: [https://www.apponislam.com](https://www.apponislam.com)

---

</div>

<br />

## 📖 Overview

**Appon Islam's Portfolio & Admin Management System** is a production-grade, state-of-the-art web application engineered with **Next.js 16 (App Router & Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Redux Toolkit (RTK Query)**.

The project serves a dual purpose:

1. **Public Portfolio Website**: An interactive, high-performance showcase highlighting professional experience, projects, skills, education, certifications, and contact options for potential clients and recruiters.
2. **Protected Admin Panel (`/dashboard`)**: A full-featured administration dashboard for real-time page analytics inspection, message inquiry management, user activity auditing, and secure authentication control.

---

## 🌐 Live Website

> 🚀 **Explore the Live Site**: **[https://www.apponislam.com](https://www.apponislam.com)**

---

## ✨ Key Features & Highlights

### 🎨 Public Portfolio Website

- **⚡ Lightning-Fast Performance**: Built on Next.js 16 App Router with Turbopack compilation and optimized asset loading.
- **🎨 Rich Modern Aesthetics**: Dark/light mode theme toggle (`next-themes`), custom glassmorphism effects, dynamic color tokens, and smooth scroll animations (`aos`).
- **🚀 Dynamic Projects Gallery**: Detailed project cards with category filtering, image sliders (`project-image-slider.tsx`), tech stack badges, and live demo / GitHub source links (`project-links-dropdown.tsx`).
- **💼 Work Experience Timeline**: Chronological experience breakdown highlighting key roles, contributions, and achievements (`experience-section.tsx`).
- **🎓 Education & Credentials**: Dedicated sections for academic history (`education-section.tsx`) and professional certificates (`certificates-section.tsx`).
- **🛠️ Categorized Skills Taxonomy**: Visual breakdown of frontend, backend, database, and devops tools (`skills-card.tsx`).
- **📩 Interactive Contact System**: Connected to Redux RTK Query (`useSendContactMessageMutation`) for instant inquiry submission with form validation and feedback toasts.
- **📊 Silent Client-Side Analytics Tracker**: Custom `AnalyticsTracker` provider that monitors route transitions and sends page view hits to the backend (`POST /page-analytics/track`).

---

### 🛡️ Admin Dashboard Suite (`/dashboard`)

- **🔒 Client-Side Route Protection (`AuthGuard`)**: Ensures unauthenticated visitors are automatically redirected away from protected dashboard routes to `/dashboard/login`.
- **🔐 Complete Auth & Password Management**:
    - Admin Login (`/dashboard/login`)
    - Forgot Password & OTP Request (`/dashboard/forgot-password`)
    - OTP Email Verification (`/dashboard/verify-otp`)
    - Password Reset (`/dashboard/reset-password`)
    - **Change Password Modal** accessible directly from the header profile avatar menu.
- **📊 Page Analytics Manager (`/dashboard/analytics`)**:
    - Detailed page view logs with IP address, browser user agent, referrer source, and exact timestamps.
    - Search & filter logs by page path.
    - Interactive **Details Inspection Modal** for deep technical metadata auditing.
- **📩 Contact Message Inquiry Manager (`/dashboard/contacts`)**:
    - View all incoming contact form submissions.
    - Filter messages by status (`all`, `unread`, `read`, `replied`).
    - View detailed message content and send email replies directly.
- **📜 Security & Activity Audit Trail (`/dashboard/activity`)**: Compact activity log viewer tracking administrative actions and platform events with server pagination.
- **📄 Standardized Pagination Component**: Custom `<Pagination>` controls mapped with backend pagination metadata (`total`, `page`, `limit`, `totalPages`).

---

## 🛠️ Technology Stack

| Category               | Technologies                                                                                             |
| :--------------------- | :------------------------------------------------------------------------------------------------------- |
| **Framework & Core**   | **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript 5**                                   |
| **Styling & UI**       | **Tailwind CSS v4**, **PostCSS**, **Radix UI Primitives**, **Lucide Icons**, **AOS (Animate On Scroll)** |
| **State Management**   | **Redux Toolkit (RTK Query)**, **React Redux**, **Redux Persist**                                        |
| **Forms & Validation** | **React Hook Form**, **Zod**, **@hookform/resolvers**                                                    |
| **Theme & UX**         | **next-themes** (Dark/Light mode), **clsx**, **tailwind-merge**                                          |
| **Build & Tooling**    | **ESLint 9**, **Sharp**, **Node.js**                                                                     |

---

## 🏗️ Architecture & State Workflow

```mermaid
graph TD
    User([User / Admin]) --> RootApp[Next.js App Router]
    RootApp --> ProviderWrapper[ReduxProvider & AnalyticsTracker]

    ProviderWrapper -->|Public Visitor| PublicPages[Portfolio Website Pages]
    ProviderWrapper -->|Admin User| AuthGuard[AuthGuard Protection]

    PublicPages -->|Track Page View| AnalyticsAPI[RTK Query PageAnalytics API]
    PublicPages -->|Send Message| ContactAPI[RTK Query Contact API]

    AuthGuard -->|Authenticated| AdminPages[Admin Dashboard /dashboard]
    AuthGuard -->|Unauthenticated| LoginPage[/dashboard/login]

    AdminPages --> AnalyticsModule[/dashboard/analytics]
    AdminPages --> ContactsModule[/dashboard/contacts]
    AdminPages --> ActivityModule[/dashboard/activity]

    AnalyticsModule --> BaseApi[Base RTK Query API]
    ContactsModule --> BaseApi
    ActivityModule --> BaseApi

    BaseApi -->|JWT Bearer Token| BackendServer[Express / Node Backend API]
    BaseApi -->|On 401 Session Expiry| RefreshTokenEndpoint[POST /auth/refresh-token]
```

---

## 📁 Directory Structure

```text
apponislam-portfolio-with-nextJs/
├── public/                          # Static media assets & icons
├── src/
│   ├── app/
│   │   ├── (root)/                  # Public Pages Layout & Routes
│   │   │   ├── contact/             # Contact page
│   │   │   ├── projects/            # Projects listing & dynamic details (/projects/[expId])
│   │   │   ├── skills/              # Skills directory page
│   │   │   ├── layout.tsx           # Public header & footer wrapper
│   │   │   └── page.tsx             # Main Portfolio Landing Page
│   │   ├── (dashboard)/             # Protected Admin Dashboard Area
│   │   │   └── dashboard/
│   │   │       ├── activity/        # Activity logs page
│   │   │       ├── analytics/       # Page analytics inspection page
│   │   │       ├── contacts/        # Inquiry messages page & message details
│   │   │       ├── forgot-password/ # Admin forgot password page
│   │   │       ├── login/           # Admin login page
│   │   │       ├── reset-password/  # Admin reset password page
│   │   │       ├── verify-otp/      # Admin OTP verification page
│   │   │       ├── layout.tsx       # Admin Sidebar & Header layout with AuthGuard
│   │   │       └── page.tsx         # Dashboard overview page
│   │   ├── favicon.ico
│   │   ├── globals.css              # Global Tailwind v4 styles & theme tokens
│   │   ├── layout.tsx               # Root application layout
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── robots.ts                # SEO robots.txt generator
│   │   └── sitemap.ts               # Dynamic sitemap generator
│   ├── components/
│   │   ├── admin/                   # Admin components (AuthGuard, AdminHeader, ChangePasswordModal)
│   │   ├── forms/                   # Form components (ContactForm, LoginForm, AuthForms)
│   │   ├── providers/               # Context Providers (ReduxProvider, AnalyticsTracker)
│   │   ├── ui/                      # Radix UI primitives & generic components (Button, Card, Badge, Dialog)
│   │   ├── certificates-section.tsx # Certificates component
│   │   ├── education-section.tsx    # Education history component
│   │   ├── experience-section.tsx   # Experience timeline component
│   │   ├── featured-projects.tsx    # Featured projects section
│   │   ├── main-nav.tsx             # Main site navigation bar
│   │   ├── mobile-nav.tsx           # Mobile navigation drawer
│   │   ├── pagination.tsx           # Reusable pagination component
│   │   ├── premium-footer.tsx       # Portfolio footer
│   │   ├── project-card.tsx         # Project card item
│   │   ├── project-image-slider.tsx # Image carousel for project previews
│   │   └── skills-card.tsx          # Skill badge card component
│   ├── redux/
│   │   ├── api/                     # RTK Query baseApi with auto-reauth flow
│   │   ├── features/                # RTK slices & API endpoints (auth, activity, contact, page-analytics)
│   │   └── store.ts                 # Redux store & persist configuration
│   ├── lib/                         # Utility helpers & class merger (`cn`)
│   └── types/                       # Global TypeScript definitions
├── .env                             # Environment configuration
├── eslint.config.mjs                # ESLint 9 FlatConfig setup
├── LICENSE                          # MIT License file
├── next.config.ts                   # Next.js settings
├── package.json                     # Dependencies & scripts
├── tailwind.config.ts               # Tailwind CSS theme extension settings
└── tsconfig.json                    # TypeScript compiler configuration
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Local Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/apponislam/apponislam-portfolio.git
    cd apponislam-portfolio-with-nextJs
    ```

2. **Install project dependencies**:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:

    ```env
    NEXT_PUBLIC_API_URL=https://your-backend-api-domain.com
    ```

4. **Launch Development Server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Linting**:

    ```bash
    npm run lint
    ```

6. **Build for Production**:
    ```bash
    npm run build
    ```

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 👨‍💻 Author & Contact

**Appon Islam** — _Full-Stack Developer_

- 🌐 **Website**: [https://www.apponislam.com](https://www.apponislam.com)
- 💼 **LinkedIn**: [linkedin.com/in/apponislam](https://www.linkedin.com/in/apponislam/)
- 🐙 **GitHub**: [@apponislam](https://github.com/apponislam)
- 🐦 **Twitter**: [@appon2003](https://twitter.com/appon2003)
- 📧 **Email**: [apponislamdev@gmail.com](mailto:apponislamdev@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ by Appon Islam</sub>
</div>
