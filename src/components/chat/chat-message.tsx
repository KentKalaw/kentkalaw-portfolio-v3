"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
      ) : (
        <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden">
          <Image
            src="/kentkalaw-v1.jpg"
            alt="Kent's AI Assistant"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
