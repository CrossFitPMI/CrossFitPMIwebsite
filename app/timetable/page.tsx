'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { gymConfig } from '@/lib/gym-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TimetablePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Optimized intersection observer for element-level animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Add stagger animation to child elements
          const staggerElements = entry.target.querySelectorAll('.animate-on-scroll');
          staggerElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 150);
          });

          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .animate-on-scroll');
    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white section-container">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black text-white relative overflow-hidden section-container">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="content-width container-padding">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 scale-in">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Class Schedule</span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            
            <h1 className="display-lg text-white mb-6 fade-in-up">
              Timetable
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto fade-in-up">
              Book your classes and plan your training schedule. All classes are designed to be scalable for every fitness level - from complete beginners to experienced athletes.
            </p>
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="section-padding bg-white section-container">
        <div className="content-width container-padding">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 fade-in-up">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Book a Class</span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            <h2 className="display-md text-black mb-8 fade-in-up">
              Live Class Schedule
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto fade-in-up">
              Click on any class to book your session. All classes are coached and scalable to your fitness level.
            </p>
          </div>

          {/* Timetable Iframe */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg scale-in">
            <div style={{ height: '800px', position: 'relative' }}>
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="body-md text-gray-600">Loading timetable...</p>
                  </div>
                </div>
              )}

              {/* Iframe */}
              <iframe
                src={gymConfig.timetable.embedUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 0,
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
                onLoad={handleIframeLoad}
                title="E1 CrossFit Class Timetable"
                allowFullScreen
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gray-50 rounded-3xl p-8 fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="display-sm text-black mb-4">
                Need Help Booking?
              </h3>
              <p className="body-md text-gray-600 mb-6">
                New to booking classes? Contact us and we'll help you get started with your first session.
              </p>
              <div className="space-y-2">
                <p className="body-md text-black">
                  <strong>Email:</strong> {gymConfig.contact.email}
                </p>
                <p className="body-md text-black">
                  <strong>Phone:</strong> {gymConfig.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
