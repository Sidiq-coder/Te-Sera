import React from "react";
import FeatureCard from "./FeatureCard.jsx";

const FeatureShow = () => {
  const features = [
    {
      id: 1,
      title: "Community Posts",
      subtitle: "Where Ideas Spark and Developers Talk",
      description: "Share your thoughts, spark conversations, and connect with fellow developers through dynamic post threads.",
      highlight: "Express & Engage",
    },
    {
      id: 2,
      title: "Tech Articles",
      subtitle: "Code Your Knowledge. Share Your Voice.",
      description: "Publish long-form articles, tutorials, and case studies to build knowledge and share expertise.",
      highlight: "Write & Inspire",
    },
    {
      id: 3,
      title: "Interactive Courses",
      subtitle: "Learn. Practice. Grow.",
      description: "Explore bite-sized courses made by developers — complete with challenges, modules, and progress tracking.",
      highlight: "Learn & Level Up",
    },
    {
      id: 4,
      title: "Developer Communities",
      subtitle: "Find Your Circle. Build Together.",
      description: "Discover niche tech communities, collaborate on ideas, and grow together in focused developer groups.",
      highlight: "Join & Collaborate",
    },
  ];

  return (
    <section className="max-w-6xl mt-12 mx-auto px-4 py-16">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight font-sans antialiased">
      Discover Our Core Features
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-normal">
      All-in-one learning, sharing, and community platform for developers and tech enthusiasts.
    </p>
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureShow;