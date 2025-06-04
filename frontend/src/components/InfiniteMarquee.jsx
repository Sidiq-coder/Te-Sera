import React from "react";
import Marquee from "react-fast-marquee";
import { FaRegCircleXmark } from "react-icons/fa6";


const InfiniteMarquee = () => {
  return (
    <Marquee 
      speed={50} 
      gradient={false} 
      className="py-4 bg-gray-100"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 text-4xl font-lora italic text-gray-700 inline-flex items-center">
          <span className="text-purple-500">te</span>sera  <FaRegCircleXmark className="ml-6 mx-auto w-10 h-10 text-white bg-[#A880FF] rounded-full " />
        </span>
      ))}
    </Marquee>
  );
};

export default InfiniteMarquee;