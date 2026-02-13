"use client";

import Link from "next/link";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "IQAO - Auditing System",
      description: "A comprehensive auditing system for University of Batangas",
      url: "https://www.iqao.ub.edu.ph/",
    },
    {
      title: "AI Resume Builder",
      description: "AI-powered resume builder",
      url: "https://ai-resume-builder-pi-navy.vercel.app",
    },
    {
      title: "Pixelria",
      description: "A Pixel Sketching App",
      url: "https://pixelria.vercel.app/",
    },
    {
      title: "Koyam's Recette",
      description: "A Recipe App for Filipino Dishes",
      url: null,
    },
  ];

  return (
      <Panel id="projects" className="animate-fade-in animate-delay-500">
  <PanelHeader>
    <div className="flex items-center justify-between w-full">
      <PanelTitle className="text-base tracking-[0.2em] sm:tracking-[0.8em] uppercase text-muted-foreground">
        Projects
      </PanelTitle>

      <Link
        href="/projects"
        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        View all →
      </Link>
    </div>
  </PanelHeader>

        <PanelContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project, idx) => {
              const isClickable = !!project.url;
              const Container = isClickable ? "a" : "div";

              return (
                <Container
                  key={idx}
                  {...(isClickable
                    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`bg-muted/50 block rounded-lg p-4 transition ${
                    isClickable
                      ? "hover:bg-muted cursor-pointer"
                      : "cursor-default opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-sm font-semibold">{project.title}</p>
                    {isClickable && <ExternalLink className="text-muted-foreground h-4 w-4" />}
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{project.description}</p>
                  <p
                    className={`mt-1 text-xs ${
                      isClickable
                        ? "text-blue-500 dark:text-blue-300"
                        : "text-muted-foreground italic"
                    }`}
                  >
                    {isClickable ? project.url : "Not available for viewing"}
                  </p>
                </Container>
              );
            })}
          </div>
        </PanelContent>
      </Panel>
  );
}
