"use client";

import { useState, useEffect } from "react";
import { Check, Copy, FileJson, FileCode2, FileType } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

interface PackageManagerCommand {
  pnpm: string;
  npm: string;
  bun: string;
  yarn: string;
}

interface CodeBlockCommandProps {
  commands: PackageManagerCommand;
  className?: string;
}

const FileIcon = ({ language, className }: { language: string; className?: string }) => {
  const iconClass = cn("h-3 w-3", className);
  
  if (language === "tsx") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#3178C6" className={iconClass}><path  d="M454.528.001H57.469C27.102-.228.403 23.534 0 57.471v397.058c.404 33.937 27.102 57.698 57.47 57.47h397.058c39.276-.56 56.791-30.223 57.472-57.47V57.471C511.32 30.224 493.805.56 454.528 0M170.433 308.45h-48.83v155.887H82.417V308.45h-48.83v-39.185h136.845zm114.01 149.193c-31.375 13.921-87.05 8.847-106.163-33.191l31.487-18.193c15.744 29.913 56.577 29.842 64.593 10.14c7.829-19.236-15.787-26.758-45.095-39.755c-12.747-6.574-32.472-16.927-38.392-42.224c-4.467-19.09-.481-47.937 29.388-61.11l.004.002c41.429-15.204 73.237 4.198 82.567 26.59l-30.09 19.592c-4.448-8.028-13.928-16.237-24.873-16.824c-9.926-.533-19.154 4.657-19.448 18.08c.589 19.56 26.308 19.557 57.15 39.094c22.594 14.313 26.826 25.253 28.915 45.026c1.548 14.655-1.209 39.977-30.044 52.773m152.738 6.693l-37.786-67.173l-37.785 67.174h-38.485l54.579-100.06l-51.08-95.164l.002-.001h39.184l33.586 62.275l33.587-62.275h38.485l-50.38 95.163l54.578 100.06z"/></svg>
    );
  }
  
  if (language === "ts" || language === "typescript") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#3178C6" className={iconClass}><path  d="M0 0v512h512V0zm294.445 222.23H221.63v225.553h-40.1V222.23h-72.665v-37.298h185.581zm149.212 202.559c-24.443 31.85-94.558 36.713-135.325 10.214v-49.857c22.19 24.235 45.152 27.699 63.042 29.342c55.89 4.65 57.509-41.905 34.886-61.101c-33.311-26.885-99.65-41.844-97.578-99.938c-.482-41.618 31.829-69.556 79.912-72.152c18.22-.984 44.193.15 60.527 10.698v46.867c-38.336-35.174-118.13-25.74-98.781 26.47c17.512 32.235 77.733 35.405 103.076 86.453c10.755 28.718 4.768 54.075-9.759 73.004"/></svg>
    );
  }

  if (language === "js" || language === "jsx" || language === "javascript") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#F7DF1E" className={iconClass}><path  d="M454.528.002H57.47C27.103-.228.404 23.534.001 57.471v397.058c.404 33.937 27.102 57.698 57.469 57.469h397.058c39.276-.56 56.791-30.222 57.472-57.469V57.471C511.32 30.224 493.805.56 454.528.002M155.886 415.331c-3.998 29.688-22.571 49.07-56.68 50.031c-26.581.75-48.166-10.729-61.578-36.037l32.189-19.593c.005.01 8.486 15.307 17.58 18.456c4.805 1.664 14.87 2.274 21.43-2.012c5.992-3.913 7.873-14.344 7.873-14.344v-141.35h39.186zm128.558 42.286c-31.375 13.922-87.052 8.848-106.166-33.191l31.488-18.194c15.745 29.915 56.579 29.843 64.595 10.141c7.83-19.238-15.788-26.76-45.097-39.757c-12.747-6.574-32.472-16.927-38.393-42.226c-4.467-19.09-.48-47.938 29.39-61.112l.003.002c41.43-15.204 73.24 4.199 82.57 26.59l-30.09 19.594c-4.449-8.028-13.93-16.237-24.875-16.824c-9.926-.533-19.154 4.656-19.449 18.08c.59 19.56 26.31 19.558 57.153 39.096c22.595 14.313 26.826 25.253 28.916 45.027c1.548 14.656-1.21 39.979-30.045 52.774m152.743 6.694l-37.786-67.176l-37.787 67.177h-38.486l54.58-100.064l-51.082-95.167h39.189l33.587 62.277l33.587-62.278h38.486l-50.382 95.167l54.58 100.064z"/></svg>
    );
  }

  if (language === "json") {
    return <FileJson className={iconClass} />;
  }

  if (language === "css" || language === "scss") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
        <path d="M3 3h18v18H3V3z" fill="#1572B6" />
        <path d="M8.5 17.5l-.5-2h2l.3 1.5L12 18l1.7-.5.3-1.5h-2l-.5-2h2l.5-2H12l-.5-2h-2l.5 2H8l-.5-2H6l.5 2H5l.5 2h1.5l.5 2H6l.5 2h2.5l-.5-2z" fill="white" />
      </svg>
    );
  }

  return <FileCode2 className={iconClass} />;
};

export function CodeBlock({
  code,
  language = "tsx",
  className,
  showLineNumbers = false,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxStyle = mounted ? (isDark ? vscDarkPlus : vs) : vscDarkPlus;
  const bgColor = mounted
    ? isDark
      ? "hsl(var(--muted) / 0.5)"
      : "hsl(var(--muted) / 0.3)"
    : "hsl(var(--muted) / 0.5)";

  return (
    <div className={cn("group relative", className)}>
      {filename && (
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/40 px-4 py-2 rounded-t-lg">
          <div className="flex w-full items-center justify-between gap-2">
            <FileIcon language={language} />
            <span className="text-xs font-medium text-muted-foreground">{filename}</span>
            <div className="ml-auto">
                <button
          onClick={copyToClipboard}
          className="rounded-md border border-border/40 bg-background/95 px-2 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
            </div>
          </div>
        </div>
      )}
      <div className={cn("absolute right-2 z-10", filename ? "top-14" : "top-2")}>
        
      </div>
      <div className={cn("overflow-x-auto border", filename ? "rounded-b-lg border-t-0" : "rounded-lg")}>
        <SyntaxHighlighter
          language={language}
          style={syntaxStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
            fontSize: "0.875rem",
            background: bgColor,
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono), monospace",
            },
          }}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "hsl(var(--muted-foreground) / 0.5)",
            userSelect: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export function CodeBlockCommand({
  commands,
  className,
}: CodeBlockCommandProps) {
  const [copied, setCopied] = useState(false);
  const [activeManager, setActiveManager] = useState<keyof PackageManagerCommand>("pnpm");

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const packageManagers: { key: keyof PackageManagerCommand; label: string }[] = [
    { key: "pnpm", label: "pnpm" },
    { key: "npm", label: "npm" },
    { key: "bun", label: "bun" },
    { key: "yarn", label: "yarn" },
  ];

  return (
    <div className={cn("group relative", className)}>
      <Tabs
        defaultValue="pnpm"
        onValueChange={(value) =>
          setActiveManager(value as keyof PackageManagerCommand)
        }
      >
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/30 px-4 py-2 rounded-t-lg">
          <TabsList variant="line" className="h-7">
            {packageManagers.map((manager) => (
              <TabsTrigger
                key={manager.key}
                value={manager.key}
                className="px-3 text-xs"
              >
                {manager.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <button
            onClick={() => copyToClipboard(commands[activeManager])}
            className="rounded-md border border-border/40 bg-background/50 px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Copy command"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        {packageManagers.map((manager) => (
          <TabsContent key={manager.key} value={manager.key} className="mt-0">
            <pre className="overflow-x-auto rounded-b-lg border border-t-0 bg-muted/50 p-4 text-sm">
              <code className="text-foreground">{commands[manager.key]}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
