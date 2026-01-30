"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Facebook,
  ExternalLink,
  Link,
  Mail,
} from "lucide-react";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/kentkalaw",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kentkalaw",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/kentkalaw03",
    icon: Facebook,
  },
  {
    name: "Email",
    url: "mailto:kentfranciskalaw@gmail.com",
    icon: Mail,
  },
];

export default function Socials() {
  return (
    <section className="animate-fade-in animate-delay-600 mb-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <Link />
            Socials
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2.75">
          {socials.map(social => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-muted/50 flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-muted-foreground group-hover:text-foreground h-5 w-5 transition-colors" />
                  <span className="text-sm font-medium">{social.name}</span>
                </div>
                <ExternalLink className="text-muted-foreground h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
