import { BookOpen, ArrowRight } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
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
      const items = (data as BlogPost[]).map((post) => ({
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
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
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
    <main className="relative min-h-screen overflow-x-hidden pt-18">
      <div className="screen-line-before screen-line-after border-x border-edge max-w-5xl mx-auto px-4 py-10">

        <div className="animate-fade-in mb-8 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blogs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ThemeSwitch />
        </div>

        <div className="screen-line-before screen-line-after py-6 animate-fade-in animate-delay-100 mb-10">
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold md:text-4xl">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            Blogs
          </h1>
          <p className="text-sm text-muted-foreground">
            Everything about my life, thoughts, and technical explorations.
          </p>
        </div>

        {/* Blog List */}
        <div className="animate-fade-in animate-delay-200 space-y-3 rounded-xl border border-edge bg-background/60 p-4">

          {blogs.map((post) => (
            <div
              key={post.id}
              className="group rounded-lg border border-edge bg-card/50 p-4 transition-all duration-200 hover:bg-muted/40"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-1">
                  <h2 className="truncate text-base font-semibold text-foreground md:text-lg">
                    {post.title}
                  </h2>

                  {post.subtitle && (
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {post.subtitle}
                    </p>
                  )}
                </div>

                <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
                  {post.minutesToRead} min read
                </span>
              </div>

              {/* Bottom Row */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="shadow-none"
                  asChild
                >
                  <Link
                    href={
                      post.slug.startsWith("local-")
                        ? "/blogs"
                        : `/blogs/${post.slug}`
                    }
                  >
                    <span className="mr-1 text-xs font-medium">Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="px-2 shadow-none"
              asChild
              disabled={currentPage <= 1}
            >
              <Link
                href={
                  currentPage <= 2
                    ? "/blogs"
                    : `/blogs?page=${currentPage - 1}`
                }
              >
                Previous
              </Link>
            </Button>

            <span>
              Page {currentPage} of {pageCount}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className="px-2 shadow-none"
              asChild
              disabled={currentPage >= pageCount}
            >
              <Link href={`/blogs?page=${currentPage + 1}`}>
                Next
              </Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
