import React, { useState } from 'react';

// SVG Icon for carousel arrows
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CategoryCrousel = () => {
    const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Search Engine Optimization",
    "Graphic Designer",
    "Data Scientist",
    "Project Manager",
    "UI/UX Designer"
  ];

  // State to manage the current view of the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // How many items to show at once
  const slideBy = 1;
    const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + slideBy, categories.length - itemsPerPage));
  };
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - slideBy, 0));
  };
  return (
    // Main container with a dark background
    <div className="bg-slate-900 min-h-20 font-sans text-white">
      {/* Category Carousel Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4">
                {/* Left Arrow */}
                <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeftIcon />
                </button>

                {/* Carousel Viewport */}
                <div className="w-full max-w-3xl overflow-hidden">
                    {/* Inner container that slides */}
                    <div 
                        className="flex space-x-4 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                    >
                        {categories.map((category, index) => (
                            <button 
                                key={index} 
                                className="flex-shrink-0 w-1/4 capitalize px-5 py-2 text-sm font-medium text-gray-300 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white transition-colors duration-300"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button 
                    onClick={handleNext}
                    disabled={currentIndex >= categories.length - itemsPerPage}
                    className="p-2 rounded-full bg-slate-800 border border-slate-700 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRightIcon/>
                </button>
            </div>
        </div>
      </div>

    </div>
  );
}

export default CategoryCrousel