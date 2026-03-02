import { LucideIcon } from "lucide-react";

interface IconBoxProps {
  icon: LucideIcon;
}

export function IconBox({ icon: Icon }: IconBoxProps) {
  return (
    <div className="relative rounded-md w-6 h-6 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 ring-1 ring-zinc-200 dark:ring-zinc-900 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 flex items-center justify-center">
      <Icon size={14} strokeWidth={1.8} className="text-zinc-500 dark:text-zinc-400" />
    </div>
  );
}