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
import PlaceholderPattern from "@/components/placeholder-pattern";
import Footer from "@/components/footer/footer";

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
      className="relative min-h-screen overflow-x-hidden pt-10 md:pt-11"
      ref={scrollAreaRef}
    >
      
      <div className="mx-auto max-w-5xl px-4 py-8">
         
        <Name />
        <div className="flex md:gap-3">
          <div className="w-full gap-3">
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <About />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <BlogPreview />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <TechStack />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <Certifications />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <Experience />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>    
            <GithubContributionsCard />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <Projects />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <Socials />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            <Contact />
            <PlaceholderPattern className="animate-fade-in animate-delay-500"/>
            
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

        <Footer />

      </div>
    </main>
  );
}
