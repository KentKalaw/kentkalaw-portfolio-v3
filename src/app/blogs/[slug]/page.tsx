import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
      const {
        inline,
        className,
        children,
        ...props
      }: {
        inline?: boolean;
        className?: string;
        children: React.ReactNode;
      } = codeProps as any;

      if (inline) {
        return (
          <code
            className={cn(
              "rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
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
            "mt-4 block w-full overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950/95 px-3 py-2 text-xs leading-relaxed text-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 font-mono",
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
            "mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed",
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
            "mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed",
            className,
          )}
          {...props}
        />
      );
    },
  };

  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-2">
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

        <header className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
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

        <article className="prose prose-sm max-w-none text-sm leading-relaxed text-gray-900 dark:prose-invert dark:text-gray-100 md:prose-base">
          <ReactMarkdown components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}


