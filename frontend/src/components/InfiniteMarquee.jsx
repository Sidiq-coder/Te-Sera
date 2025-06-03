import React from "react";
import Marquee from "react-fast-marquee";

const InfiniteMarquee = () => {
  return (
    <Marquee 
      speed={50} 
      gradient={false} 
      className="py-4 bg-gray-100"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 text-4xl font-bold text-gray-700">
          <span className="text-purple-500">te</span>sera •
        </span>
      ))}
    </Marquee>
  );
};

export default InfiniteMarquee;