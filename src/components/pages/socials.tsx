"use client";

import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

const socials = [
  { name: "GitHub", url: "https://github.com/kentkalaw", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/kentkalaw", icon: Linkedin },
  { name: "Facebook", url: "https://facebook.com/kentkalaw03", icon: Facebook },
  { name: "Email", url: "mailto:kentfranciskalaw@gmail.com", icon: Mail },
];

export default function Socials() {
  return (
       <Panel className="animate-fade-in animate-delay-500">
        <PanelHeader>
          <PanelTitle>
            <p className="text-base tracking-[0.8em] uppercase text-muted-foreground">
          Socials
        </p>
          </PanelTitle>
        </PanelHeader>

        <PanelContent>
          <div className="flex gap-4 justify-center md:justify-center">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-transform duration-200 hover:scale-125 hover:text-foreground text-muted-foreground"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </PanelContent>
      </Panel>
  );
}
