"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured, type BlogPost } from "@/lib/supabase";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    if (!isSupabaseConfigured || !slug) return;

    async function loadBlog() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error || !data) {
          console.error(error);
          toast.error("Unable to load blog post for editing.");
          router.replace("/blogs");
          return;
        }

        const blog = data as BlogPost;
        setTitle(blog.title);
        setSubtitle(blog.subtitle);
        setContent(blog.content);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [router, slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured || !slug) {
      toast.error("Supabase is not configured. Cannot update blog posts.");
      return;
    }

    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from("blogs")
        .update({
          title: title.trim(),
          subtitle: subtitle.trim(),
          content: content.trim(),
        })
        .eq("slug", slug);

      if (error) {
        console.error(error);
        toast.error(error.message || "Unable to update blog post.");
        return;
      }

      toast.success("Blog post updated.");
      router.push(`/blogs/${slug}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the blog post.");
    } finally {
      setSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Supabase is not configured. Please set your Supabase environment keys to enable editing
          stored blog posts.
        </p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Loading blog post…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Edit blog post</CardTitle>
          <CardDescription>
            Update the title, subtitle, or content. Markdown for code blocks and lists is supported.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={10}
                required
              />
            </div>
            <CardFooter className="px-0 pt-4">
              <div className="flex w-full items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-xs text-muted-foreground"
                  onClick={() => router.push("/blogs/posts")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


