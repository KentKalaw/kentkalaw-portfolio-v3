"use client";

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface CertificationItem {
  title: string;
  company: string;
  year: string;
  svgPath: string;
  certLink?: string;
}

const certifications: CertificationItem[] = [
  {
    title: "CompTIA IT Fundamentals (ITF+)",
    company: "CompTIA",
    year: "2025",
    svgPath: "/Comptia.svg",
    certLink:
      "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
  },

  {
    title: "AWS - Cloud Foundations",
    company: "Amazon Web Services (AWS)",
    year: "2024",
    svgPath: "/Amazonaws.svg",
    certLink:
      "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
  },
  {
    title: "Cisco - Cybersecurity Essentials",
    company: "Cisco Networking Academy",
    year: "2024",
    svgPath: "/Cisco.svg",
    certLink:
      "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
  },
];

export default function Certifications() {
  return (
    <Panel id="certifications" className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <div className="flex items-center justify-between">
          <PanelTitle className="text-muted-foreground text-base tracking-[0.2em] uppercase md:tracking-[0.8em]">
            Certifications
          </PanelTitle>

          <Link
            href="/certifications"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            View all →
          </Link>
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
                    className="h-6 w-6 object-contain"
                  />
                </div>
              </div>
              <div className="bg-border w-px self-stretch" />
              <div className="pl-4">
                <p className="text-sm font-medium">{cert.title}</p>
                <p className="text-muted-foreground text-xs">{cert.company}</p>
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
  );
}
