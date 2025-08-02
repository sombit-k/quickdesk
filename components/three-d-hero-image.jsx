
"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import React from 'react'

import Image from "next/image";
const ThreeDHeroImage = () => {
    return (
        <>
            <CardContainer >
                <CardBody
                    className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl  border  ">

                    <CardItem translateZ="100" className="w-full ">
                        <Image
                            src="/hero-image.png"
                            alt="Hero Image"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </CardItem>
                </CardBody>
            </CardContainer>

        </>
    )
}

export default ThreeDHeroImage;