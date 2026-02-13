"use client";

import { useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { ChevronDown, Building } from "lucide-react";

interface ExperienceItem {
  skill: string;
  title: string;
  year: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
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
        <PanelTitle className="text-muted-foreground text-base tracking-[0.4em] uppercase">
          Experience
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="divide-border divide-y p-0">
        {experiences.map((exp, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div key={idx} className="group">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex items-center px-4">
                    <div className="border-border flex h-8 w-8 items-center justify-center rounded-full border">
                      <Building className="text-muted-foreground h-4 w-4" />
                    </div>
                  </div>
                  <div className="bg-border w-px self-stretch" />
                  <div className="pl-4">
                    <p className="text-sm font-medium">{exp.skill}</p>
                    <p className="text-muted-foreground text-xs">{exp.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pr-4">
                  <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs whitespace-nowrap">
                    {exp.year}
                  </span>
                  <ChevronDown
                    className={`text-muted-foreground h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "screen-line-before max-h-40 py-2 pb-4" : "max-h-0"
                }`}
              >
                <div className="mt-2 pr-4 pl-4">
                  <ul className="text-muted-foreground list-disc space-y-1 pl-8 text-sm">
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
