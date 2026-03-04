"use client";
import SocialIcon from "@/components/social-icon";
import { ComponentDocs } from "@/components/component-docs";
import {
    socialIconCode,
    usageExample,
    utilsFile,
} from "@/lib/components/social-icon-data";
import { Facebook, Github, Linkedin, Mail } from "lucide-react";

export default function SocialIconComponent() {

const socials = [
  { name: "GitHub", url: "https://github.com/kentkalaw", icon: Github },
  { name: "LinkedIn", url: "https://linkedin.com/in/kentkalaw", icon: Linkedin },
  { name: "Facebook", url: "https://facebook.com/kentkalaw03", icon: Facebook },
  { name: "Email", url: "mailto:kentfranciskalaw@gmail.com", icon: Mail },
];
  return (
    <ComponentDocs
      title="Social Icons"
      description="A set of social media icons with hover effects and theme-aware styling, built with shadcn/ui."
      preview={
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <SocialIcon links={socials} size="lg" />
        </div>
      }
      componentCode={socialIconCode}
      componentFilename="components/social-icon.tsx"
      usageCode={usageExample}
      cliCommands={{
        pnpm: 'pnpm dlx shadcn@latest add "https://kentkalaw.vercel.app/r/social-icon.json"',
        npm: 'npx shadcn@latest add "https://kentkalaw.vercel.app/r/social-icon.json"',
        bun: 'bun --bun shadcn@latest add "https://kentkalaw.vercel.app/r/social-icon.json"',
        yarn: 'yarn shadcn@latest add "https://kentkalaw.vercel.app/r/social-icon.json"',
      }}
      dependencies={{
        pnpm: "pnpm add clsx tailwind-merge lucide-react",
        npm: "npm i clsx tailwind-merge lucide-react",
        bun: "bun add clsx tailwind-merge lucide-react",
        yarn: "yarn add clsx tailwind-merge lucide-react",
      }}
      utilsFile={utilsFile}
    />
  );
}
