import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r h-svh flex justify-center items-center from-primary to-indigo-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl mb-8">
          Discover the latest news, articles, and insights from our experts.
        </p>
        <button className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
