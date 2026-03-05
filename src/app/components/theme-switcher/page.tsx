"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { ComponentDocs } from "@/components/component-docs";
import {
    themeSwitcherCode,
    usageExample,
    utilsFile,
    extraStepCode1,
    extraStepCode2
} from "@/lib/components/theme-switcher-data";


export default function ThemeSwitcherComponent() {


  return (
    <ComponentDocs
      title="Theme Switcher"
      description="A custom-built theme switcher component for toggling between light and dark modes and system."
      preview={
          <ThemeSwitcher />
      }
      componentCode={themeSwitcherCode}
      componentFilename="components/theme-switcher.tsx"
      usageCode={usageExample}
      cliCommands={{
        pnpm: 'pnpm dlx shadcn@latest add "https://kentkalaw.vercel.app/r/theme-switcher.json"',
        npm: 'npx shadcn@latest add "https://kentkalaw.vercel.app/r/theme-switcher.json"',
        bun: 'bun --bun shadcn@latest add "https://kentkalaw.vercel.app/r/theme-switcher.json"',
        yarn: 'yarn shadcn@latest add "https://kentkalaw.vercel.app/r/theme-switcher.json"',
      }}
      dependencies={{
        pnpm: "pnpm add clsx tailwind-merge lucide-react next-themes framer-motion",
        npm: "npm i clsx tailwind-merge lucide-react next-themes framer-motion",
        bun: "bun add clsx tailwind-merge lucide-react next-themes framer-motion",
        yarn: "yarn add clsx tailwind-merge lucide-react next-themes framer-motion",
      }}
      utilsFile={utilsFile}
      extraSteps={[
        {
        title: "Create a ThemeProvider",
        code: extraStepCode1,
        filename:"components/theme-provider.tsx",
        language: "tsx"
        },
        {
        title: "Wrap your app with ThemeProvider",
        code: extraStepCode2,
        filename:"app/layout.tsx",
        language:"tsx"
        },
      ]}
    />
  );
}
