"use client";
import {
  Home,
  Mail,
  User,
  BookOpen,
  Tickets,
  FolderCode,
  Component,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter, usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

const NavItem = () => {
  const router = useRouter();
  const pathname = usePathname();

  const triggerScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TooltipProvider>
      <div className="border-border bg-background/80 flex items-center justify-between border px-3 py-3 md:px-6 md:py-3">
        <div className="flex items-center gap-2 md:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-xl md:h-9 md:w-9"
                onClick={() => {
                  if (pathname !== "/") {
                    router.push("/");
                  } else {
                    triggerScrollToTop();
                  }
                }}
              >
                <Home />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-xl md:h-9 md:w-9"
                onClick={() => {
                  if (pathname !== "/about") {
                    router.push("/about");
                  }
                }}
              >
                <User />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>About Me</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-xl md:h-9 md:w-9"
                onClick={() => {
                  if (pathname !== "/blogs") {
                    router.push("/blogs");
                  }
                }}
              >
                <BookOpen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Blogs</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-xl md:h-9 md:w-9"
                onClick={() => {
                  if (pathname !== "/certifications") {
                    router.push("/certifications");
                  }
                }}
              >
                <Tickets />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Certifications</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-xl md:h-9 md:w-9"
                onClick={() => {
                  if (pathname !== "/projects") {
                    router.push("/projects");
                  }
                }}
              >
                <FolderCode />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Projects</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex h-5 items-center gap-2">
          <Link href="/components" className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:bg-muted/50 hover:text-foreground relative h-9 w-9 rounded-lg transition-colors"
            >
              <Component className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </Button>
          </Link>
          <Link href="/components" className="hidden md:block">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:bg-muted/50 hover:text-foreground hidden items-center gap-2 rounded-lg transition-colors md:flex"
          >
            <Component className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            Components
          </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <ThemeSwitch />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default NavItem;
