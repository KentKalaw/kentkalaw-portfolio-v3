import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/panel";
import { Facebook, Github, Linkedin } from "lucide-react";


export default function Footer() {
    return (
        <footer className="screen-line-before screen-line-after border-x border-edge max-w-5xl mx-auto">
  <div className="border-t border-edge px-4 py-8">
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kent Kalaw. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        <a
          href="https://linkedin.com/in/kentkalaw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>

        <a
          href="https://github.com/kentkalaw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>

        <a
          href="https://facebook.com/kentkalaw03"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
</footer>
    );

}