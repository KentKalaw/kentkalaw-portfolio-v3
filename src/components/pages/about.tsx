"use client"

import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/panel"

export default function About() {
  return (
    
      <Panel className="animate-fade-in animate-delay-400">
        <PanelHeader>
          <PanelTitle>
            <p className="text-base tracking-[0.8em] uppercase text-muted-foreground">
          About
        </p>
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="text-justify space-y-4 text-sm leading-relaxed md:text-base">
          <p className="text-justify text-justify text-2xl font-semibold leading-snug md:text-3xl">
            Full-stack developer focused on building scalable, clean, and user-friendly digital experiences.
          </p>
          <p className="text-justify text-justify text-muted-foreground">
            I'm a fresh graduate specializing in modern web and mobile development. I build responsive, production-ready applications using current frameworks and scalable architecture patterns.
          </p>

          <p className="text-justify text-justify text-muted-foreground">
            My work includes API integration, full-stack systems, and performance-focused UI implementation.
          </p>
        </PanelContent>
      </Panel>

  )
}
