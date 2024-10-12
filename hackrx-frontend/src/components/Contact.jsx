import React from "react";
import Section from "./Section";
import { curve } from "../assets";
import Button from "./Button";
import { GradientLight } from "./design/Features";
import { Gradient } from "./design/Services";
// import { BackgroundCircles, BottomLine } from "./design/Hero";




export default function Contact() {
  return (
    <Section className="relative pt-[10rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings>

      <div className="relative flex flex-col items-center justify-center min-h-screen  text-white py-20">
        <Gradient/>
        

        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/path-to-your-image.png" // Update with the correct path to the image
            alt="Background"
            className="w-full h-full object-cover blur-lg opacity-30"
          />
        </div>

        {/* Contact Content */}
        <div className="text-center">

          <h1 className="h1 mb-6 ">
            {/* Explore the Possibilities of&nbsp;AI&nbsp;Chatting with { } */}
            Let's Connect and Elevate Your &nbsp;
          
            <br></br>
            <span className="inline-block relative bg-gradient-text bg-clip-text text-transparent">
            AI Experience{" "}
              <img
                src={curve}
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-100 xl:-mt-1 scale-y-50 "
                width={504}
                height={10}
                alt="Curve"
              />
            </span>
            {/* &nbsp;with AI */}
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-3 lg:mb-8  ">
          Have questions or need support? Our team is ready to help you harness the power of AURA.ai and unlock endless possibilities.
          </p>

          {/* Button */}
          <Button white>
            Get in Touch
          </Button>
        </div>

        <div class="absolute top-1/2 left-1/2 w-[46.5rem] h-[46.5rem] border border-n-2/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"><div class="absolute top-1/2 left-1/2 w-[39.25rem] h-[39.25rem] border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div><div class="absolute top-1/2 left-1/2 w-[30.625rem] h-[30.625rem] border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div><div class="absolute top-1/2 left-1/2 w-[21.5rem] h-[21.5rem] border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div><div class="absolute top-1/2 left-1/2 w-[13.75rem] h-[13.75rem] border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div></div>
      </div>

    </Section>
  );
}
