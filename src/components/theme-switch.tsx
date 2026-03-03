"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSound } from "@/hooks/use-sound"
import { SOUND } from "@/lib/sound"
import { useHotkeys } from "react-hotkeys-hook"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const playClick = useSound(SOUND.click)
  const isDark = theme === "dark"

  const toggleTheme = () => {
    playClick(0.5)
    setTheme(isDark ? "light" : "dark")
  }

  useHotkeys(
    "d",
    () => toggleTheme(),
    { enableOnFormTags: false }
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          suppressHydrationWarning
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative h-9 w-9 rounded-xl
                     text-foreground/70
                     hover:bg-muted/50
                     hover:text-foreground
                     transition-colors"
        >
          <Sun
            suppressHydrationWarning
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              isDark
                ? "scale-0 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100 text-yellow-500"
            )}
          />
          <Moon
            suppressHydrationWarning
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              isDark
                ? "scale-100 rotate-0 opacity-100 text-blue-500"
                : "scale-0 -rotate-90 opacity-0"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent side="bottom" className="flex items-center gap-2">
        Toggle Theme
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-foreground">
  D
</kbd>
      </TooltipContent>
    </Tooltip>
  )
}