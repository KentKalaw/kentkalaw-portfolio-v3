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
  const iconClass = cn("h-4 w-4", className);
  
  if (language === "tsx") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
        <path d="M3 3h18v18H3V3z" fill="#3178C6" />
        <path d="M13.5 16.5h1.8v-1.2h-1.8v-3h-1.2v3h-1.8v1.2h1.8v1.5h1.2v-1.5zM8.4 13.8H6.6v-1.2h4.8v1.2H9.6v4.2H8.4v-4.2z" fill="white" />
        <path d="M16.5 13.5h3v.9h-2.1v.9h1.8v.9h-1.8v1.2h2.1v.9h-3v-4.8z" fill="white" />
      </svg>
    );
  }
  
  if (language === "ts" || language === "typescript") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
        <path d="M3 3h18v18H3V3z" fill="#3178C6" />
        <path d="M13.5 16.5h1.8v-1.2h-1.8v-3h-1.2v3h-1.8v1.2h1.8v1.5h1.2v-1.5zM8.4 13.8H6.6v-1.2h4.8v1.2H9.6v4.2H8.4v-4.2z" fill="white" />
      </svg>
    );
  }

  if (language === "js" || language === "jsx" || language === "javascript") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={iconClass}>
        <path d="M3 3h18v18H3V3z" fill="#F7DF1E" />
        <path d="M14.5 16.5c0 .9-.6 1.5-1.5 1.5s-1.5-.6-1.5-1.5v-3h1.2v3c0 .3.2.5.5.5s.5-.2.5-.5v-3h1.2v3zm3 0c0 .9-.6 1.5-1.5 1.5s-1.5-.6-1.5-1.5v-.3h1.2v.3c0 .3.2.5.5.5s.5-.2.5-.5c0-.3-.2-.5-.5-.5h-.6c-.9 0-1.5-.6-1.5-1.5s.6-1.5 1.5-1.5 1.5.6 1.5 1.5v.3h-1.2v-.3c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .3.2.5.5.5h.6c.9 0 1.5.6 1.5 1.5z" fill="#000" />
      </svg>
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
