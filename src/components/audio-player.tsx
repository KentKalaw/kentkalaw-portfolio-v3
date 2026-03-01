"use client";

import { useRef, useState, useEffect } from "react";
import { PlayIcon, Square, ExternalLink } from "lucide-react";
import Link from "next/link";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AudioPlayerComponent = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const track = {
    title: "keshi - dream",
    src: "/music/keshi - dream.MP3",
  };

  const handleClick = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className="flex w-fit items-center gap-2 py-1">
      <div className="relative h-7 w-7">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth="3"
            className="text-primary"
          />
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            strokeLinecap="round"
            className="text-primary transition-[stroke-dashoffset] duration-200 ease-linear"
          />
        </svg>
        <button
          onClick={handleClick}
          className="bg-primary text-primary-foreground absolute inset-1 flex cursor-pointer items-center justify-center rounded-full"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Square className="h-2.5 w-2.5" />
          ) : (
            <PlayIcon className="h-2.5 w-2.5" />
          )}
        </button>
      </div>
      <span className="text-sm font-medium">{track.title}</span>
      <Link
        href="https://www.youtube.com/watch?v=M2_tjzmbwQY"
        target="_blank"
        className="text-muted-foreground mt-1 self-start text-sm underline"
      >
        <ExternalLink className="mb-2 inline h-3 w-3" />
      </Link>
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default AudioPlayerComponent;
