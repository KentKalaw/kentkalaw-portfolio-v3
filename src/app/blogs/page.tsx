import { BookOpen } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BlogsPage() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="animate-fade-in mb-6 flex items-center justify-between gap-2">
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
        <div className="animate-fade-in animate-delay-100 mb-8">
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold md:text-4xl">
            <BookOpen className="h-8 w-8" />
            Blog & Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Everything About Me and My Thoughts
          </p>
        </div>

        <div className="animate-fade-in animate-delay-200 space-y-0 overflow-hidden rounded-lg border">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className={`bg-card text-card-foreground cursor-pointer p-4 transition-colors ${
                index !== blogPosts.length - 1
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/kentkalaw-v1.jpg"
                    alt="Kent Kalaw"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        Kent Francis E. Kalaw
                      </span>
                      <svg
                        viewBox="0 0 22 22"
                        className="h-3 w-3 flex-shrink-0"
                        aria-label="Verified user"
                      >
                        <path
                          fill="#1d9bf0"
                          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                        />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        @kentkalaw
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ·
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-900 dark:text-gray-100">
                    {post.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="animate-fade-in animate-delay-300 mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>More posts coming soon...</p>
        </div>
      </div>
    </main>
  );
}
