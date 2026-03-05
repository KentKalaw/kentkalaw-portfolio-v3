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
    }
];