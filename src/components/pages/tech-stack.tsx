"use client";

import { LogoSlider } from "@/components/ui/logo-slider";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";

export default function TechStack() {

  const frontendIcons = [
  { path: "html5/html5-original.svg", name: "HTML5" },
  { path: "css3/css3-original.svg", name: "CSS3" },
  { path: "javascript/javascript-original.svg", name: "JavaScript" },
  { path: "react/react-original.svg", name: "React" },
  { path: "nextjs/nextjs-original.svg", name: "Next.js" },
  { path: "bootstrap/bootstrap-original.svg", name: "Bootstrap" },
  { path: "tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
];

const backendIcons = [
  { path: "nodejs/nodejs-original.svg", name: "Node.js" },
  { path: "php/php-original.svg", name: "PHP" },
  { path: "laravel/laravel-original.svg", name: "Laravel" },
  { path: "mysql/mysql-original-wordmark.svg", name: "MySQL" },
  { path: "postgresql/postgresql-original.svg", name: "PostgreSQL" },
  { path: "supabase/supabase-original.svg", name: "Supabase" },
];


  const frontEndlogos = frontendIcons.map((icon, index) => (
  <div
    key={index}
    className="flex flex-col items-center justify-center gap-2"
  >
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.path}`}
      alt={`${icon.name} logo`}
      className="h-8 w-auto object-contain transition-all duration-300"
    />
    <span className="text-xs text-muted-foreground text-center whitespace-nowrap">
      {icon.name}
    </span>
  </div>
));

const backEndlogos = backendIcons.map((icon, index) => (
  <div
    key={index}
    className="flex flex-col items-center justify-center gap-2"
  >
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.path}`}
      alt={`${icon.name} logo`}
      className="h-8 w-auto object-contain transition-all duration-300"
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

      <PanelContent>
        <div className="space-y-2">
          <p>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              FRONT-END
            </span>
          </p>
          <LogoSlider
          logos={frontEndlogos}
          speed={60}
          direction="left"
        />
        <p>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              BACK-END
            </span>
          </p>
        <LogoSlider
          logos={backEndlogos}
          speed={60}
          direction="right"
        />
        </div>
        
      </PanelContent>
    </Panel>
  );
}
