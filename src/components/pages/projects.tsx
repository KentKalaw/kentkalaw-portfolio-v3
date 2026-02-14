"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { ChevronDown, ExternalLink, Code2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = [
    {
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
    },
    {
      title: "AI Resume Builder",
      date: "2025",
      description:
        "Simple AI-powered resume generator that optimizes CV content.",
      features: [
        "AI Content Optimization: Enhance resume content with AI suggestions.",
      ],
      url: "https://ai-resume-builder-pi-navy.vercel.app",
    },
    {
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
    },
    {
      title: "Koyam's Recette",
      date: "2023",
      description: "A Filipino recipe management and discovery app.",
      features: [
        "Recipe Categorization: Organize recipes by type, cuisine, and ingredients.",
        "Search and Filter: Find recipes quickly with advanced search options.",
        "User Contributions: Add, edit, and share your own recipes.",
      ],
      url: "https://github.com/KentKalaw/koyam-recette",
    },
  ];

  return (
    <Panel id="projects" className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <div className="flex items-center justify-between">
          <PanelTitle className="text-muted-foreground text-base tracking-[0.4em] uppercase">
            Projects
          </PanelTitle>

          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            View all →
          </Link>
        </div>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="divide-border divide-y">
          {projects.map((project, idx) => {
            const isOpen = openIndex === idx;
            const isClickable = !!project.url;

            return (
              <div key={idx} className="group">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex items-center px-4">
                      <div className="border-border flex h-8 w-8 items-center justify-center rounded-full border">
                        <Code2 className="dark:text-muted-foreground h-4 w-4" />
                      </div>
                    </div>
                    <div className="bg-border w-px self-stretch" />
                    <div className="pl-4">
                      <p className="text-sm font-medium">{project.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {project.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pr-4">
                    {isClickable && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>View URL</TooltipContent>
                      </Tooltip>
                    )}
                    <ChevronDown
                      className={`text-muted-foreground h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "screen-line-before max-h-60 py-2 pb-4" : "max-h-0"
                  }`}
                >
                  <div className="mt-2 pr-4 pl-4">
                    <p className="dark:text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    {project.features && (
                      <ul className="dark:text-muted-foreground mt-1 list-disc space-y-1 pl-8 text-sm">
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PanelContent>
    </Panel>
  );
}
