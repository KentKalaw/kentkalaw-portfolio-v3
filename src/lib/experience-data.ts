export interface ExperienceItem {
  skill: string;
  title: string;
  year: string;
  description: string[];
}

export const experiences: ExperienceItem[] = [
  {
    skill: "Freelance Web Developer",
    title: "Freelance",
    year: "2025 - Present",
    description: [
      "Built responsive websites using Next.js and Tailwind CSS",
      "Integrated Supabase for authentication and data storage",
      "Optimized performance and accessibility",
    ],
  },
  {
    skill: "Frontend Developer - Intern",
    title: "University of Batangas - ICT Department",
    year: "2025",
    description: [
      "Served as a Front-end Developer, implementing and maintaining UI/UX designs using modern front-end frameworks",
      "Built web applications using Next.js and Laravel, managing databases with Prisma ORM (MySQL).",
      "Translated system requirements into functional features while ensuring performance, accessibility, and maintainability",
      "Designed and implemented user interfaces in collaboration with co-interns for CICT Department and university events, used by over 2,000+ end users.",
    ],
  },
  {
    skill: "BS Information Technology",
    title: "University of Batangas",
    year: "2021 - 2025",
    description: [
      "Focused on web technologies and system design",
      "Completed coursework in software development, and cloud computing",
      "Built academic and personal full-stack projects",
    ],
  },
];