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
import { Linkedin, Github, Facebook } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
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
          <div className="w-full md:w-6/10">
            <Certifications />
          </div>
          <div className="w-full md:w-4/10">
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
