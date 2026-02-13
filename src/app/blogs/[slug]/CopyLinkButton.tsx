"use client";

import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useState } from "react";

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="shadow-none"
      onClick={handleCopy}
    >
      <Link2 className="mr-2 h-4 w-4" />
      {copied ? "Copied!" : "Copy Link"}
    </Button>
  );
}

export default CopyLinkButton;
