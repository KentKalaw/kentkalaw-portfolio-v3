"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function generateSlug(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return `${base || "post"}-${Date.now().toString(36)}`;
}

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingAuth(false);
      return;
    }

    supabase.auth.getUser().then((result: Awaited<ReturnType<typeof supabase.auth.getUser>>) => {
      const { data } = result;
      if (!data.user) {
        router.replace("/blogs/login");
      } else {
        setCheckingAuth(false);
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      toast.error("Supabase is not configured. Cannot create blog posts.");
      return;
    }

    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSaving(true);

    try {
      const slug = generateSlug(title);

      const { error } = await supabase.from("blogs").insert({
        title: title.trim(),
        subtitle: subtitle.trim(),
        content: content.trim(),
        slug,
      });

      if (error) {
        console.error(error);
        toast.error(error.message || "Unable to save blog post.");
        return;
      }

      toast.success("Blog post created.");
      router.push(`/blogs/${slug}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving the blog post.");
    } finally {
      setSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Supabase is not configured. Please set your Supabase environment keys to enable creating
          and storing blog posts dynamically.
        </p>
      </main>
    );
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create a new blog post</CardTitle>
          <CardDescription>
            Supports basic Markdown for <code className="rounded bg-muted px-1 text-xs">code</code>,
            code blocks (```), and bullet lists (- item).
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
                placeholder="Title here"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                placeholder="Subtitle here"
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
                placeholder="Write your blog content here..."
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
                  {saving ? "Saving..." : "Publish post"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


