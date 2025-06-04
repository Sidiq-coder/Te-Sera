import React, { useState } from 'react';
import { IoMdRemove, IoMdAdd } from "react-icons/io";


const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-black-200 last:border-b-0 bg-transparent">
      <button
        onClick={onToggle}
        className="w-full py-5 px-0 flex items-center justify-between text-left hover:bg-black-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-black-900 pr-4">
          {question}
        </span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <IoMdRemove className="h-5 w-5 text-black-500 transition-transform duration-200" />
          ) : (
            <IoMdAdd className="h-5 w-5 text-black-500 transition-transform duration-200" />
          )}
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-5 pr-8">
          <p className="text-black-700 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = ({ 
  title = "Frequently Asked Questions", 
  description = "Here are some of the most common questions and answers.",
  faqs = [],
  className = "",
  titleClassName = "",
  descriptionClassName = ""
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold text-black-900 mb-4 ${titleClassName}`}>
          {title}
        </h1>
        <p className={`text-black-600 text-lg leading-relaxed ${descriptionClassName}`}>
          {description}
        </p>
      </div>

      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};



export default FAQAccordion;