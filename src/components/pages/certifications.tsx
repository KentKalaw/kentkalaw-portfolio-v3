"use client";

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { certifications } from "@/lib/certification-data";

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
        {certifications.map((cert, id) => (
          <button
            key={id}
            className="group hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between text-left transition-colors"
            onClick={() =>
              cert.certLink && window.open(cert.certLink, "_blank")
            }
          >
            <div className="flex items-center">
              <div className="flex items-center px-5 py-4">
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
