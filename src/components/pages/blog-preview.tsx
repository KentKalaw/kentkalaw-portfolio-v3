"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogPosts as fallbackBlogPosts } from "@/lib/blog-data";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";

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
            (data as BlogPost[]).map(post => ({
              id: post.id,
              title: post.title,
              timestamp: formatDate(post.created_at),
              content: post.content,
              slug: post.slug,
            })) ?? [];

          setPosts(mapped);
          return;
        }
      }

      const latest = [...fallbackBlogPosts]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )
        .slice(0, 2)
        .map(post => ({
          id: post.id,
          title: post.title ?? "Blog post",
          timestamp: post.timestamp,
          content: post.content,
          slug: "/blogs",
        }));

      setPosts(latest);
    }

    load();
  }, []);

  return (
    <Panel id="blog" className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <div className="flex w-full items-center justify-between">
          <PanelTitle className="text-muted-foreground text-base tracking-[0.8em] uppercase">
            Blog
          </PanelTitle>

          <Link
            href="/blogs"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            View all →
          </Link>
        </div>
      </PanelHeader>

      <PanelContent className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No posts yet. Writing soon.
          </p>
        ) : (
          <div className="divide-border/40 divide-y">
            {posts.map(post => (
              <article key={post.id} className="group py-6 transition-colors">
                <Link href={`/blogs/${post.slug}`} className="block space-y-2">
                  <p className="text-muted-foreground text-xs">
                    {post.timestamp}
                  </p>
                  <h3 className="group-hover:text-foreground text-lg leading-snug font-medium transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {post.content}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </PanelContent>
    </Panel>
  );
}
