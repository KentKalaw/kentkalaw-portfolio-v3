"use client";
import {
  Home,
  Mail,
  FileText,
  Download,
  X,
  User,
  BookOpen,
  Tickets,
  FolderCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const NavItem = () => {
  const [showCVViewer, setShowCVViewer] = useState(false);
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

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitch />

          <Button
            size="icon"
            className="bg-muted text-foreground hover:bg-muted/80 rounded-xl md:hidden"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Mail className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            className="bg-muted text-foreground hover:bg-muted/80 rounded-xl md:hidden"
            onClick={() => setShowCVViewer(true)}
          >
            <FileText className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            className="bg-muted text-foreground hover:bg-muted/80 hidden gap-2 rounded-xl md:flex"
            onClick={() => {
              if (pathname !== "/") {
                router.push("/#contact");
              } else {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }
            }}
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>

          <Button
            size="sm"
            className="bg-muted text-foreground hover:bg-muted/80 hidden gap-2 rounded-xl md:flex"
            onClick={() => setShowCVViewer(true)}
          >
            <FileText className="h-4 w-4" />
            View Resume
          </Button>
        </div>

        <CVViewerDialog open={showCVViewer} onOpenChange={setShowCVViewer} />
      </div>
    </TooltipProvider>
  );
};

export default NavItem;

interface CVViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVViewerDialog = ({ open, onOpenChange }: CVViewerDialogProps) => {
  const cvPath = "/Kent-Francis-Kalaw-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Kent-Francis-Kalaw-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="cv-preview-description" className="flex h-[95vh] w-full max-w-[95vw] flex-col p-0 md:h-[90vh] md:max-w-4xl [&>button]:hidden">
        <DialogHeader className="border-border shrink-0 border-b px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-sm font-semibold md:text-lg">
              My Resume
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="rounded-full bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-hidden">
          <iframe
            src={cvPath}
            className="h-full w-full border-0"
            title="CV Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
