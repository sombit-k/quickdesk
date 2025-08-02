import React from "react";
import { Vortex } from "@/components/ui/vortex";

export function VortexDemo() {
  return (
    <div
      className="w-full mx-0 rounded-md my-20  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Get started now!  
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Sign up for our weekly newsletter,or try our product now!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Signup for newsletter
          </button>
          <button className="px-4 py-2  text-white ">Try now for free</button>
        </div>
      </Vortex>
    </div>
  );
}
