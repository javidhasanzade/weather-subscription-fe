import React from "react";

export const CardSvgs = () => {
  return (
    <>
      <svg
        className="absolute top-0 right-0 w-full h-full pointer-events-none "
        viewBox="0 0 448 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M448 100 C300 200, 150 0, 0 100"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-pulse animation-duration-[15s]"
        />
        <path
          d="M448 150 C300 250, 100 50, 0 150"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="1"
          strokeDasharray="6 4"
          className="animate-pulse animation-duration-[20s]"
        />
      </svg>
    </>
  );
};
