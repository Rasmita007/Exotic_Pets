'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faChevronLeft, faChevronRight, faQuoteLeft);

interface Testimonial {
    name: string;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Rahul Vaidya',
        text: 'I always take my dogs to their vets as they are more experienced and trustworthy.',
    },
    {
        name: 'Rashi Gupta',
        text: 'I bought a hamster from them for my little brother and they guided me very well during and after the purchase.',
    },
    {
        name: 'Anjali Sharma',
        text: 'The staff is incredibly knowledgeable and helped me choose the perfect food for my picky cat.',
    },
    {
        name: 'Suresh Menon',
        text: 'Great selection of toys and accessories. My parrot loves the new climbing rope I got from here!',
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/Fish2.png")',
                    backgroundAttachment: 'fixed',
                    zIndex: -1,
                }}
            />

            <div className="relative py-16 flex flex-col items-center">
                <h2 className="text-3xl font-semibold text-white text-center mb-8">
                    Customer Testimonials
                </h2>
                <div className="container mx-auto flex flex-col items-center text-center relative">
                    <div className="relative w-full max-w-[90%] sm:max-w-[500px] min-h-[150px] flex flex-col justify-center p-6 bg-white/20 backdrop-blur-md text-white rounded-lg">
                        <FontAwesomeIcon
                            icon="quote-left"
                            className="absolute top-5 left-0 text-green-300 text-2xl"
                        />
                        <p className="text-white">{testimonials[currentIndex].text}</p>
                        <p className="font-semibold mt-2 text-gray-200">- {testimonials[currentIndex].name}</p>
                    </div>

                    <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-[-60px] top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
                        aria-label="Previous Testimonial"
                    >
                        <FontAwesomeIcon icon="chevron-left" className="text-gray-600" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-[-60px] top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
                        aria-label="Next Testimonial"
                    >
                        <FontAwesomeIcon icon="chevron-right" className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;