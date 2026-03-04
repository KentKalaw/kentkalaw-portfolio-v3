"use client";

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";
import SocialIcon from "@/components/social-icon";

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
          <p className="text-muted-foreground text-base tracking-[0.8em] uppercase">
            Socials
          </p>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <SocialIcon links={socials} size="lg" />
        </div>
      </PanelContent>
    </Panel>
  );
}
