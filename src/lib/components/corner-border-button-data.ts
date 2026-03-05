export const cornerBorderButtonCode = `"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/*
==================================================================================
Corner Border Button
==================================================================================
A button with animated corner borders.

Default corners:
  • top-left
  • bottom-right

Hover corners:
  • bottom-left
  • top-right
==================================================================================
*/

const cornerBorderButtonVariants = cva(
  \`
  relative inline-flex items-center justify-center gap-2
  whitespace-nowrap font-mono tracking-wide
  transition-all duration-200

  text-sm
  outline-none
  focus-visible:ring-2 focus-visible:ring-ring

  disabled:pointer-events-none
  disabled:opacity-50

  border
  \`,
  {
    variants: {
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },

    defaultVariants: {
      size: "default",
    },
  }
);

export interface CornerBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cornerBorderButtonVariants> {
  asChild?: boolean;
}

function CornerBorderButton({
  className,
  size,
  asChild = false,
  children,
  ...props
}: CornerBorderButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        cornerBorderButtonVariants({ size }),
        "group relative items-center justify-center",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>

      {/* Default corners */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1px] opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background: \`
            linear-gradient(currentColor,currentColor) top left / 8px 1px no-repeat,
            linear-gradient(currentColor,currentColor) top left / 1px 8px no-repeat,
            linear-gradient(currentColor,currentColor) bottom right / 8px 1px no-repeat,
            linear-gradient(currentColor,currentColor) bottom right / 1px 8px no-repeat
          \`,
        }}
      />

      {/* Hover corners */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: \`
            linear-gradient(currentColor,currentColor) bottom left / 8px 1px no-repeat,
            linear-gradient(currentColor,currentColor) bottom left / 1px 8px no-repeat,
            linear-gradient(currentColor,currentColor) top right / 8px 1px no-repeat,
            linear-gradient(currentColor,currentColor) top right / 1px 8px no-repeat
          \`,
        }}
      />
    </Comp>
  );
}

export { CornerBorderButton, cornerBorderButtonVariants };`;



export const usageExample = `import { CornerBorderButton } from "@/components/ui/corner-border-button";

export default function Example() {
  return (
    <CornerBorderButton>
      Click Me
    </CornerBorderButton>
  );
}`;

export const utilsFile = `import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
};`;