"use client";

import { Button } from "@/components/ui/button";
import { Link2, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkButton() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-row screen-line-before gap-2 px-4 py-2 justify-start">
      <Button
        variant="outline"
        size="sm"
        className="shadow-none p-2"
        onClick={handleCopy}
        aria-label="Copy"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
