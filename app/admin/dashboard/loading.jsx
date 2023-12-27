"use client";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Simulating a loading process
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  console.log(progress);
  return (
    <div className="   ">
      <div role="" className="  ">
        <div className="h-1 bg-primary" style={{ width: `${progress}%` }}></div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
