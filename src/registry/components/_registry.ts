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
    },
    {
        name: "social-icon",
        type: "registry:component",
        description: "A set of social media icons with hover effects and theme-aware styling, built with shadcn/ui.",
        title: "Social Icons",
        dependencies: ["lucide-react", "clsx", "tailwind-merge"],
        files: [
            {
                path: "components/social-icon.tsx",
                type: "registry:component"
            },
        ],
    },
    {
        name: "theme-switcher",
        type: "registry:component",
        description: "A custom-built theme switcher component for toggling between light and dark modes and system.",
        title: "Theme Switcher",
        dependencies: ["lucide-react", "clsx", "tailwind-merge", "next-themes", "framer-motion"],
        registryDependencies: ["dropdown-menu"],
        files: [
            {
                path: "components/theme-switcher.tsx",
                type: "registry:component"
            },
        ],
    }
];