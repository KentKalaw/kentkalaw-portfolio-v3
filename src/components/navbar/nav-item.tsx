"use client";
import { Home, Mail, FileText, Download, X, User, BookOpen, Tickets, FolderCode } from "lucide-react";
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

const NavItem = () => {
  const [showCVViewer, setShowCVViewer] = useState(false);


const triggerScrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth",
    });
};

  return (
    <TooltipProvider>
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-3 py-2 shadow-lg backdrop-blur-xl md:px-6 md:py-3">
      <div className="flex items-center gap-2 md:gap-4">
        <Tooltip>
  <TooltipTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:h-9 md:w-9"
      onClick={triggerScrollToTop}
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
      className="h-8 w-8 rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:h-9 md:w-9"
      onClick={() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
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
      className="h-8 w-8 rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:h-9 md:w-9"
      onClick={() => {
        window.location.href = "/blogs";
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
      className="h-8 w-8 rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:h-9 md:w-9"
      onClick={() => {
        window.location.href = "/certifications";
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
      className="h-8 w-8 rounded-xl text-white/70 hover:bg-white/10 hover:text-white md:h-9 md:w-9"
      onClick={() => {
        window.location.href = "/projects";
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
          className="rounded-xl bg-white/10 text-white hover:bg-white/20 md:hidden"
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
          className="rounded-xl bg-white/10 text-white hover:bg-white/20 md:hidden"
          onClick={() => setShowCVViewer(true)}
        >
          <FileText className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          className="hidden gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20 md:flex"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Mail className="h-4 w-4" />
          Contact Me
        </Button>

        <Button
          size="sm"
          className="hidden gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20 md:flex"
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
      <DialogContent className="flex h-[95vh] w-full max-w-[95vw] flex-col p-0 md:h-[90vh] md:max-w-4xl [&>button]:hidden">
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
