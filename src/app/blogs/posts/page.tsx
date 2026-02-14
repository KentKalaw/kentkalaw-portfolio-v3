"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Plus, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DashboardPost = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  createdAt: string;
};

const PAGE_SIZE = 5;

function BlogPostsDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<DashboardPost | null>(null);

  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth
      .getUser()
      .then((result: Awaited<ReturnType<typeof supabase.auth.getUser>>) => {
        const { data } = result;
        if (!data.user) {
          router.replace("/blogs/login");
        }
      });
  }, [router]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    async function fetchPosts() {
      setLoading(true);
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("blogs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error(error);
        setPosts([]);
        setTotal(0);
      } else {
        const mapped =
          (data as BlogPost[] | null)?.map(post => ({
            id: post.id,
            title: post.title,
            subtitle: post.subtitle,
            slug: post.slug,
            createdAt: post.created_at,
          })) ?? [];

        setPosts(mapped);
        setTotal(count ?? mapped.length);
      }

      setLoading(false);
    }

    fetchPosts();
  }, [currentPage]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function formatDate(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(d);
  }

  async function deletePost(id: string) {
    if (!isSupabaseConfigured) return;
    setDeletingId(id);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) {
        console.error(error);
        return;
      }

      setPosts(prev => prev.filter(post => post.id !== id));
      setTotal(prev => Math.max(0, prev - 1));
    } finally {
      setDeletingId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!selectedPost) return;
    await deletePost(selectedPost.id);
    setConfirmOpen(false);
    setSelectedPost(null);
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-muted-foreground max-w-md text-center text-sm">
          Supabase is not configured. Please add your Supabase environment keys
          to manage blog posts.
        </p>
      </main>
    );
  }

  async function handleLogout() {
    if (!isSupabaseConfigured) return;

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }

    router.replace("/blogs/login");
  }

  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <BookOpen className="h-4 w-4" />
              <span>Blog posts dashboard</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Manage posts
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs shadow-none"
              onClick={handleLogout}
            >
              Logout
            </Button>

            <Button variant="outline" size="sm" className="shadow-none" asChild>
              <Link href="/blogs/new">
                <Plus className="mr-1 h-3 w-3" />
                New post
              </Link>
            </Button>

            <ThemeSwitch />
          </div>
        </div>

        <Card className="border shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Current posts
              </CardTitle>
              <CardDescription className="text-xs">
                View, edit, or delete your existing blog posts.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-xs">Loading posts…</p>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-xs">
                No posts yet. Create your first one.
              </p>
            ) : (
              <div className="divide-border divide-y">
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {post.title}
                        </p>
                      </div>
                      <p className="text-muted-foreground truncate text-xs">
                        {post.subtitle}
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs shadow-none"
                        asChild
                      >
                        <Link href={`/blogs/${post.slug}`}>View</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 text-xs shadow-none"
                        asChild
                      >
                        <Link href={`/blogs/edit/${post.slug}`}>
                          <Edit3 className="mr-1 h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs text-red-600 shadow-none hover:bg-red-50 dark:hover:bg-red-900/20"
                        type="button"
                        onClick={() => {
                          setSelectedPost(post);
                          setConfirmOpen(true);
                        }}
                        disabled={deletingId === post.id}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        {deletingId === post.id ? "Deleting…" : "Delete"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
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
                        ? "/blogs/posts"
                        : `/blogs/posts?page=${currentPage - 1}`
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
                  <Link href={`/blogs/posts?page=${currentPage + 1}`}>
                    Next
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-medium">
                {selectedPost?.title ?? "this post"}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              size="sm"
              onClick={() => {
                setConfirmOpen(false);
                setSelectedPost(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              size="sm"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!!deletingId}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default function BlogPostsDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4">
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      }
    >
      <BlogPostsDashboard />
    </Suspense>
  );
}
