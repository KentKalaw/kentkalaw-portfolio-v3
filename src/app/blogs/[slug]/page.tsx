
import { notFound } from "next/navigation";
import CopyLinkButton from "./CopyLinkButton";
import Link from "next/link";
import { BookOpen, Link2 } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";
import ReactMarkdown, { type Components } from "react-markdown";
import { cn } from "@/lib/utils";

const WORDS_PER_MINUTE = 200;

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }

  return (data as BlogPost) ?? null;
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPage(props: BlogPageProps) {
  const { slug } = await props.params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const minutesToRead = estimateReadingTime(blog.content);

  const markdownComponents: Components = {
    code(codeProps) {
      const { inline, className, children, ...props }: any = codeProps;

      if (inline) {
        return (
          <code
            className={cn(
              "rounded bg-muted px-1.5 py-0.5 text-xs font-mono",
              className,
            )}
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code
          className={cn(
            "mt-4 block w-full overflow-x-auto rounded-lg border border-edge bg-card px-3 py-3 text-xs leading-relaxed font-mono",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    ul({ className, ...props }) {
      return (
        <ul
          className={cn(
            "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed",
            className,
          )}
          {...props}
        />
      );
    },
    ol({ className, ...props }) {
      return (
        <ol
          className={cn(
            "mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed",
            className,
          )}
          {...props}
        />
      );
    },
  };

  return (
    <main className="relative animate-fade-in animate-delay-100 min-h-screen overflow-x-hidden pt-18">
      <div className="screen-line-before screen-line-after border-x border-edge max-w-5xl mx-auto px-4 py-10">

        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ThemeSwitch />
        </div>
        <header className="mb-10 space-y-3">
          <div className="flex screen-line-before screen-line-after items-center py-6 gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{minutesToRead} min read</span>
            <span>·</span>
            <span>{formatDate(blog.created_at)}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {blog.title}
          </h1>

          {blog.subtitle && (
            <p className="text-sm text-muted-foreground md:text-base">
              {blog.subtitle}
            </p>
          )}
        </header>
        <article className="prose prose-sm max-w-none text-sm leading-relaxed dark:prose-invert md:prose-base">
          <ReactMarkdown components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </article>
        <div className="flex w-full justify-end my-6 border-t border-edge" />
          <CopyLinkButton />
      </div>
    </main>
  );
}