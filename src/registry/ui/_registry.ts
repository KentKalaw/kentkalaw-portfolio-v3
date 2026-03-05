import { Registry } from 'shadcn/schema';

export const ui: Registry["items"] = [
    {
        name: "placeholder-pattern",
        type: "registry:ui",
        description: "A minimal, theme-aware placeholder pattern component built for shadcn/ui.",
        title: "Placeholder Pattern",
        dependencies: ["clsx", "tailwind-merge"],
        files: [
            {
                path: "ui/placeholder-pattern.tsx",
                type: "registry:ui"
            },
        ],
    },
    {
        name: "corner-border-button",
        type: "registry:ui",
        description: "A corner border button component with animated corner borders",
        title: "Corner Border Button",
        dependencies: ["clsx", "tailwind-merge", "@radix-ui/react-slot", "class-variance-authority"],
        files: [
            {
                path: "ui/corner-border-button.tsx",
                type: "registry:ui"
            },
        ],
    }
];