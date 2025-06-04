import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQAccordion from "../components/Faq";

const ContactHeader = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-26 pb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="flex-1 mb-8 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's get in touch
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback,
              or collaboration ideas — we're here to help.
            </p>
          </div>

          <div className="flex-shrink-0 text-right lg:mt-20">
            <div className="text-2xl font-Mixed italic text-black-900 mb-2">
              <span className="text-orange-500">te</span>sera
            </div>
            <p className="text-sm text-black-500 max-w-xs">
              Technology Sharing & Learning Area
            </p>
          </div>
        </div>
        <div className="mt-12 border-b border-black-200"></div>
      </div>
    </div>
  );
};

const Contact = () => {
  const sampleFAQs = [
    {
      question: "What is TeSera?",
      answer:
        "TechSera is a digital platform that combines learning, community, and content creation for programmers. It allows users to write articles, create programming tutorials, and interact through social-media-like features.",
    },
    {
      question: "Who can join TeSera?",
      answer:
        "Anyone with an interest in programming or technology—whether a beginner or professional—can join. TechSera supports learners, creators, mentors, and tech enthusiasts.",
    },
    {
      question: "Can I interact with other users?",
      answer:
        "Yes! TechSera offers interactive features like likes, comments, follow systems, and discussion threads—much like a social media platform. You can also join communities based on interests.",
    }
  ];

  return (
    <div>
      <Navbar />
      <ContactHeader />

      <FAQAccordion
        title="Got Question? We've Got Answer"
        description="Here are some of the top questions users ask about TeSera. From how to start learning, to posting content and interacting with the community — it's all covered here."
        faqs={sampleFAQs}
        className="px-4"
      />
      <Footer />
    </div>
  );
};

export default Contact;
