import AudioPlayer from "@/components/audio-player";
import { ComponentDocs } from "@/components/component-docs";
import {
  audioPlayerCode,
  usageExample,
  utilsFile,
} from "@/lib/components/audio-player-data";

export default function AudioPlayerComponent() {
  return (
    <ComponentDocs
      title="Audio Player"
      description="A minimal, theme-aware audio player component built for shadcn/ui, featuring play/pause controls, integrated progress visualization"
      preview={
        <AudioPlayer title="Sample Audio" src="/music/keshi - dream.MP3" />
      }
      componentCode={audioPlayerCode}
      componentFilename="components/audio-player.tsx"
      usageCode={usageExample}
      cliCommands={{
        pnpm: 'pnpm dlx shadcn@latest add "https://kentkalaw.vercel.app/r/audio-player.json"',
        npm: 'npx shadcn@latest add "https://kentkalaw.vercel.app/r/audio-player.json"',
        bun: 'bun --bun shadcn@latest add "https://kentkalaw.vercel.app/r/audio-player.json"',
        yarn: 'yarn shadcn@latest add "https://kentkalaw.vercel.app/r/audio-player.json"',
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
