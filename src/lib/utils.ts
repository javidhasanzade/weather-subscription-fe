import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentHours(): number {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
}

export function convertTimeToDecimal(timeStr: string): number {
  const [time, period] = timeStr.split(" ");

  const timeParts = time.split(":");
  let hours = Number(timeParts[0]);
  let minutes = Number(timeParts[1]);
  let seconds = 0;

  if (timeParts.length > 2) {
    seconds = Number(timeParts[2]);
  }

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60 + seconds / 3600;
}

export const getTemperatureGradient = (temp: number): string => {
  // Very cold (below 0°C/32°F)
  if (temp < 0) {
    return "bg-gradient-to-b from-slate-900 via-slate-800/90 to-blue-950/80";
  }
  // Cold (0-10°C/32-50°F)
  else if (temp < 10) {
    return "bg-gradient-to-b from-slate-800 via-blue-900/80 to-blue-800/70";
  }
  // Cool (10-20°C/50-68°F)
  else if (temp < 20) {
    return "bg-gradient-to-b from-slate-700 via-cyan-800/70 to-sky-700/60";
  }
  // Warm (20-30°C/68-86°F)
  else if (temp < 30) {
    return "bg-gradient-to-b from-amber-700/90 via-amber-600/80 to-orange-500/70";
  }
  // Hot (30-40°C/86-104°F)
  else if (temp < 40) {
    return "bg-gradient-to-b from-orange-800/90 via-orange-700/80 to-amber-600/70";
  }
  // Very hot (above 40°C/104°F)
  else {
    return "bg-gradient-to-b from-red-900/90 via-red-800/80 to-rose-700/70";
  }
};
