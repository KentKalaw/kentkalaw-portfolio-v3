"use client";

import Image from "next/image";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { ExternalLink } from "lucide-react";
import Footer from "@/components/footer/footer";
import { certifications } from "@/lib/certification-data";

export default function CertificationsPage() {

  return (
    <main className="animate-fade-in animate-delay-100 relative overflow-x-hidden pt-10 md:pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="md:text-2xl py-2 md:tracking-[0.8em] uppercase">
                Certifications
              </PanelTitle>
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
                      <Image
                        src={cert.svgPath}
                        alt={cert.company}
                        width={24}
                        height={24}
                        className="object-contain dark:invert"
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
