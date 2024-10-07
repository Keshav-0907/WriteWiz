import React from "react";
import { Sparkles } from "lucide-react";
import { UserContext } from "..//../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


const Hero = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="flex justify-center items-center h-full flex-col gap-10">
      <div className='text-center flex flex-col gap-3'>
        <div className='font-InstrumentSerif text-7xl'>
        Blog Better, Faster, and <br/> Smarter with AI by Your Side
        </div>
        <div className='text-gray-500 text-xl leading-relaxed'>
          Effortless Blogging, Inspired Writing
        </div>
      </div>
      <div className='flex gap-10'>
       {
          !user ? (
            <button className='bg-[#2663EA] text-white px-5 py-2 rounded-full'>
              Get Started
            </button>
          ) : (
            <Link to={'/profile'} className='bg-[#2663EA] text-white px-5 py-2 rounded-full'>
              Dashboard
            </Link>
          )
       }

        <button className='bg-white text-black px-5 py-2 rounded-full border-[1px]'>
          How it works
        </button>
      </div>
    </div>
  );
};

export default Hero;
