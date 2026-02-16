"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { ExternalLink } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import Footer from "@/components/footer/footer";

export default function AboutPage() {
  

  return (
    <main className="animate-fade-in animate-delay-100 relative min-h-screen overflow-x-hidden pt-18">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-xl tracking-[0.4em] uppercase">
                About Me
              </PanelTitle>

              <ThemeSwitch />
            </div>
          </PanelHeader>
          <PanelContent className="divide-border divide-y p-0">
            todo: about me content
          </PanelContent>
        </Panel>
        <Footer />
      </div>
    </main>
  );
}
