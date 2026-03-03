"use client";

import { useRef, useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { ChevronDown, Building } from "lucide-react";
import { experiences } from "@/lib/experience-data";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <Panel className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <PanelTitle className="text-muted-foreground text-base tracking-[0.8em] uppercase">
          Experience
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="divide-border divide-y p-0">
        {experiences.map((exp, id) => {
          const isOpen = openIndex === id;

          return (
            <div key={id} className="group">
              <button
                onClick={() => toggleIndex(id)}
                className="hover:bg-muted/40 flex w-full cursor-pointer items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex items-center px-5 py-4">
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
                  <ul className="text-muted-foreground border-t dark:border-muted list-disc space-y-4 px-8 py-4 text-sm">
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
