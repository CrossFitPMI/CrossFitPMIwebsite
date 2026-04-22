'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';
import { TrendingDown, Users, Zap, Target } from 'lucide-react';

export default function Community() {
  useEffect(() => {
    // Optimised intersection observer for element-level animations
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
    <section className="section-padding bg-white section-container">
      <div className="content-width container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6 scale-in">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Our Community</span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          
          <h2 className="display-md text-black mb-8 fade-in-up">
            Our community is what makes us special. And it's what will keep you going
          </h2>
          
          {/* Main intro text */}
          {/* <p className="body-xl text-gray-600 max-w-4xl mx-auto fade-in-up">
            {gymConfig.about.introText.replace('{gymName}', gymConfig.name)}
          </p> */}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="slide-in-left">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
              <Image
                src={gymConfig.assets.communityImage}
                alt={`${gymConfig.name} community`}
                fill
                className="object-cover rounded-3xl shadow-2xl scale-in"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="slide-in-right">
            <div className="space-y-6">
              <h3 className="heading-xl text-black fade-in-up">
                {gymConfig.about.journeyTitle}
              </h3>
              {gymConfig.about.journeyContent.map((paragraph, index) => (
                <p key={index} className="body-lg text-gray-600 fade-in-up">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* We Help Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-16 fade-in-up border border-gray-200">
          <div className="text-center mb-12">
            <h3 className="heading-xl text-black mb-6">We Help People Who:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Stuck in a Rut</h4>
                  <p className="body-sm text-gray-600">Feel stuck doing the same old workouts without seeing progress</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Need Guidance</h4>
                  <p className="body-sm text-gray-600">Want structure, accountability, and expert guidance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Feeling Intimidated</h4>
                  <p className="body-sm text-gray-600">Are tired of feeling unmotivated or intimidated in commercial gyms</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ready for Change</h4>
                  <p className="body-sm text-gray-600">Want to lose weight, build strength, and feel proud of their body again</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coaching Promise */}
        {/* <div className="relative">
          
          <div className="relative bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg max-w-5xl mx-auto fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="heading-xl text-black mb-6 fade-in-up">
                Expert Guidance Every Step of the Way
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6 fade-in-up">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Support</h4>
                  <p className="body-md text-gray-600">
                    Our coaches guide you from your first session to your first pull-up - so you'll never train alone or feel lost.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 fade-in-up">
                  <h4 className="font-semibold text-gray-900 mb-3">Enjoyable Process</h4>
                  <p className="body-md text-gray-600">
                    We'll teach you how to move well, stay consistent, and actually enjoy the process - no matter your starting point.
                  </p>
                </div>
              </div>
              
              <div className="fade-in-up">
                <Link href="/join">
                  <Button variant="primary" size="lg" className="px-8 py-4">
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
