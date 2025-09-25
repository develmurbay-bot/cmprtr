'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 4000); // Rotate every 4 seconds

      return () => clearInterval(interval);
    }
  }, [services.length]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis Anda
          </p>
        </div>

        {services.length > 0 && (
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-100 h-96 md:h-[500px]">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={service.id} className="w-full flex-shrink-0 relative">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.backgroundColor = '#f3f4f6';
                        target.style.display = 'flex';
                        target.style.alignItems = 'center';
                        target.style.justifyContent = 'center';
                        target.style.color = '#6b7280';
                        target.style.fontSize = '18px';
                        target.alt = service.title;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-center text-white p-8 max-w-4xl">
                        <h3 className="text-2xl md:text-4xl font-bold mb-4">
                          {service.title}
                        </h3>
                        <p className="text-lg md:text-xl mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <Button 
                          size="lg" 
                          className="bg-white text-black hover:bg-gray-100"
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Konsultasi Sekarang
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-gray-900 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Service Cards Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    index === currentIndex ? 'ring-2 ring-gray-900' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = '#f3f4f6';
                      target.style.display = 'flex';
                      target.style.alignItems = 'center';
                      target.style.justifyContent = 'center';
                      target.style.color = '#6b7280';
                      target.style.fontSize = '14px';
                      target.alt = service.title;
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description.length > 100 
                        ? `${service.description.substring(0, 100)}...` 
                        : service.description
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {services.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada layanan yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
