import React from "react";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-fit w-screen py-20 bg-[#151515] text-[#EEEEEE] flex items-center justify-center">
      <div className="flex items-center gap-10 flex-col">
        <div className="bg-white w-fit text-[#151515] px-4 py-1 rounded-full flex gap-2">
          <span>Bring your idea, Let the AI do the rest</span>
          <Sparkles strokeWidth={1} />
        </div>
        <div className="text-4xl font-bold max-w-3xl text-center">
          Unleash Your Creativity with AI-Powered Blogging
        </div>
        <div className="flex gap-6">
          <button className="bg-[#A91D3A] text-white px-4 py-2 rounded-lg">
            Get Started
          </button>
          <button className="hover:border-[1px] hover:border-white px-4 py-2 rounded-lg">Read Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
