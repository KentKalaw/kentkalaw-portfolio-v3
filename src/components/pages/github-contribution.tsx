"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, memo, useMemo } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/components/panel";
import { Github } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

const GithubContributionsCard = memo(function GithubContributionsCard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorScheme = useMemo(
    () => (theme === "dark" ? "dark" : "light"),
    [theme],
  );

  return (
    <Panel className="animate-fade-in animate-delay-500">
      <PanelHeader>
        <PanelTitle>
          <p className="text-muted-foreground text-base tracking-[0.8em] uppercase">
            Public GitHub Contributions
          </p>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex w-full justify-center md:[&_.react-activity-calendar__calendar]:h-auto md:[&_.react-activity-calendar__calendar]:w-full md:[&_.react-activity-calendar__scroll-container]:overflow-visible">
          {mounted && (
            <GitHubCalendar username="kentkalaw" colorScheme={colorScheme} />
          )}
        </div>
        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          My Public GitHub contributions heatmap. Private contributions are not
          shown.
        </p>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Updated in real-time.
        </p>
      </PanelContent>
    </Panel>
  );
});

export default GithubContributionsCard;
