"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Braces } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
export default function TechStack() {

  const techIcons = [
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
    "laravel/laravel-original.svg",
    "postgresql/postgresql-original.svg",
    "supabase/supabase-original.svg"
  ];

  return (
    <section className="mb-3 animate-fade-in animate-delay-200">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono flex items-center gap-2 text-base md:text-xl font-bold">
            <Braces />
            Tech Stack
          </CardTitle>
        </CardHeader>

        <CardContent className="relative overflow-hidden py-6 flex items-center justify-center">
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
                    <img
                      className="h-10 w-auto mx-6"
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}`}
                      alt={icon.split("/")[0] + " logo"}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        </CardContent>
      </Card>
    </section>
  )
}
