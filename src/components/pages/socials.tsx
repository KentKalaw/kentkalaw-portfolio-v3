"use client";

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

const socials = [
  { name: "GitHub", url: "https://github.com/kentkalaw", icon: Github },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kentkalaw",
    icon: Linkedin,
  },
  { name: "Facebook", url: "https://facebook.com/kentkalaw03", icon: Facebook },
  { name: "Email", url: "mailto:kentfranciskalaw@gmail.com", icon: Mail },
];

export default function Socials() {
  return (
    <Panel className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <PanelTitle>
          <p className="text-muted-foreground text-base tracking-[0.8em] uppercase">
            Socials
          </p>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socials.map(social => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-200 active:scale-95"
              >
                <div className="border-border bg-background group-hover:border-foreground flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="hidden text-sm opacity-80 transition-opacity duration-200 group-hover:opacity-100 sm:inline">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </PanelContent>
    </Panel>
  );
}
