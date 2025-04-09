import { cn } from "@/lib/utils";
import { useMotionValue, useTransform, motion, animate } from "motion/react";
import React, { useEffect } from "react";

interface MovingBallProps {
  hours: number; // The current hour (0-24)
  children?: React.ReactNode; // Optional children prop
  className?: string; // Optional className prop for styling
  peak: number; // The peak hour (0-24) for the sun's position
  duration?: number; // Optional animation duration in seconds
}

export const MovingBall = ({
  hours,
  children,
  className,
  peak,
  duration = 1,
}: MovingBallProps) => {
  const sunPosition = useMotionValue(hours);
  const sunPositionInterpolation = useMotionValue(Math.abs(hours - 24));

  const left = useTransform(
    sunPosition,
    [0, 24],
    ["calc(0% - 0rem)", "calc(100% - 3rem)"]
  );
  const bottom = useTransform(
    sunPosition,
    [0, peak, 24],
    ["calc(12% - 1rem)", "calc(50% - 1.5rem)", "calc(4% + 1rem)"]
  );

  useEffect(() => {
    animate(sunPosition, hours, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: duration,
    });
    animate(sunPositionInterpolation, Math.abs(hours - 6), {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      duration: duration,
    });
  }, [hours]);

  return (
    <motion.div
      className={cn(
        "absolute h-12 w-12 rounded-full flex items-center justify-center flex-col text-center",
        className
      )}
      style={{ left, bottom }}
    >
      {children}
    </motion.div>
  );
};
