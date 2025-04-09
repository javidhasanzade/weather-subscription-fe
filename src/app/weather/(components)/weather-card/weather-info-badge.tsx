import React from "react";
import { Badge } from "@/components/ui/badge";

interface WeatherInfoBadgeProps {
  icon: React.ReactNode;
  name: string;
  value: string;
  suffix?: string;
}

export const WeatherInfoBadge = ({
  icon,
  name,
  value,
  suffix,
}: WeatherInfoBadgeProps) => {
  return (
    <div className="flex flex-col items-end justify-center space-y-1 py-1 pl-1">
      <Badge className="bg-white/20 text-white backdrop-blur-3xl px-2.5 py-1 rounded-full flex items-center shadow-sm ">
        <span>{icon}</span>
        {name}
      </Badge>
      <p className="text-sm text-neutral-200 font-normal mr-1 text-shadow-sm">
        {value} {suffix}
      </p>
    </div>
  );
};
