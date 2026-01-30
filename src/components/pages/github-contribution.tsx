import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartLine } from "lucide-react";

export default function GithubContributionsCard() {
  return (
    <section className="animate-fade-in animate-delay-800 mb-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <ChartLine />
            Public GitHub Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img
            src="https://ghchart.rshah.org/kentkalaw"
            alt="KentKalaw's GitHub contributions chart"
            className="w-full max-w-xs rounded-lg md:max-w-xl"
          />
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            My Public GitHub contributions heatmap. Updated in real-time.
            Private contributions are not shown.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
