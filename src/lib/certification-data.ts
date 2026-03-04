export interface CertificationItem {
  id: number;
  title: string;
  company: string;
  year: string;
  svgPath: string;
  certLink?: string;
}

export const certifications: CertificationItem[] = [
  {
    id: 5,
    title: "Next.js React Foundations",
    company: "Vercel",
    year: "2025",
    svgPath: "/nextjs-icon.svg",
  },
  {
    id: 4,
    title: "Next.js App Router Fundamentals",
    company: "Vercel",
    year: "2025",
    svgPath: "/nextjs-icon.svg",
  },
  {
    id: 3,
    title: "CompTIA IT Fundamentals (ITF+)",
    company: "CompTIA",
    year: "2025",
    svgPath: "/comptia-icon.svg",
    certLink:
      "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
  },
  {
    id: 2,
    title: "AWS - Cloud Foundations",
    company: "Amazon Web Services (AWS)",
    year: "2024",
    svgPath: "/aws-icon.svg",
    certLink:
      "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
  },
  {
    id: 1,
    title: "Cisco - Cybersecurity Essentials",
    company: "Cisco Networking Academy",
    year: "2024",
    svgPath: "/cisco-icon.svg",
    certLink:
      "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
  },
];