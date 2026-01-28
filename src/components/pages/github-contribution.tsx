import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartLine } from "lucide-react"

export default function GithubContributionsCard() {
    return (
        <section className="mb-3 animate-fade-in animate-delay-800">
            <Card>
                <CardHeader>
                    <CardTitle className="font-mono flex items-center gap-2 text-base md:text-xl font-bold">
                        <ChartLine />
                        Public GitHub Contributions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <img
                        src="https://ghchart.rshah.org/kentkalaw"
                        alt="KentKalaw's GitHub contributions chart"
                        className="w-full max-w-xs md:max-w-xl rounded-lg"
                    />
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                        My Public GitHub contributions heatmap. Updated in real-time. Private contributions are not shown.
                    </p>
                </CardContent>
            </Card>
        </section>
    )
}