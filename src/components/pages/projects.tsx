"use client";

import { useRef, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects-data";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <Panel id="projects" className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <div className="flex items-center justify-between">
          <PanelTitle className="text-muted-foreground text-base tracking-[0.8em] uppercase">
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
          {projects.filter((project) => [1, 3, 4, 5].includes(project.id)).map((project) => {
            const isOpen = openIndex === project.id;
            const isClickable = !!project.url;

            return (
              <div key={project.id} className="group">
                <button
                  onClick={() => toggleIndex(project.id)}
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
                    contentRefs.current[project.id] = el;
                  }}
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[project.id]?.scrollHeight}px`
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
                      <ul className="dark:text-muted-foreground border-t dark:border-muted list-disc space-y-4 px-8 py-4 text-sm">
                        <p className="dark:text-muted-foreground text-sm">
                          {project.description}
                        </p>
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {project.stack && (
                    <div
                      className={`transition-opacity duration-300 border-t border-border px-8 py-4 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="text-xs text-muted-foreground mb-2">
                        Tech Stack:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.split(",").map((tech, i) => (
                          <Badge key={i} variant="secondary">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </PanelContent>
    </Panel>
  );
}
