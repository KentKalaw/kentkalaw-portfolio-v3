"use client";

import { CircleSmall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  RotatingText,
  RotatingTextContainer,
} from "@/components/animate-ui/primitives/texts/rotating";
export default function Name() {
  return (
    <section className="animate-fade-in">
      <div className="border-edge flex flex-col items-center gap-4 border-x md:flex-row md:items-center md:gap-6">
        <div className="group screen-line-before screen-line-after relative h-40 w-40 rounded-full bg-zinc-300 p-1 shadow-xs dark:bg-zinc-800">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
            <Image
              src="/kentkalaw-v1.jpg"
              alt="Kent Kalaw"
              fill
              priority
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            />

            <Image
              src="/isagi-yoichi.jpg"
              alt="Isagi Yoichi"
              fill
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 md:w-auto">
          <div className="flex items-center justify-center gap-2 md:justify-between">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-bold md:text-2xl">
                <span className="font-mono">Kent Francis E. Kalaw</span>
              </h1>
              <svg
                viewBox="0 0 22 22"
                className="h-4 w-4 flex-shrink-0"
                aria-label="Verified user"
              >
                <path
                  fill="#1d9bf0"
                  d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-between">
            <div className="flex items-center gap-2">
              <p className="text-foreground/70 flex items-center gap-1 font-mono text-xs md:text-base">
                <svg
                  className="h-3 w-3 md:h-5 md:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Batangas City, Philippines
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:justify-between">
            <div className="flex items-center gap-2">
              <RotatingTextContainer
                text={[
                  "Web Development",
                  "Software Developer",
                  "Full-stack Developer",
                  "API Integration",
                  "AI Integration",
                  "Database Management",
                  "Version Control",
                ]}
                y={10}
                duration={3000}
                className="text-foreground/80 font-mono text-base md:text-lg"
              >
                <RotatingText />
              </RotatingTextContainer>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-center gap-2 md:justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1 font-mono text-xs font-medium text-green-500 dark:bg-green-950 dark:text-green-400"
              >
                <CircleSmall className="h-2 w-2 animate-pulse text-green-500" />
                AVAILABLE FOR WORK
              </Badge>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 font-mono text-xs font-medium text-blue-500 dark:bg-blue-950 dark:text-blue-400"
              >
                <CircleSmall className="h-2 w-2 animate-pulse text-blue-500" />
                FRESH GRADUATE
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
