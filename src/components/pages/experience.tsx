"use client";

import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
import { Building2 } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  skill: string;
  year: string;
}

const experiences: ExperienceItemProps[] = [
  {
    skill: "Freelance Web Developer",
    title: "Freelance",
    year: "2025 - Present",
  },
  {
    skill: "Frontend Developer - Intern",
    title: "University of Batangas - ICT Department",
    year: "2025",
  },
  {
    skill: "BS Information Technology",
    title: "University of Batangas",
    year: "2021 - 2025",
  },
];

export default function Experience() {
  return (
     <Panel className="animate-fade-in animate-delay-500">
        <PanelHeader>
          <PanelTitle>
            <p className="text-base tracking-[0.8em] uppercase text-muted-foreground">
          Experience
        </p>
          </PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-6">
          {experiences.map((exp, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4">
                <div>
                  <span className="block font-sans text-sm font-semibold">{exp.skill}</span>
                  <h3 className="text-sm font-medium text-muted-foreground">{exp.title}</h3>
                </div>

                <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 dark:bg-zinc-800">
                  {exp.year}
                </span>
              </div>
          ))}
        </PanelContent>
      </Panel>
  );
}
