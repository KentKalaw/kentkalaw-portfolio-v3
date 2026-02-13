"use client";

import { ShieldCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";

export default function Certifications() {
  const certifications = [
    {
      title: "CompTIA IT Fundamentals (ITF+)",
      company: "CompTIA",
      year: "2025",
      link: "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
    },
    {
      title: "AWS - Cloud Foundations",
      company: "Amazon Web Services (AWS)",
      year: "2024",
      link: "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
    },
    {
      title: "Cisco - Cybersecurity Essentials",
      company: "Cisco Networking Academy",
      year: "2024",
      link: "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
    },

  ];

  const mainCerts = certifications.slice(0, 6);

  const CertificationCard = ({
    title,
    company,
    year,
    link,
  }: {
    title: string;
    company: string;
    year: string;
    link: string;
  }) => (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-muted/50 hover:bg-muted group flex flex-col justify-between rounded-lg p-4 transition"
    >
      <div>
        <p className="font-sans text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs">{company}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-muted-foreground text-xs">{year}</span>
        <ExternalLink className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );

  return (
     <Panel id="certifications" className="animate-fade-in animate-delay-500">
  <PanelHeader>
    <div className="flex items-center justify-between w-full">
      <PanelTitle className="text-base tracking-[0.4em] sm:tracking-[0.8em] uppercase text-muted-foreground">
        Certifications
      </PanelTitle>

      <Link
        href="/certifications"
        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        View all →
      </Link>
    </div>
  </PanelHeader>
        <PanelContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mainCerts.map((cert, i) => (
              <CertificationCard key={i} {...cert} />
            ))}
          </div>
        </PanelContent>
      </Panel>
  );
}
