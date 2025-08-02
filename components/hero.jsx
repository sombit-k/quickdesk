"use client";

import React from 'react'
import { TypewriterEffectSmoothDemo } from '@/components/type-writer';
import ThreeDHeroImage from '@/components/three-d-hero-image';

const Hero = () => {
  
  
  return (
    <div className="pt-30 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 space-x-4 pb-10 ">
        <div className="h-50 md:h-100 w-1/2 md:pt-20">
        <TypewriterEffectSmoothDemo/>
        </div>
        <div className=" md:h-100 w-full md:w-1/2 py-10 mx-20 ">
          <ThreeDHeroImage />
        </div>
    </div>
  )
}

export default Hero