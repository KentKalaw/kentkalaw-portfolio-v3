"use client";

import Name from "@/components/pages/name";
import About from "@/components/pages/about";
import BlogPreview from "@/components/pages/blog-preview";
import GithubContributionsCard from "@/components/pages/github-contribution";
import TechStack from "@/components/pages/tech-stack";
import Experience from "@/components/pages/experience";
import Certifications from "@/components/pages/certifications";
import Socials from "@/components/pages/socials";
import Projects from "@/components/pages/projects";
import Contact from "@/components/pages/contact";
import { useRef, useState, useEffect } from "react";
import { Linkedin, Github, Facebook, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingNavbar } from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";

export default function Home() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerScrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden pt-18"
      ref={scrollAreaRef}
    >
      <div className="mx-auto max-w-5xl px-4 py-8">
        <FloatingNavbar />
        <Name />
        <div className="flex md:gap-3">
          <div className="w-full">
            <Separator className="animate-fade-in animate-delay-500" />
            <About />
            <Separator className="animate-fade-in animate-delay-500" />

            <BlogPreview />
            <Separator className="animate-fade-in animate-delay-500" />

            <TechStack />
            <Separator className="animate-fade-in animate-delay-500" />

            <Certifications />
            <Separator className="animate-fade-in animate-delay-500" />

            <Experience />
            <Separator className="animate-fade-in animate-delay-500" />

            <GithubContributionsCard />
            <Separator className="animate-fade-in animate-delay-500" />

            <Projects />
            <Separator className="animate-fade-in animate-delay-500" />

            <Socials />
            <Separator className="animate-fade-in animate-delay-500" />

            <Contact />
            <Separator className="animate-fade-in animate-delay-500" />
            
          </div>
        </div>

        <Button
          onClick={triggerScrollToTop}
          size="icon"
          className={`fixed right-8 bottom-20 z-50 rounded-full bg-gray-900 text-gray-200 transition-all duration-300 hover:scale-110 hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 ${
            showScrollTop
              ? "animate-bounce-up-down pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
          aria-label="Scroll to top"
        >
          <ChevronsUp className="h-6 w-6" />
        </Button>

        <footer className="screen-line-before screen-line-after border-x border-edge max-w-5xl mx-auto">
  <div className="border-t border-edge px-4 py-8">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kent Kalaw. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        <a
          href="https://linkedin.com/in/kentkalaw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>

        <a
          href="https://github.com/kentkalaw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>

        <a
          href="https://facebook.com/kentkalaw03"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
</footer>

      </div>
    </main>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "screen-line-before screen-line-after",
        "relative h-8 border-x border-edge max-w-5xl mx-auto",
        "flex items-center",
        className
      )}
    >
      <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}
