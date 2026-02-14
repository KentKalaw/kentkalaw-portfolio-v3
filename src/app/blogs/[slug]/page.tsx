import { notFound } from "next/navigation";
import CopyLinkButton from "./CopyLinkButton";
import Link from "next/link";
import { BookOpen, MoveLeft } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
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
    code({ inline, className, children, ...props }: any) {
      if (inline) {
        return (
          <code
            className={cn(
              "rounded bg-muted px-1.5 py-0.5 text-xs font-mono",
              className
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
            className
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
            className
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
            className
          )}
          {...props}
        />
      );
    },
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-18 animate-fade-in animate-delay-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-row items-center">
          <Breadcrumb className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-2 px-4 text-sm transition-colors">
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
        </div>
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-xl tracking-[0.4em] uppercase">
                Blog Post
              </PanelTitle>

              <ThemeSwitch />
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="flex items-center p-4 gap-2 text-xs text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{minutesToRead} min read</span>
              <span>·</span>
              <span>{formatDate(blog.created_at)}</span>
            </div>

            <div className="flex flex-col px-4 gap-2">
              {
              blog.title && (
                <p className="text-2xl">{blog.title}</p>
              )}
            {blog.subtitle && (
              <p className="text-sm text-muted-foreground">{blog.subtitle}</p>
            )}

             <article className="prose prose-sm max-w-none text-sm leading-relaxed dark:prose-invert md:prose-base mb-4">
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
