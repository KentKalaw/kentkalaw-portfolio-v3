"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { MessageCircle, Trash2, Minus, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! 👋 I'm Kent's AI assistant. Feel free to ask me about his work, skills, projects, or anything else you'd like to know!",
};

export function ChatDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      loadChatHistory(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("chat_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Mark as unread when minimized and new message arrives
  useEffect(() => {
    if (isMinimized && messages.length > 1) {
      setHasUnread(true);
    }
  }, [messages, isMinimized]);

  const loadChatHistory = async (sid: string) => {
    try {
      const response = await fetch(`/api/chat?sessionId=${sid}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          const formattedMessages: Message[] = data.messages.map(
            (msg: { id: string; role: "user" | "assistant"; content: string }) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
            })
          );
          setMessages([WELCOME_MESSAGE, ...formattedMessages]);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const sendMessage = useCallback(
    async (content: string) => {
      console.log("sendMessage called with:", content, "sessionId:", sessionId);
      
      if (!sessionId) {
        console.error("No sessionId available!");
        const newId = uuidv4();
        localStorage.setItem("chat_session_id", newId);
        setSessionId(newId);
        return;
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content,
            sessionId,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        const assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: data.message,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error sending message:", error);
        
        let errorContent = "Sorry, I encountered an error. Please try again later or use the contact form to reach Kent directly.";
        
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorContent = "The request timed out. Please try again.";
          } else if (error.message.includes("busy")) {
            errorContent = "I'm a bit busy right now. Please try again in a few moments!";
          }
        }
        
        const errorMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: errorContent,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  const clearChat = () => {
    const newSessionId = uuidv4();
    localStorage.setItem("chat_session_id", newSessionId);
    setSessionId(newSessionId);
    setMessages([WELCOME_MESSAGE]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setHasUnread(false);
    setTimeout(scrollToBottom, 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        size="icon"
        className={cn(
          "fixed bottom-6 left-6 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-200 hover:scale-105",
          "animate-fade-in animate-delay-100"
        )}
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    );
  }
  if (isMinimized) {
    return (
      <Button
        onClick={handleRestore}
        size="icon"
        className={cn(
          "fixed bottom-6 left-6 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-200 hover:scale-105",
          "ring-2 ring-primary-foreground/30 ring-offset-2 ring-offset-background"
        )}
      >
        <div className="relative">
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
      </Button>
    );
  }
  return (
    <div
      className={cn(
        "fixed z-50",
        "inset-0",
        "md:inset-auto md:bottom-6 md:left-6",
        "md:w-[380px] md:h-[500px] md:max-h-[80vh]",
        "md:rounded-lg",
        "bg-background border shadow-2xl",
        "flex flex-col overflow-hidden",
        "animate-in slide-in-from-bottom-5 duration-200"
      )}
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 hover:bg-primary-foreground/20 md:hidden"
            title="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="relative">
            <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-primary-foreground/30">
              <Image
                src="/kentkalaw-v1.jpg"
                alt="Kent's AI Assistant"
                width={36}
                height={36}
                className="object-cover h-full w-full"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Kent&apos;s AI Assistant</h3>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs opacity-80">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-8 w-8 hover:bg-primary-foreground/20"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMinimize}
            className="h-8 w-8 hover:bg-primary-foreground/20 hidden md:flex"
            title="Minimize"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 hover:bg-primary-foreground/20 hidden md:flex"
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="flex flex-col">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 p-4">
              <div className="relative h-8 w-8 shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/kentkalaw-v1.jpg"
                  alt="Kent's AI Assistant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
