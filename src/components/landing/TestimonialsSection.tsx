'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  content: string;
  customer_photo: string;
  rating: number;
  status: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Auto-rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials?.length]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?status=approved&limit=50');
      const data = await response.json();
      
      if (data.success && data.testimonials) {
        // Randomly select 5 testimonials
        const shuffled = [...data.testimonials].sort(() => 0.5 - Math.random());
        const randomTestimonials = shuffled.slice(0, 5);
        setTestimonials(randomTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimoni Pelanggan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dengarkan langsung dari pelanggan yang telah merasakan kualitas layanan kami
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div className="relative">
            {/* Testimonial Carousel */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                          {/* Customer Photo */}
                          <div className="flex-shrink-0">
                            <img
                              src={testimonial.customer_photo || "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a175ccbe-294d-47c5-870d-4a8fd4cf0199.png"}
                              alt={testimonial.name}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-100"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a175ccbe-294d-47c5-870d-4a8fd4cf0199.png";
                              }}
                            />
                          </div>

                          {/* Testimonial Content */}
                          <div className="flex-1 text-center md:text-left">
                            {/* Quote Icon */}
                            <div className="text-blue-600 mb-4">
                              <svg className="w-8 h-8 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32">
                                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-2.2 1.8-4 4-4V8z"/>
                              </svg>
                            </div>

                            {/* Rating */}
                            <div className="flex justify-center md:justify-start mb-4">
                              {renderStars(testimonial.rating)}
                            </div>

                            {/* Testimonial Text */}
                            <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                              "{testimonial.content}"
                            </blockquote>

                            {/* Customer Name */}
                            <div className="font-semibold text-gray-900 text-lg">
                              {testimonial.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={() => goToSlide(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => goToSlide(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada testimoni</h3>
            <p className="text-gray-500">Testimoni pelanggan akan segera ditampilkan di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
