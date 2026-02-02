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
    <main className="relative min-h-screen" ref={scrollAreaRef}>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Name />
        <div className="flex flex-col md:flex-row md:gap-3">
          <div className="w-full md:w-1/2">
            <About />
          </div>
          <div className="w-full md:w-1/2">
            <BlogPreview />
          </div>
        </div>
        <TechStack />
        <div className="flex flex-col md:flex-row md:gap-3">
          <div className="w-full md:w-1/2">
            <Certifications />
          </div>
          <div className="w-full md:w-1/2">
            <Experience />
          </div>
        </div>
        <GithubContributionsCard />
        <div className="flex flex-col md:flex-row md:gap-3">
          <div className="w-full md:w-3/10">
            <Socials />
          </div>
          <div className="w-full md:w-7/10">
            <Projects />
          </div>
        </div>
        <Contact />

        <Button
          onClick={triggerScrollToTop}
          size="icon"
          className={`fixed right-8 bottom-8 z-50 rounded-full bg-gray-200 text-gray-800 transition-all duration-300 hover:scale-110 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
            showScrollTop
              ? "animate-bounce-up-down pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
          aria-label="Scroll to top"
        >
          <ChevronsUp className="h-6 w-6" />
        </Button>

        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Kent Kalaw. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/kentkalaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/kentkalaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com/kentkalaw03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
