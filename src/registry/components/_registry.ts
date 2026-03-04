import { Registry } from 'shadcn/schema';

export const components: Registry["items"] = [
    {
        name: "audio-player",
        type: "registry:component",
        description: "A minimal, theme-aware audio player component built for shadcn/ui, featuring play/pause controls, integrated progress visualization.",
        title: "Audio Player",
        dependencies: ["lucide-react", "clsx", "tailwind-merge"],
        files: [
            {
                path: "components/audio-player.tsx",
                type: "registry:component"
            },
        ],
    }
];