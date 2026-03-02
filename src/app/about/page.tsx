"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  BadgeCheck,
  Clock,
  Handshake,
  GraduationCap,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import Footer from "@/components/footer/footer";
import { IconBox } from "@/components/icon-box";
import AudioPlayerComponent from "@/components/audio-player";
import { LogoSlider } from "@/components/ui/logo-slider";

function ClockDisplay() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const formatted = now.toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return <span>{formatted}</span>;
}

export default function AboutPage() {

  const logos = [
    {
      path: "/genshin.svg",
      name: "Genshin Impact",
    },
    {
      path: "/valorant.svg",
      name: "Valorant",
    },
    
    {
      path: "/minecraft-icon.svg",
      name: "Minecraft",
    },
    {
      path: "/lol_icon.svg",
      name: "League of Legends",
    }
    
  ];

  console.log(logos);

  const logosSvg = logos.map((icon, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center gap-2"
    >
      <img
        src={icon.path}
        alt={`${icon.name} logo`}
        className="h-8 w-auto object-contain grayscale-[0.80] transition-all duration-300 hover:translate-y-[-8px] hover:grayscale-0"
      />
      <span className="text-muted-foreground text-center text-xs whitespace-nowrap">
        {icon.name}
      </span>
    </div>
  ));
  return (
    <main className="animate-fade-in animate-delay-100 relative min-h-screen overflow-x-hidden pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="py-2 text-2xl tracking-[0.8em] uppercase">
                About Me
              </PanelTitle>
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="group relative h-40 w-40">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/kentkalaw-v1.jpg"
                    alt="Kent Kalaw"
                    width={240}
                    height={240}
                    loading="eager"
                    quality={80}
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src="/isagi-yoichi.jpg"
                    alt="Isagi Yoichi"
                    width={240}
                    height={240}
                    quality={80}
                    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="w-full space-y-2.5 border-y px-8 py-2">
                <div className="grid gap-x-24 gap-y-2.5 sm:grid-cols-2">
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={BadgeCheck} />
                    <p>Kent Francis E. Kalaw</p>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={GraduationCap} />
                    <p>Graduated University of Batangas</p>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={MapPin} />
                    <p>Batangas City, Philippines</p>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={Handshake} />
                    <p>Open to work</p>
                  </div>
                </div>
                <div className="grid gap-x-24 gap-y-2.5 sm:grid-cols-2">
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={Briefcase} />
                    <p>Full-stack Developer</p>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={Github} />
                    <a href="https://github.com/kentkalaw">{"/"}kentkalaw</a>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={Clock} />
                    <ClockDisplay />
                  </div>
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <IconBox icon={Linkedin} />
                    <a href="https://linkedin.com/in/kentkalaw">
                      {"/in/"}kentkalaw
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border-b px-8 py-2 text-justify text-sm leading-relaxed md:text-base">
                <p className="text-center text-lg leading-snug font-semibold md:text-xl">
                  Full-stack developer focused on building scalable, clean, and
                  user-friendly digital experiences.
                </p>
                <p className="text-muted-foreground text-justify">
                  I'm a fresh graduate specializing in modern web and mobile
                  development. I build responsive, production-ready applications
                  using current frameworks and scalable architecture patterns.
                </p>
                <p className="text-muted-foreground text-justify">
                  My work includes API integration, full-stack systems, and
                  performance-focused UI implementation.
                </p>
                <p className="text-muted-foreground text-justify">
                  During my internship at University of Batangas - ITC, I served
                  as a Front-end Developer, where I contributed to the
                  development of the university's website and internal tools. I
                  collaborated with a team to implement responsive designs and
                  enhance user experience, gaining valuable insights into
                  real-world application development and teamwork dynamics.
                </p>
              </div>
              <div className="w-full flex flex-col space-y-4 px-8 py-2 text-justify items-center text-sm leading-relaxed md:text-base">
                <p>
                  <span className="text-sm tracking-widest uppercase">
                    When I'm not coding
                  </span>
                </p>
                <p className="text-muted-foreground text-justify">
                  I enjoy playing video games, watching anime, reading manga, and listening to music,. I also like to travel a lot and explore new places.
                </p>
                
              </div>
              <div className="flex flex-col items-center space-y-2 gap-2">
                <p>
                  <span className="text-sm tracking-widest uppercase">
                    Games I Liked Recently
                  </span>
                </p>
                <LogoSlider logos={logosSvg} speed={40} direction="left" />
                <p>
                  <span className="text-sm tracking-widest uppercase">
                    Song I vibe to recently
                  </span>
                </p>
                <AudioPlayerComponent 
                  title="NIKI - Backburner"
                  src="/music/NIKI - Backburner.MP3"
                  externalLink="https://www.youtube.com/watch?v=BBpIV9A1PXc"
                />
              </div>
            </div>
          </PanelContent>
        </Panel>
        <Footer />
      </div>
    </main>
  );
}
