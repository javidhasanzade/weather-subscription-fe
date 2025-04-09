"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence } from "motion/react";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "@/actions/weather-data";
import { MovingBall } from "./moving-ball";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { convertTimeToDecimal, getCurrentHours } from "@/lib/utils";

export const SunsetSunrise = () => {
  const query = useQuery({ queryKey: ["weather"], queryFn: getWeatherData });
  const [currentTime, setCurrentTime] = useState(getCurrentHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentHours());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (query.isLoading || !query.data) {
    return (
      <div className="mt-20 flex p-4 relative w-full">
        <Skeleton className="relative h-60 w-full flex items-start">
          <div className="p-8 flex items-center gap-x-4">
            Loading... <Loader2 className="animate-spin size-4" />
          </div>
        </Skeleton>
      </div>
    );
  }

  if (query.data.message || query.data.data === undefined) {
    return (
      <div className="mt-20 flex p-4 relative w-full">
        <div className="relative h-60 w-full flex items-start bg-white rounded-2xl p-4">
          <Alert variant="destructive" className="mb-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading data: {query.data.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const { sunset, sunrise } = query.data.data;
  const sunsetTime = convertTimeToDecimal(sunset);
  const sunriseTime = convertTimeToDecimal(sunrise);

  return (
    <AnimatePresence>
      <div className="mt-20 flex p-4 relative w-full">
        <div
          className="relative h-60 w-full flex rounded-2xl overflow-hidden 
        bg-gradient-to-b from-[#1a365d] to-[#2d3748]
        shadow-lg shadow-black/20"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,50 Q 50,0 100,50"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <MovingBall hours={sunsetTime} peak={12}>
            <span className="text-xs text-white">Sunset</span>
            <Image src="/moon.svg" alt="moon" width={50} height={50} />
            <span className="text-xs text-white w-16">{sunset}</span>
          </MovingBall>
          <MovingBall hours={sunriseTime} peak={12}>
            <span className="text-xs text-white">Sunrise</span>
            <Image src="/sun.png" alt="sun" width={50} height={50} />
            <span className="text-xs text-white w-16">{sunrise}</span>
          </MovingBall>
          <MovingBall
            hours={currentTime}
            className="bg-neutral-200 opacity-75 backdrop-blur-sm"
            peak={sunriseTime}
          ></MovingBall>
        </div>
      </div>
    </AnimatePresence>
  );
};
