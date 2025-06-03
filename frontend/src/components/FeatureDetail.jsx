import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProgressSteps = ({ steps, title }) => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const lineVariants = {
    hidden: { width: "0%" },
    visible: (i) => ({
      width: i === null ? "0%" : `${(i / (steps.length - 0.5)) * 100}%`,
      transition: { duration: 0.3, ease: "easeInOut" },
    }),
  };

  const stepVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#fff",
      border: "2px solid #000",
      color: "#000",
    },
    active: {
      scale: 1.2,
      backgroundColor: "#C084FC",
      border: "2px solid #C084FC",
      color: "#fff",
      transition: { duration: 0.2 },
    },
  };

  const getProgressLineStyle = () => {
    return {
      left: "calc(50px + 24px)",
      right: "calc(50px + 24px)",
      width: "calc(100% - 100px - 48px)",
    };
  };

  const isIconActive = (currentIndex) => {
    return hoveredStep !== null && currentIndex <= hoveredStep;
  };

  const getTooltipPosition = (index, totalSteps) => {
    const isFirst = index === 0;
    const isLast = index === totalSteps - 1;
    
    if (isFirst) {
      return "left-0";
    } else if (isLast) {
      return "right-0";
    } else {
      return "left-1/2 transform -translate-x-1/2";
    }
  };

  return (
    <div className="my-10">
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-medium text-purple-500 mb-8 text-left"
        >
          {title}
        </motion.h3>
      )}

      <div className="relative">
        <div
          className="absolute h-0.5 bg-gray-200 top-6"
          style={getProgressLineStyle()}
        />

        <motion.div
          className="absolute h-0.5 bg-purple-400 top-6 origin-left"
          style={{ left: "calc(50px + 24px)" }}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          custom={hoveredStep}
        />

        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-xl cursor-pointer"
                variants={stepVariants}
                initial="inactive"
                animate={isIconActive(index) ? "active" : "inactive"}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                whileHover={{ scale: 1.1 }}
              >
                {React.cloneElement(step.icon || <span>{index + 1}</span>, {
                  className: `transition-colors duration-200 ${
                    isIconActive(index) ? "text-white" : "text-black-900"
                  }`,
                })}
              </motion.div>

              <motion.div
                className="text-center relative min-h-[80px] flex flex-col justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <span
                  className={`text-sm font-medium max-w-[200px] block transition-colors duration-200 mb-2 ${
                    isIconActive(index) ? "text-purple-500" : "text-black-600"
                  }`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredStep === index ? 1 : 0,
                      height: hoveredStep === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-black-500 leading-relaxed break-words hyphens-auto text-center max-w-[200px] mx-auto px-2">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureList = ({ features }) => (
  <ul className="space-y-4">
    {features.map((feature, index) => (
      <motion.li
        key={index}
        className="flex items-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <span className="text-purple-400 mr-3">•</span>
        <span className="text-black-600">{feature}</span>
      </motion.li>
    ))}
  </ul>
);

const FeatureDetail = ({
  number,
  title,
  description,
  features = [],
  steps = [],
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-sm mb-10"
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-2">
          <motion.span
            className="text-7xl font-bold text-purple-400 mt-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {number}
          </motion.span>
          <div className="flex-1">
            <motion.h2
              className="text-4xl font-medium text-purple-400"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {children && (
        <motion.div
          className="text-black-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      )}

      {features.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-medium text-purple-400 mb-4">
            Additional Features:
          </h3>
          <FeatureList features={features} />
        </motion.div>
      )}

      {steps.length > 0 && <ProgressSteps steps={steps} title={steps[0]?.title} />}
    </motion.div>
  );
};

FeatureDetail.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      description: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  children: PropTypes.node,
};

export default FeatureDetail;