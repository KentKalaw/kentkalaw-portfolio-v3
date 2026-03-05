"use client";

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Monitor, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'system' | 'light' | 'dark'

const THEME_OPTIONS: Array<{ value: Theme; icon: React.ReactNode; label: string }> = [
  { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
  { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeOption = THEME_OPTIONS.find((o) => o.value === theme) ?? THEME_OPTIONS[0]

  if (!mounted) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="hidden md:flex flex-row gap-2 px-1 py-1 rounded-md border border-muted/30 bg-card/50 backdrop-blur-sm"
    >
      {THEME_OPTIONS.map((option) => {
        const isActive = false
        return (
          <motion.button
            key={option.value}
            disabled
            className={`relative flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-300 ${
              isActive
                ? 'border-foreground/40 bg-foreground/8'
                : 'border-muted/40 bg-transparent'
            }`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${option.label} theme`}
            aria-pressed={isActive}
          >
            <motion.div
              animate={{
                scale: 1,
                color: 'var(--muted-foreground)',
              }}
              className="flex items-center justify-center"
            >
              {option.icon}
            </motion.div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

  return (
    <>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              className="flex items-center justify-center p-2 rounded-lg border border-foreground/40 bg-foreground/8 shadow-sm backdrop-blur-sm"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme menu"
            >
              {activeOption.icon}
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-0 p-1 flex flex-col gap-1 bg-card/80 backdrop-blur-sm border border-muted/30"
          >
            {THEME_OPTIONS.map((option) => {
              const isActive = theme === option.value
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center justify-center p-2 rounded-md cursor-pointer focus:bg-muted/20 ${
                    isActive ? 'text-foreground bg-foreground/8' : 'text-muted-foreground'
                  }`}
                >
                  {option.icon}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="hidden md:flex flex-row gap-2 px-1 py-1 rounded-md border border-muted/30 bg-card/50 backdrop-blur-sm"
      >
        {THEME_OPTIONS.map((option) => {
          const isActive = theme === option.value

          return (
            <motion.button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`relative flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'border-foreground/40 bg-foreground/8'
                  : 'border-muted/40 hover:border-muted/60 bg-transparent hover:bg-muted/10'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${option.label} theme`}
              aria-pressed={isActive}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                className="flex items-center justify-center"
              >
                {option.icon}
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-lg border border-foreground/40"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </>
  )
}