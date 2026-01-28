"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BookOpen, ExternalLink } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "IQAO - Auditing System",
      description: "A comprehensive auditing system for University of Batangas",
      url: "https://www.iqao.ub.edu.ph/",
    },
    {
      title: "AI Resume Builder",
      description: "AI-powered resume builder",
      url: "https://ai-resume-builder-pi-navy.vercel.app",
    },
    {
      title: "Pixelria",
      description: "A Pixel Sketching App",
      url: "https://pixelria.vercel.app/",
    },
    {
      title: "Koyam's Recette",
      description: "A Recipe App for Filipino Dishes",
      url: null,
    },
  ]

  return (
<section className="mb-3 animate-fade-in animate-delay-300">
  <Card>
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="font-mono flex items-center gap-2 text-base md:text-xl font-bold">
        <BookOpen />
        Projects
      </CardTitle>
      <button className="text-xs text-muted-foreground hover:underline">
        View All {">"}
      </button>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => {
          const isClickable = !!project.url;
          const Container = isClickable ? "a" : "div";

          return (
            <Container
              key={idx}
              {...(isClickable
                ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`block rounded-lg bg-muted/50 p-4 transition ${
                isClickable ? "hover:bg-muted cursor-pointer" : "cursor-default opacity-80"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-sans text-sm font-semibold">{project.title}</p>
                {isClickable && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
              <p className={`text-xs mt-1 ${isClickable ? "text-blue-500 dark:text-blue-300" : "text-muted-foreground italic"}`}>
                {isClickable ? project.url : "Not available for viewing"}
              </p>
            </Container>
          );
        })}
      </div>
    </CardContent>
  </Card>
</section>

  )
}
