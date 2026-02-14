"use client";

import { LogoSlider } from "@/components/ui/logo-slider";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";

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

  const logos = techIcons.map((icon, index) => (
  <div
    key={index}
    className="flex flex-col items-center justify-center gap-2"
  >
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.path}`}
      alt={`${icon.name} logo`}
      className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
    />
    <span className="text-xs text-muted-foreground text-center whitespace-nowrap">
      {icon.name}
    </span>
  </div>
));


  return (
    <Panel className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <PanelTitle>
          <p className="text-muted-foreground text-base tracking-[0.8em] uppercase">
            Tech Stack
          </p>
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="py-6">
        <LogoSlider
          logos={logos}
          speed={60}
          direction="left"
        />
      </PanelContent>
    </Panel>
  );
}
