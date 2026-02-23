"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useSound } from "@/hooks/use-sound"
import { SOUND } from "@/lib/sound"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const playClick = useSound(SOUND.click)

  const isDark = theme === "dark"


  return (
    <Button 
      suppressHydrationWarning
      variant="ghost"
      size="icon"
      onClick={() => {
        playClick(0.5)
        setTheme(isDark ? "light" : "dark")
      }}
      className="relative h-9 w-9 rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-yellow-400"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100 text-blue-400" : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </Button>
  )
}
