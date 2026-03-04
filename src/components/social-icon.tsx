"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface SocialLinksProps {
  links: SocialLink[];
  showLabel?: boolean;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

export default function SocialIcon({
  links,
  showLabel = true,
  className,
  iconClassName,
  size = "md",
}: SocialLinksProps) {
  const sizeStyles = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-4 sm:gap-6",
        className
      )}
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="group text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all duration-200 active:scale-95"
          >
            <div
              className={cn(
                "border-border bg-background group-hover:border-foreground flex items-center justify-center rounded-full border transition-all duration-200 group-hover:scale-105",
                sizeStyles[size]
              )}
            >
              <Icon className={cn("h-5 w-5", iconClassName)} />
            </div>

            {showLabel && (
              <span className="hidden text-sm opacity-80 transition-opacity duration-200 group-hover:opacity-100 sm:inline">
                {link.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}