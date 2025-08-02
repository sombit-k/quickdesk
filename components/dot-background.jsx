import { cn } from "@/lib/utils";
import React from "react";
import Hero from "@/components/hero";
export function DotBackgroundDemo() {
  return (
    <div
      className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#737373_1px,transparent_1px)]", // darker dots for light mode
          "dark:[background-image:radial-gradient(#262626_1px,transparent_1px)]" // darker dots for dark mode
        )} />
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div
        className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        <Hero />
      </div>
    </div>
  );
}
