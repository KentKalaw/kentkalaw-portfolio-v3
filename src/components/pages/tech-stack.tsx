"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Type, TypeOutline } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function TechStack() {
  const techStackData = [
    {
      category: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "PHP", "Laravel", "PostgreSQL", "MySQL"],
    },
    {
      category: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Supabase"],
    },
    
  ]

  const [showAll, setShowAll] = useState(false)
  const extraRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (extraRef.current) {
      setHeight(showAll ? `${extraRef.current.scrollHeight}px` : "0px")
    }
  }, [showAll])

  const mainStack = techStackData.slice(0, 2)
  const extraStack = techStackData.slice(2)

  return (
    <section className="mb-3">
      <Card className="mt-3">
  <CardHeader>
    <CardTitle className="font-mono flex items-center gap-2 text-base md:text-xl font-bold"><TypeOutline />
      Tech Stack
    </CardTitle>
  </CardHeader>

  <CardContent className="relative overflow-hidden py-6">
    <InfiniteSlider speedOnHover={30} speed={50} gap={40}>
      {[
        "html5/html5-original.svg",
        "css3/css3-original.svg",
        "javascript/javascript-original.svg",
        "react/react-original.svg",
        "nodejs/nodejs-original.svg",
        "php/php-original.svg",
        "nextjs/nextjs-original.svg",
        "bootstrap/bootstrap-original.svg",
        "tailwindcss/tailwindcss-original.svg",
        "mysql/mysql-original-wordmark.svg",
      ].map((icon, index) => (
        <div key={index} className="flex-shrink-0 flex justify-center">
          <img
            className="h-10 w-auto mx-6"
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}`}
            alt={icon.split("/")[0] + " logo"}
          />
        </div>
      ))}
    </InfiniteSlider>

    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background" />

    <ProgressiveBlur
      className="pointer-events-none absolute left-0 top-0 h-full w-16"
      direction="left"
      blurIntensity={1}
    />
    <ProgressiveBlur
      className="pointer-events-none absolute right-0 top-0 h-full w-16"
      direction="right"
      blurIntensity={1}
    />
  </CardContent>
</Card>
    </section>
  )
}
