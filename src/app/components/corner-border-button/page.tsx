import { CornerBorderButton } from "@/components/ui/corner-border-button";
import { ComponentDocs } from "@/components/component-docs";
import {
  cornerBorderButtonCode,
  usageExample,
  utilsFile,
} from "@/lib/components/corner-border-button-data";

export default function CornerBorderButtonComponent() {
  return (
    <ComponentDocs
      title="Corner Border Button"
      description="A corner border button component with animated corner borders"
      preview={
            <CornerBorderButton>
              Click Me :{">"}
            </CornerBorderButton>
      }
      componentCode={cornerBorderButtonCode}
      componentFilename="components/ui/corner-border-button.tsx"
      usageCode={usageExample}
      cliCommands={{
        pnpm: 'pnpm dlx shadcn@latest add "https://kentkalaw.vercel.app/r/corner-border-button.json"',
        npm: 'npx shadcn@latest add "https://kentkalaw.vercel.app/r/corner-border-button.json"',
        bun: 'bun --bun shadcn@latest add "https://kentkalaw.vercel.app/r/corner-border-button.json"',
        yarn: 'yarn shadcn@latest add "https://kentkalaw.vercel.app/r/corner-border-button.json"',
      }}
      dependencies={{
        pnpm: "pnpm add clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
        npm: "npm i clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
        bun: "bun add clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
        yarn: "yarn add clsx tailwind-merge @radix-ui/react-slot class-variance-authority",
      }}
      utilsFile={utilsFile}
    />
  );
}
