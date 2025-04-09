import React from "react";
import { WeatherDegreesProps } from "@/types/types";
import { ArrowDown, ArrowUp } from "lucide-react";

export const WeatherDegrees = ({ temperature }: WeatherDegreesProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-shadow-md w-full px-4 pb-4">
      <h1 className="text-5xl lg:text-7xl font-bold text-white">
        {temperature.current}°C
      </h1>
      <div className="mt-2 flex items-center w-42 justify-between text-sm text-white backdrop-blur-3xl bg-black/20 px-4 py-1.5 rounded-full">
        <p className="flex items-center">
          <ArrowUp className="size-3 mr-1" />
          {temperature.max}°C
        </p>
        <p className="flex items-center">
          <ArrowDown className="size-3 mr-1" />
          {temperature.min}°C
        </p>
      </div>
    </div>
  );
};
