"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { useEffect, useState } from "react";
import { Mail, ChevronRight, FileUser, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function Name() {
  const [showCVViewer, setShowCVViewer] = useState(false);

  return (
    <section className="animate-fade-in mb-8">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="group relative h-40 w-40 overflow-hidden rounded-lg">
          <Image
            src="/kentkalaw-v1.jpg"
            alt="Kent Kalaw"
            width={160}
            height={160}
            loading="eager"
            priority
            className="h-full w-full rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-0"
          />

          <Image
            src="/isagi-yoichi.jpg"
            alt="Isagi Yoichi"
            width={160}
            height={160}
            className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-bold md:text-2xl">
                <span className="md:hidden">Kent Kalaw</span>
                <span className="hidden md:inline">Kent Francis E. Kalaw</span>
              </h1>
              <svg
                viewBox="0 0 22 22"
                className="h-4 w-4 flex-shrink-0"
                aria-label="Verified user"
              >
                <path
                  fill="#1d9bf0"
                  d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                />
              </svg>
            </div>
            <ThemeSwitch />
          </div>
          <p className="text-foreground/70 flex items-center gap-1 text-xs md:text-sm">
            <svg
              className="h-3 w-3 md:h-3.5 md:w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Batangas City, Philippines
          </p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-foreground/80 text-[13px] font-medium md:text-base">
              Software Developer <span className="text-gray-400">/</span>{" "}
              Full-stack Developer
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              className="h-8 w-full font-sans transition duration-300 hover:-translate-y-0 sm:w-auto sm:hover:-translate-y-[2px]"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="h-8 w-full font-sans transition duration-300 hover:-translate-y-0 sm:w-auto sm:hover:-translate-y-[2px]"
              onClick={() => setShowCVViewer(true)}
            >
              <FileUser className="mr-2 h-4 w-4" />
              View Resume
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <CVViewerDialog open={showCVViewer} onOpenChange={setShowCVViewer} />
      </div>
    </section>
  );
}

interface CVViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CVViewerDialog = ({ open, onOpenChange }: CVViewerDialogProps) => {
  const cvPath = "/Kent Francis Kalaw Resume - CV.pdf";

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
