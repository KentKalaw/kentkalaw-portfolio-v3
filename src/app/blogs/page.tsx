import { MoveLeft, ArrowRight, MoveRight } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";

import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";
import { blogPosts as fallbackBlogPosts } from "@/lib/blog-data";

type BlogListItem = {
  id: string | number;
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  createdAt: string;
  minutesToRead: number;
  preview: string;
};

type PaginatedBlogs = {
  items: BlogListItem[];
  total: number;
};

const WORDS_PER_MINUTE = 200;
const PAGE_SIZE = 3;

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function createPreview(content: string, limit = 160): string {
  const trimmed = content.replace(/\s+/g, " ").trim();
  if (trimmed.length <= limit) return trimmed;
  return trimmed.slice(0, limit).trimEnd() + "…";
}

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

async function getBlogs(page: number): Promise<PaginatedBlogs> {
  if (isSupabaseConfigured) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (!error && data) {
      const items = (data as BlogPost[]).map(post => ({
        id: post.id,
        title: post.title,
        subtitle: post.subtitle,
        content: post.content,
        slug: post.slug,
        createdAt: post.created_at,
        minutesToRead: estimateReadingTime(post.content),
        preview: createPreview(post.content),
      }));

      return {
        items: items.slice(from, to + 1),
        total: count ?? items.length,
      };
    }

    console.error("Error fetching blogs from Supabase:", error);
  }

  const sortedFallback = [...fallbackBlogPosts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const items = sortedFallback.map((post, index) => ({
    id: post.id,
    title: post.title ?? `Note ${index + 1}`,
    subtitle: "Personal note",
    content: post.content,
    slug: `local-${post.id}`,
    createdAt: post.timestamp,
    minutesToRead: estimateReadingTime(post.content),
    preview: createPreview(post.content),
  }));

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  return {
    items: items.slice(from, to),
    total: items.length,
  };
}

export const revalidate = 60;

type BlogsPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);

  const { items: blogs, total } = await getBlogs(currentPage);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-18 animate-fade-in animate-delay-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-2 px-4 text-sm transition-colors"
          >
            <MoveLeft className="mr-1 h-4 w-4" />
            Go Back
          </Link>
        </div>
        <Panel>
          <PanelHeader>
            <div className="flex items-center justify-between">
              <PanelTitle className="text-xl tracking-[0.4em] uppercase">
                Blogs
              </PanelTitle>

              <ThemeSwitch />
            </div>
          </PanelHeader>
          <PanelContent className="p-0">
            <div className="divide-border divide-y">
              {blogs.map(post => {
                const href = post.slug.startsWith("local-")
                  ? "/blogs"
                  : `/blogs/${post.slug}`;

                return (
                  <Link key={post.id} href={href} className="group block">
                    <div className="hover:bg-muted/40 flex w-full cursor-pointer items-start justify-between gap-4 p-4 transition-all duration-200">
                      <div className="min-w-0 flex-1 space-y-1">
                        <h2 className="text-foreground truncate text-base font-semibold md:text-lg">
                          {post.title}
                        </h2>
                        {post.subtitle && (
                          <p className="text-foreground line-clamp-1 text-sm">
                            {post.subtitle}
                          </p>
                        )}
                        <p className="text-muted-foreground mt-1 text-sm">
                          {post.preview}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
                          {post.minutesToRead} min read
                        </span>
                        <span className="text-muted-foreground group-hover:text-foreground flex items-center text-xs font-medium transition-colors">
                          Read <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {pageCount > 1 && (
              <div className="screen-line-before dark:text-muted-foreground flex items-center px-2 py-2 justify-between text-sm">
                <Link
                  href={
                    currentPage <= 2
                      ? "/blogs"
                      : `/blogs?page=${currentPage - 1}`
                  }
                  className={` ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                >
                  <MoveLeft />
                </Link>

                <span>
                  Page {currentPage} of {pageCount}
                </span>

                <Link
                  href={`/blogs?page=${currentPage + 1}`}
                  className={` ${currentPage >= pageCount ? "pointer-events-none opacity-50" : ""}`}
                >
                  <MoveRight />
                </Link>
              </div>
            )}
          </PanelContent>
        </Panel>

        <Footer />
      </div>
    </main>
  );
}
