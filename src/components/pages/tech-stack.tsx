"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Braces } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Autoplay from "embla-carousel-autoplay";
export default function TechStack() {
  const techIcons = [
    { path: "html5/html5-original.svg", name: "HTML5" },
    { path: "css3/css3-original.svg", name: "CSS3" },
    { path: "javascript/javascript-original.svg", name: "JavaScript" },
    { path: "react/react-original.svg", name: "React" },
    { path: "nodejs/nodejs-original.svg", name: "Node.js" },
    { path: "php/php-original.svg", name: "PHP" },
    { path: "nextjs/nextjs-original.svg", name: "Next.js" },
    { path: "bootstrap/bootstrap-original.svg", name: "Bootstrap" },
    { path: "tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
    { path: "mysql/mysql-original-wordmark.svg", name: "MySQL" },
    { path: "laravel/laravel-original.svg", name: "Laravel" },
    { path: "postgresql/postgresql-original.svg", name: "PostgreSQL" },
    { path: "supabase/supabase-original.svg", name: "Supabase" },
  ];

  return (
    <section className="animate-fade-in animate-delay-200 mb-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <Braces />
            Tech Stack
          </CardTitle>
        </CardHeader>

        <CardContent className="relative flex items-center justify-center overflow-hidden py-6">
          <TooltipProvider>
            <Carousel
              className="w-full max-w-2xl"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 1250,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
            >
              <CarouselContent>
                {techIcons.map((icon, index) => (
                  <CarouselItem className="basis-1/3 md:basis-1/5" key={index}>
                    <div className="flex justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <img
                            className="mx-6 h-10 w-auto cursor-pointer"
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.path}`}
                            alt={icon.name + " logo"}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{icon.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12" />
              <CarouselNext className="right-0 md:-right-12" />
            </Carousel>
          </TooltipProvider>
        </CardContent>
      </Card>
    </section>
  );
}
