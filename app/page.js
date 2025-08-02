import React from 'react'
import Hero from '@/components/hero'
import { CarouselDemo } from '@/components/carousel'
import { AnimatedTestimonialsDemo } from '@/components/testimonials'
import { CardSpotlightDemo } from '@/components/hover-design'
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { DotBackgroundDemo } from '@/components/dot-background';

import { VortexDemo } from "@/components/call-to-action";
const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Hero Section */}
        <DotBackgroundDemo />
        {/* carousel */}
        <CarouselDemo />

        {/* Testimonials */}
        <div className="px-4 md:px-8 lg:px-0 pt-20 ">
          <CardSpotlight>
            <h2 className="text-2xl font-bold">What Our Users Say</h2>
            <AnimatedTestimonialsDemo />
          </CardSpotlight>
        </div>
        {/* Call to action */}
        <div className="">
          <VortexDemo />
        </div>
      </div>

    </>
  )
}

export default LandingPage