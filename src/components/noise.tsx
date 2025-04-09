import { cn } from "@/lib/utils";
import React from "react";

interface NoiseProps {
  className?: string;
}

export const Noise = ({ className }: NoiseProps) => {
  return (
    <div
      className={cn(
        `absolute top-0 left-0 z-[01] w-full h-full pointer-events-none mix-blend-overlay
        bg-[url(https://cal.com/_next/image?url=%2Fhome%2Fnoice.png&w=256&q=75)]
        opacity-40
        before:content-none before:absolute before:w-full before:h-full before:bg-repeat before:opacity-40
        before:bg-[url(https://cal.com/_next/image?url=%2Fhome%2Fnoice.png&w=256&q=75)]`,
        className
      )}
    />
  );
};
