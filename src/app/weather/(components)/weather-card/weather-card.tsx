"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { cn, getTemperatureGradient } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getWeatherData } from "@/actions/weather-data";
import { getUserData } from "@/actions/get-user-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { CardSvgs } from "./card-svgs";
import { WeatherCardInfo } from "./weather-card-info";

export const WeatherCard = () => {
  const weatherQuery = useQuery({
    queryKey: ["weather"],
    queryFn: getWeatherData,
  });
  const user_query = useQuery({ queryKey: ["user"], queryFn: getUserData });
  const { isLoading } = weatherQuery;

  if (isLoading || !weatherQuery.data) {
    return (
      <div className="w-full mt-20 flex p-4 max-w-[32rem]">
        <div className={cn("relative h-160 w-full")}>
          <div className="p-8 flex items-center gap-x-4">
            Loading <Loader2 className="animate-spin size-4" />
          </div>
        </div>
      </div>
    );
  }

  if (weatherQuery.data.message || weatherQuery.data.data === undefined) {
    return (
      <div className="w-full mt-20 flex p-4 max-w-[32rem]">
        <div className={cn("relative h-160 w-full rounded-2xl p-4 bg-white")}>
          <Alert variant="destructive" className="mb-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading data: {weatherQuery.data.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (
    user_query.data === undefined ||
    user_query.data.city === null ||
    user_query.data.country === null
  ) {
    return (
      <div className="w-full mt-20 flex p-4 max-w-[32rem]">
        <div className={cn("relative h-160 w-full rounded-2xl p-4 bg-white")}>
          <Alert variant="destructive" className="mb-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading user or it's values.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const { temperature } = weatherQuery.data.data;
  const gradientClass = getTemperatureGradient(temperature.current);

  return (
    <div className="w-full mt-20 flex p-4 max-w-[32rem]">
      <div
        className={cn(
          "relative h-160 w-full flex rounded-2xl overflow-hidden max-w-md shadow-lg shadow-black/20",
          gradientClass
        )}
      >
        <CardSvgs />
        <div className="absolute inset-0 flex flex-col items-start p-6 lg:p-8 space-y-4 text-shadow-md">
          <WeatherCardInfo
            weather_data={weatherQuery.data.data}
            user_data={user_query.data}
          />
        </div>
      </div>
    </div>
  );
};
