import { notFound } from "next/navigation";
import CopyLinkButton from "./CopyLinkButton";
import Link from "next/link";
import { BookOpen, MoveLeft } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";
import ReactMarkdown, { type Components } from "react-markdown";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/footer";

const WORDS_PER_MINUTE = 200;

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function formatDate(date: string | Date) {
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const minutesToRead = estimateReadingTime(blog.content);

  const markdownComponents: Components = {
    p({ className, ...props }) {
      return (
        <p
          className={cn(
            "mb-4 text-sm leading-relaxed whitespace-pre-wrap",
            className,
          )}
          {...props}
        />
      );
    },
    code({ inline, className, children, ...props }: any) {
      if (inline) {
        return (
          <code
            className={cn(
              "bg-muted rounded px-1.5 py-0.5 font-mono text-xs",
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
            "inline-block rounded-md border",
            "border-border bg-muted/60",
            "px-2 py-2 font-mono text-xs leading-relaxed",
            "text-foreground",
            "whitespace-pre-wrap",
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
            "mt-4 mb-4 list-disc space-y-2 pl-5 text-sm leading-relaxed",
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
    <main className="animate-fade-in animate-delay-100 relative overflow-x-hidden pt-10 md:pt-11">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="py-2 md:text-2xl md:tracking-[0.8em] uppercase">
                Blog Post
              </PanelTitle>
              <div className="flex items-center gap-4">
                <Link
                  href="/blogs"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
                >
                  <MoveLeft className="h-4 w-4" />
                  Back to blogs
                </Link>
              </div>
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="text-muted-foreground flex items-center gap-2 p-4 text-xs">
              <BookOpen className="h-4 w-4" />
              <span>{minutesToRead} min read</span>
              <span>·</span>
              <span>{formatDate(blog.created_at)}</span>
            </div>

            <div className="flex flex-col gap-2 px-4">
              {blog.title && <p className="text-2xl">{blog.title}</p>}
              {blog.subtitle && (
                <p className="text-muted-foreground mb-4 text-sm">
                  {blog.subtitle}
                </p>
              )}

              <article className="prose prose-sm dark:prose-invert md:prose-base mb-4 max-w-none text-sm leading-relaxed">
                <ReactMarkdown components={markdownComponents}>
                  {blog.content}
                </ReactMarkdown>
              </article>
            </div>
            <CopyLinkButton />
          </PanelContent>
        </Panel>
        <Footer />
      </div>
    </main>
  );
}
