import { cn } from "@/lib/utils";

export interface PlaceholderPatternProps {
  className?: string;
}

export default function PlaceholderPattern({ className }: PlaceholderPatternProps) {
  return (
    <div
      className={cn(
        "relative h-8 max-w-5xl mx-auto overflow-hidden",
        "flex items-center justify-center",
        className
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full stroke-neutral-900/20 dark:stroke-neutral-100/20"
        fill="none"
      >
        <defs>
          <pattern
            id="separator-pattern"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 16L16 0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#separator-pattern)" />
      </svg>

    </div>
  )
}