export interface Projects {
  id: number;
  title: string;
  date: string;
  description: string;
  features: string[];
  url: string;
  stack?: string;
}

export const projects: Projects[] = [
  {
    id: 1,
    title: "IQAO - Auditing System",
    date: "2025",
    description:
      "A Centralized Auditing System for University of Batangas' Institutional Quality Assurance Office (IQAO) built with modern web stack.",
    features: [
      "Role-based authentication",
      "Automated document compliance",
      "Real-time auditing between auditors and auditees",
      "Secure file uploads with validation",
    ],
    url: "https://www.iqao.ub.edu.ph/",
    stack: "Next.js, TypeScript, Prisma, MySQL, Tailwind CSS",
  },
  {
    id: 2,
    title: "AI Resume Builder",
    date: "2025",
    description:
      "Simple AI-powered resume generator that optimizes CV content.",
    features: [
      "AI Content Optimization: Enhance resume content with AI suggestions.",
    ],
    url: "https://ai-resume-builder-pi-navy.vercel.app",
    stack: "Next.js, TypeScript, Tailwind CSS, Groq AI API",
  },
  {
    id: 3,
    title: "Pixelria",
    date: "2025",
    description:
      "A pixel sketching web app with canvas rendering and color grid tools.",
    features: [
      "Drawing Tools: Pen with color selection, flood fill, eyedropper, eraser, and customizable background.",
      "Modifiers: Stackable shading or exclusive lighten effect.",
      "Canvas Controls: Adjustable grid (8 by 8 to 60 by 60), toggleable gridlines, and full reset with confirmation.",
      "Export Options: Download sketches as PNG",
    ],
    url: "https://pixelria.vercel.app/",
    stack: "Next.js, TypeScript, Tailwind CSS, Supabase, PostgreSQL",
  },
  {
      id: 4,
      title: "CICT Days Registration System",
      date: "2025",
      description:
        "A web-based registration system for University of Batangas' College of Information and Communications Technology (CICT) Days event.",
      features: [
        "Barcode Reader Registration: Attendees can register by scanning their Student ID barcode.",
        "Admin Dashboard: Interface to manage registrations, view attendee information, and generate reports.",
        "Engagement Features: Live Reaction System for attendees to interact during sessions. (Emojis)",
        "Lottery System: Random selection of attendees for giveaways and prizes.",
      ],
      url: "https://github.com/MKarloPilares/cict-days-reg",
      stack: "Next.js, TypeScript, Tailwind CSS, Prisma, MySQL",
    },
  {
    id: 5,
    title: "Koyam's Recette",
    date: "2023",
    description: "A Filipino recipe management and discovery app.",
    features: [
      "Recipe Categorization: Organize recipes by type, cuisine, and ingredients.",
      "Search and Filter: Find recipes quickly with advanced search options.",
      "User Contributions: Add, edit, and share your own recipes.",
    ],
    url: "https://github.com/KentKalaw/koyam-recette",
    stack: "Dart, Flutter, Firebase, Firestore",
  },
];
