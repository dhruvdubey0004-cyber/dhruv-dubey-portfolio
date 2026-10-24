/**
 * =============================================================================
 * DHRUV PORTFOLIO - CENTRAL DATA FILE
 * =============================================================================
 * Aap is file me se portfolio ka saara data (Text, Links, Projects, Skills, etc.)
 * aasaani se dekh aur change kar sakte hain.
 */

// 1. Personal & Hero Information
export const personalInfo = {
    name: "Dhruv",
    heroHeading: "Hi, I'm Dhruv",
    role: "Fullstack Developer",
    badgeText: "Available for Fullstack Developer Roles",
    subheading: "Fullstack developer architecting modern web apps",
    portraitUrl: "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png",
    portraitFallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    aboutBio: "I am a Fullstack Developer with 2+ years of experience in building scalable web applications.",
};

// 2. Navigation Menu Links
export const navItems = [
    { label: "About", id: "about" },
    { label: "Services", id: "price" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
];

// 3. Social Media Links
export const socialLinks = [
    { platform: "GitHub", href: "https://github.com", icon: "github" },
    { platform: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-dubey-130663318?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin" },
    { platform: "Email", href: "mailto:dhruvdubey@gmail.com", icon: "mail" },
];

// 4. About Section Floating Badges
export const aboutBadges = [
    {
        type: "frontend",
        title: "Frontend Focus",
        tech: "React / Next.js / TypeScript",
        position: "top-left"
    },
    {
        type: "databases",
        title: "Databases & Cache",
        tech: "Postgres / Redis / MongoDB",
        position: "bottom-left"
    },
    {
        type: "backend",
        title: "Backend Systems",
        tech: "Node.js / Python / Go",
        position: "top-right"
    },
    {
        type: "cloud",
        title: "Cloud & Infrastructure",
        tech: "AWS / Docker / Kubernetes",
        position: "bottom-right"
    }
];

// 5. Architecture Vault (Showcase Items)
export const showcaseCategories = [
    { label: "All Stack", id: "all" },
    { label: "Frontend", id: "frontend" },
    { label: "Backend", id: "backend" }
];

export const showcaseItems = [
    {
        id: 1,
        title: "Realtime Analytics Engine",
        subtitle: "Event Stream Processing & Live Telemetry",
        description: "High-throughput telemetry pipeline handling 50k+ events/sec with ultra-low sub-50ms latency and real-time socket broadcasts.",
        metric: "50k+ msg/s",
        category: "backend",
        gif: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
        tags: ["Node.js", "Redis", "WebSockets"]
    },
    {
        id: 2,
        title: "SaaS Dashboard Architecture",
        subtitle: "High-Density Analytics & State Sync",
        description: "Modular enterprise dashboard with real-time biometric charts, granular role-based access, and instant state hydration.",
        metric: "<0.8s FCP",
        category: "frontend",
        gif: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
        tags: ["React", "TypeScript", "Tailwind"]
    },
    {
        id: 3,
        title: "Distributed Query Engine",
        subtitle: "Multi-Region Sharded Data Layer",
        description: "Federated database query layer optimizing cross-node joins, caching hot query routes, and auto-balancing read replicas.",
        metric: "12ms Latency",
        category: "backend",
        gif: "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
        tags: ["PostgreSQL", "GraphQL", "Go"]
    },
    {
        id: 4,
        title: "E-Commerce Microfrontend",
        subtitle: "Decoupled Edge Storefront System",
        description: "Edge-rendered composable storefront architecture with optimistic client mutations, state isolation, and checkout flow.",
        metric: "100/100 Perf",
        category: "frontend",
        gif: "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
        tags: ["Next.js", "Zustand", "Stripe"]
    }
];

// 6. Services Section
export const servicesData = [
    {
        num: "01",
        name: "Fullstack Web Apps",
        desc: "End-to-end applications built with modern frontend frameworks and scalable backend services with ultra-fast initial loads and seamless interactions."
    },
    {
        num: "02",
        name: "Backend & API Architecture",
        desc: "Robust microservices, RESTful and GraphQL APIs engineered for optimal latency, security, and enterprise data throughput."
    },
    {
        num: "03",
        name: "Database Systems & Caching",
        desc: "High-performance data schemas, index optimization, and distributed caching implementations across PostgreSQL, Redis, and MongoDB."
    },
    {
        num: "04",
        name: "Cloud & DevOps Automation",
        desc: "Automated deployment pipelines, Docker containerization, Kubernetes orchestrations, and cloud architecture on AWS & Vercel."
    },
    {
        num: "05",
        name: "Performance Modernization",
        desc: "Auditing legacy stacks and transforming them into modern, type-safe, maintainable architectures with exceptional Lighthouse metrics."
    }
];

// 7. Featured Projects
export const projectsData = [
    {
        num: "01",
        title: "Nexus SaaS Engine",
        category: "Fullstack Platform • Next.js & Node",
        link: "https://example.com/nexus",
        img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
        img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
        img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    },
];

// 8. Technical Skills & Stack
export const skillCategories = [
    {
        title: "Frontend Engineering",
        skills: [
            { name: "React.js & Next.js", level: 95 },
            { name: "TypeScript", level: 92 },
            { name: "Tailwind CSS", level: 96 },
            { name: "HTML5 / CSS3 / Animations", level: 95 }
        ]
    },
    {
        title: "Backend & Systems",
        skills: [
            { name: "Node.js / Express", level: 92 },
            { name: "FastAPI", level: 90 },
            { name: "MongoDB", level: 90 }
        ]
    },
    {
        title: "DevOps & Workflow",
        skills: [
            { name: "Docker & Containers", level: 92 },
            { name: "Git / CI/CD Automation", level: 92 },
            { name: "Vercel & Netlify", level: 94 }
        ]
    }
];
