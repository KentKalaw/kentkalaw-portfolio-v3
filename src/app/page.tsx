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
import { Linkedin, Github, Facebook } from "lucide-react"

export default function Home() {

  return (
    <main className="relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            <Socials/>
          </div>
          <div className="w-full md:w-7/10">
            <Projects />
          </div>
        </div>
        <Contact />
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Kent Kalaw. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/kentkalaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/kentkalaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com/kentkalaw03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
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

