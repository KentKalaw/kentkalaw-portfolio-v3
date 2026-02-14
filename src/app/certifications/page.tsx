"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { ExternalLink } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import Footer from "@/components/footer/footer";

export default function CertificationsPage() {
  interface CertificationItem {
    title: string;
    company: string;
    year: string;
    svgPath: string;
    certLink?: string | null;
  }

  const certifications: CertificationItem[] = [
    {
      title: "CompTIA IT Fundamentals (ITF+)",
      company: "CompTIA",
      year: "2025",
      svgPath: "/comptia-icon.svg",
      certLink:
        "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
    },
    {
      title: "Next.js React Foundations",
      company: "Vercel",
      year: "2025",
      svgPath: "/nextjs-icon.svg",
      certLink: null,
    },
     {
      title: "Next.js App Router Fundamentals",
      company: "Vercel",
      year: "2025",
      svgPath: "/nextjs-icon.svg",
      certLink: null,
    },
    {
      title: "AWS - Cloud Foundations",
      company: "Amazon Web Services (AWS)",
      year: "2024",
      svgPath: "/aws-icon.svg",
      certLink:
        "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
    },
    {
      title: "Cisco - Cybersecurity Essentials",
      company: "Cisco Networking Academy",
      year: "2024",
      svgPath: "/cisco-icon.svg",
      certLink:
        "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
    },
    
  ];

  return (
    <main className="animate-fade-in animate-delay-100 relative min-h-screen overflow-x-hidden pt-18">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-2 px-4 text-sm transition-colors"
          >
            <MoveLeft className="mr-1 h-4 w-4" />
            Go Back
          </Link>
        </div>

        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-xl tracking-[0.4em] uppercase">
                Certifications
              </PanelTitle>

              <ThemeSwitch />
            </div>
          </PanelHeader>
          <PanelContent className="divide-border divide-y p-0">
            {certifications.map((cert, idx) => (
              <button
                key={idx}
                className="group hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors"
                onClick={() =>
                  cert.certLink && window.open(cert.certLink, "_blank")
                }
              >
                <div className="flex items-center">
                  <div className="flex items-center px-4">
                    <div className="border-border text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full border">
                      <img
                        src={cert.svgPath}
                        alt={cert.company}
                        className="h-6 w-6 object-contain dark:invert"
                      />
                    </div>
                  </div>
                  <div className="bg-border w-px self-stretch" />
                  <div className="pl-4">
                    <p className="text-sm font-medium">{cert.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {cert.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pr-4">
                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs whitespace-nowrap">
                    {cert.year}
                  </span>
                  <ExternalLink className="text-muted-foreground h-4 w-4" />
                </div>
              </button>
            ))}
          </PanelContent>
        </Panel>
        <Footer />
      </div>
    </main>
  );
}
