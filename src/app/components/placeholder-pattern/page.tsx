import PlaceholderPattern from "@/components/placeholder-pattern";
import { ComponentDocs } from "@/components/component-docs";
import {
  placeholderPatternCode,
  usageExample,
  utilsFile,
} from "@/lib/components/placeholder-pattern-data";

export default function PlaceholderPatternComponent() {
  return (
    <ComponentDocs
      title="Placeholder Pattern"
      description="A placeholder pattern component for creating visual separators"
      preview={
            <PlaceholderPattern className="w-full" />
      }
      componentCode={placeholderPatternCode}
      componentFilename="components/placeholder-pattern.tsx"
      usageCode={usageExample}
      cliCommands={{
        pnpm: 'pnpm dlx shadcn@latest add "https://kentkalaw.vercel.app/r/placeholder-pattern.json"',
        npm: 'npx shadcn@latest add "https://kentkalaw.vercel.app/r/placeholder-pattern.json"',
        bun: 'bun --bun shadcn@latest add "https://kentkalaw.vercel.app/r/placeholder-pattern.json"',
        yarn: 'yarn shadcn@latest add "https://kentkalaw.vercel.app/r/placeholder-pattern.json"',
      }}
      dependencies={{
        pnpm: "pnpm add clsx tailwind-merge",
        npm: "npm i clsx tailwind-merge",
        bun: "bun add clsx tailwind-merge",
        yarn: "yarn add clsx tailwind-merge",
      }}
      utilsFile={utilsFile}
    />
  );
}
