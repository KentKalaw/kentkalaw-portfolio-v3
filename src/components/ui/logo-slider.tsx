"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* =============================================================================
   LogoSlider Component
============================================================================= */

export interface LogoSliderProps {
  logos: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  showBlur?: boolean;
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export const LogoSlider = ({
  logos,
  speed = 60,
  direction = "left",
  showBlur = true,
  blurLayers = 8,
  blurIntensity = 1,
  className,
  pauseOnHover = false,
}: LogoSliderProps) => {
  return (
    <div
      className={cn("logo-slider w-full overflow-hidden relative", className)}
      style={
        {
          "--speed": speed,
          "--count": logos.length,
          "--blurs": blurLayers,
          "--blur": blurIntensity,
        } as React.CSSProperties
      }
    >
      <div
        className="logo-slider__container relative w-full min-h-[80px] flex items-center"
        data-direction={direction}
        data-pause-on-hover={pauseOnHover}
      >
        {/* Left Blur */}
        {showBlur && (
          <div className="logo-slider__blur logo-slider__blur--left absolute inset-y-0 left-0 z-10 pointer-events-none flex">
            {Array.from({ length: blurLayers }).map((_, i) => (
              <div
                key={`blur-left-${i}`}
                className="flex-1"
                style={{ "--blur-index": i } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Right Blur */}
        {showBlur && (
          <div className="logo-slider__blur logo-slider__blur--right absolute inset-y-0 right-0 z-10 pointer-events-none flex">
            {Array.from({ length: blurLayers }).map((_, i) => (
              <div
                key={`blur-right-${i}`}
                className="flex-1"
                style={{ "--blur-index": i } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Logo Track */}
        <ul className="logo-slider__track flex items-center h-full w-fit m-0 p-0 list-none whitespace-nowrap">
          {logos.map((logo, index) => (
            <li
              key={index}
              className="logo-slider__item flex items-center justify-center h-[70px] w-[110px] sm:w-[130px] lg:w-[150px] shrink-0"
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="[&>svg]:max-h-[36px] [&>svg]:w-auto [&>img]:max-h-[36px] [&>img]:w-auto [&>img]:object-contain [&>img]:grayscale hover:[&>img]:grayscale-0 transition-all duration-300">
                  {logo}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

LogoSlider.displayName = "LogoSlider";
export default LogoSlider;
