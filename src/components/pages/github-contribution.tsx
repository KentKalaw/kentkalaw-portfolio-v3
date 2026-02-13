"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, memo, useMemo } from "react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/components/panel";
import { Github } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

const GithubContributionsCard = memo(function GithubContributionsCard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorScheme = useMemo(() => (theme === "dark" ? "dark" : "light"), [theme]);

  return (
      <Panel className="animate-fade-in animate-delay-500">
        <PanelHeader>
          <PanelTitle>
            <p className="text-base tracking-[0.8em] uppercase text-muted-foreground">
          Public GitHub Contributions
        </p>
          </PanelTitle>
        </PanelHeader>

        <PanelContent>
          <div className="w-full md:[&_.react-activity-calendar__scroll-container]:overflow-visible md:[&_.react-activity-calendar__calendar]:w-full md:[&_.react-activity-calendar__calendar]:h-auto flex justify-center">
            {mounted && (
              <GitHubCalendar
                username="kentkalaw"
                colorScheme={colorScheme}
              />
            )}
          </div>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            My Public GitHub contributions heatmap. Private contributions are not shown.
          </p>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Updated in real-time.
          </p>
        </PanelContent>
      </Panel>
  );
});

export default GithubContributionsCard;
