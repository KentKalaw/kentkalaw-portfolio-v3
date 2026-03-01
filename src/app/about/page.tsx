"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import Footer from "@/components/footer/footer";

export default function AboutPage() {
  

  return (
    <main className="animate-fade-in animate-delay-100 relative min-h-screen overflow-x-hidden pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-2xl py-2 tracking-[0.8em] uppercase">
                About Me
              </PanelTitle>
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
