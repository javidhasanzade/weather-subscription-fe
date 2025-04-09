import React from "react";

import { CustomTextHeading } from "./custom-text-heading";
import { WeatherInfoBadge } from "./weather-info-badge";
import { Droplet, Gauge, Wind } from "lucide-react";
import { WeatherCardInfoProps } from "@/types/types";
import { WeatherDegrees } from "./weather-degrees";

export const WeatherCardInfo = ({
  weather_data,
  user_data,
}: WeatherCardInfoProps) => {
  const { weatherDescription, temperature, windSpeed, humidity, pressure } =
    weather_data;
  const { city, country } = user_data;

  return (
    <>
      <div>
        <h4 className="text-2xl font-bold text-white">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </h4>
        <h4 className="text-4xl font-bold text-white leading-7">
          {country}, {city}
        </h4>
        <div className="h-[1px] w-full bg-white mt-3.5 rounded-full" />
        <p className="text-lg text-white space-x-2">
          <span className="text-neutral-100 font-light">Today</span>
          <span>
            {new Date()
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, ".")}
          </span>
        </p>
      </div>

      <div className="flex flex-row w-full mb-0">
        <div className="flex-1 flex flex-col space-y-4 items-start justify-start">
          <WeatherDegrees temperature={temperature} />
          <CustomTextHeading>It's</CustomTextHeading>
        </div>
        <div className="flex w-full items-end justify-end flex-col h-[10.875rem]">
          <WeatherInfoBadge
            icon={<Wind className="size-4" />}
            name="Wind"
            value={windSpeed.toString()}
            suffix="km/h"
          />
          <WeatherInfoBadge
            icon={<Droplet className="size-4" />}
            name="Humidity"
            value={humidity.toString()}
            suffix="%"
          />
          <WeatherInfoBadge
            icon={<Gauge className="size-4" />}
            name="Pressure"
            value={pressure.toString()}
            suffix="hPa"
          />
        </div>
      </div>
      <CustomTextHeading className="-mt-0.5">
        {weatherDescription.charAt(0).toUpperCase() +
          weatherDescription.slice(1)}
        <br />
        Outside
      </CustomTextHeading>
    </>
  );
};
