"use client";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { MoveLeft, Code2, ChevronDown, ExternalLink } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRef, useState } from "react";
import Footer from "@/components/footer/footer";
export default function ProjectsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

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
    <main className="animate-fade-in animate-delay-100 relative min-h-screen overflow-x-hidden pt-18">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-xl tracking-[0.4em] uppercase">
                Projects
              </PanelTitle>

              <ThemeSwitch />
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="divide-border divide-y">
              {projects.map((project, id) => {
                const isOpen = openIndex === id;
                const isClickable = !!project.url;

                return (
                  <div key={id} className="group">
                    <button
                      onClick={() => toggleIndex(id)}
                      className="hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center px-5 py-4">
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
                      ref={el => {
                        contentRefs.current[id] = el;
                      }}
                      style={{
                        maxHeight: isOpen
                          ? `${contentRefs.current[id]?.scrollHeight}px`
                          : "0px",
                        transition: "max-height 0.3s ease",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className={`transition-opacity duration-300 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {project.features && (
                          <ul className="dark:text-muted-foreground screen-line-before list-disc space-y-4 px-8 py-4 text-sm">
                            <p className="dark:text-muted-foreground text-sm">
                              {project.description}
                            </p>
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
        <Footer />
      </div>
    </main>
  );
}
