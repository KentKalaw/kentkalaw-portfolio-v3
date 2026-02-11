"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function BlogLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getUser().then((result: Awaited<ReturnType<typeof supabase.auth.getUser>>) => {
      const { data } = result;
      if (data.user) {
        router.replace("/blogs/posts");
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error("Supabase is not configured. Add your keys in the environment.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Unable to sign in.");
        return;
      }

      toast.success("Signed in successfully.");
      router.push("/blogs/posts");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while signing in.");
    } finally {
      setLoading(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Supabase is not configured. Please set{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          in your environment to enable authenticated blog creation.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm border shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sign in</CardTitle>
          <CardDescription>
            Admin Login Only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


