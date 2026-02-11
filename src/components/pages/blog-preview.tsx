
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as fallbackBlogPosts } from "@/lib/blog-data";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";

type PreviewPost = {
  id: string | number;
  title: string;
  timestamp: string;
  content: string;
  slug: string;
};

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<PreviewPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(2);

        if (!error && data) {
          const mapped =
            (data as BlogPost[]).map((post) => ({
              id: post.id,
              title: post.title,
              timestamp: formatDate(post.created_at),
              content: post.content,
              slug: post.slug,
            })) ?? [];

          setPosts(mapped);
          setLoading(false);
          return;
        }
      }

      const latest = [...fallbackBlogPosts]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime(),
        )
        .slice(0, 2)
        .map((post) => ({
          id: post.id,
          title: post.title ?? "Blog post",
          timestamp: post.timestamp,
          content: post.content,
          slug: "/blogs",
        }));

      setPosts(latest);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <section className="animate-fade-in animate-delay-100 mb-3">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <BookOpen />
            Blog
          </CardTitle>
          <Link
            href="/blogs"
            className="text-muted-foreground text-xs hover:underline"
          >
            View Blogs {">"}
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-xs text-muted-foreground">
              Loading latest posts…
            </p>
          ) : posts.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No posts yet. Write something soon.
            </p>
          ) : (
            <div className="space-y-0">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`py-3 ${
                    index !== posts.length - 1
                      ? "border-b border-gray-200 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <div className="flex gap-2">
                    <div className="flex-shrink-0">
                      <Image
                        src="/kentkalaw-v1.jpg"
                        alt="Kent Kalaw"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-1">
                        <span className="hidden md:block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Kent Francis E. Kalaw
                        </span>
                        <span className="md:hidden block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Kent Kalaw
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ·
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {post.timestamp}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-xs leading-relaxed text-gray-900 dark:text-gray-100">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

