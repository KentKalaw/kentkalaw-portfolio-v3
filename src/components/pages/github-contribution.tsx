"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GitHubCalendar } from 'react-github-calendar';
import { ChartLine, Github } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useMemo} from "react";

const GithubContributionsCard = memo(function GithubContributionsCard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const colorScheme = useMemo(() => {
    return theme === 'dark' ? 'dark' : 'light';
  }, [theme]);
  
  return (
    <section className="animate-fade-in animate-delay-800 mb-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <Github />
            Public GitHub Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full md:[&_.react-activity-calendar\_\_scroll-container]:overflow-visible md:[&_.react-activity-calendar\_\_calendar]:w-full md:[&_.react-activity-calendar\_\_calendar]:h-auto">
            {mounted && (
              <GitHubCalendar  
                username="kentkalaw"
                colorScheme={colorScheme}
              />
            )}
          </div>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            My Public GitHub contributions heatmap.
            Private contributions are not shown.
          </p>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400"> Updated in real-time.</p>
          
        </CardContent>
      </Card>
    </section>
  );
});

export default GithubContributionsCard;
