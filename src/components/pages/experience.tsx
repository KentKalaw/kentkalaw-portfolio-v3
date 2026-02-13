"use client";

import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ExperienceItemProps {
  title: string;
  skill: string;
  year: string;
  description: string[];
}

const experiences: ExperienceItemProps[] = [
  {
    skill: "Freelance Web Developer",
    title: "Freelance",
    year: "2025 - Present",
    description: [
      "Built responsive websites using Next.js and Tailwind CSS",
      "Integrated Supabase for authentication and data storage",
      "Optimized performance and accessibility",
    ],
  },
  {
    skill: "Frontend Developer - Intern",
    title: "University of Batangas - ICT Department",
    year: "2025",
    description: [
      "Served as a Front-end Developer, implementing and maintaining UI/UX designs using modern front-end frameworks",
      "Built web applications using Next.js and Laravel, managing databases with Prisma ORM (MySQL).",
      "Translated system requirements into functional features while ensuring performance, accessibility, and maintainability",
    ],
  },
  {
    skill: "BS Information Technology",
    title: "University of Batangas",
    year: "2021 - 2025",
    description: [
      "Focused on web technologies and system design",
      "Completed coursework in software development, and cloud computing",
      "Built academic and personal full-stack projects",
    ],
  },
];

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Panel className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <PanelTitle className="text-base tracking-[0.8em] uppercase text-muted-foreground">
          Experience
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="divide-y divide-border/40">
        {experiences.map((exp, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="py-2">
<button
  onClick={() => setOpenIndex(isOpen ? null : idx)}
  className="group flex w-full items-start justify-between gap-4 rounded-md px-2 py-3 text-left transition-colors duration-200 hover:bg-muted/40"
>
  <div>
    <span className="block text-sm font-semibold transition-colors group-hover:text-foreground">
      {exp.skill}
    </span>
    <h3 className="text-sm text-muted-foreground">
      {exp.title}
    </h3>
  </div>

  <div className="flex items-center gap-3 shrink-0">
    <span className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
    {exp.year}
    </span>

    <ChevronDown
      className={cn(
        "h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:text-foreground",
        isOpen && "rotate-180"
      )}
    />
  </div>
</button>

              <div
                className={cn(
                  "grid transition-all duration-300",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </PanelContent>
    </Panel>
  );
}