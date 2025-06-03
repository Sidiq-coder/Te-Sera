import { motion } from "framer-motion";
import { useState } from "react";

const FeatureCard = ({ id, highlight, title, subtitle, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-xl shadow-md cursor-pointer  group border-2 border-black" 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.02 : 1,
        backgroundColor: isHovered ? "#000000" : "#ffffff",
        borderColor: isHovered ? "#A880FF" : "#000000",
        boxShadow: isHovered
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        color: isHovered ? "#ffffff" : "inherit",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        borderColor: { duration: 0.15 }, 
      }}
    >
      <motion.div
        className="absolute -top-3 left-6 text-white text-sm font-semibold px-3 py-1 rounded-full z-10"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          backgroundColor: isHovered ? "#000000" : "#ffffff",
          border: isHovered ? "2px solid #A880FF" : "2px solid #A880FF",

          color: isHovered ? "#ffffff" : "#000000",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
      >
        {highlight}
      </motion.div>

      <motion.div
        className="absolute -left-4 -top-4 font-bold text-xl w-10 h-10 flex items-center justify-center rounded-full z-10 border-2"
        animate={{
          backgroundColor: isHovered ? "#000000" : "#ffffff",

          color: isHovered ? "#ffffff" : "#000000",
          borderColor: isHovered ? "#A880FF" : "#000000",
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      >
        {id}
      </motion.div>

      <div className="relative z-0">
        <h2 className="text-2xl font-bold mb-2 group-hover:text-white">
          {title}
        </h2>
        <motion.h3
          className="text-lg mb-4 italic"
          animate={{
            color: isHovered ? "#ffffff" : "#000000",
            x: isHovered ? 5 : 0,
          }}
        >
          {subtitle}
        </motion.h3>
        <p className="text-gray-600 group-hover:text-gray-300">{description}</p>
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-[#3b82f6] opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default FeatureCard;
