'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Users, X, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { gymConfig } from '@/lib/gym-config';

export default function ValuesSection() {
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

  const values = [
    {
      type: 'for',
      emoji: '💥',
      title: 'Effort Over Ego',
      description: 'We value high effort levels and personal progress. Your commitment matters more than your starting point.',
      icon: Zap
    },
    {
      type: 'for',
      emoji: '💪',
      title: 'Community First',
      description: 'We grow stronger together - celebrating every success and supporting each other every step of the way.',
      icon: Users
    },
    {
      type: 'against',
      emoji: '🚫',
      title: 'Quick Fixes',
      description: 'We don\'t believe in crash diets or shortcuts - just sustainable, lasting results.',
      icon: X
    },
    {
      type: 'against',
      emoji: '🚫',
      title: 'Intimidation',
      description: 'No judgment, no egos. Just real people chasing real results.',
      icon: Shield
    }
  ];

  return (
    <section className="section-padding bg-black text-white relative overflow-hidden section-container">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="content-width container-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 scale-in">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Our Values</span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          <h2 className="display-md text-white mb-4 fade-in-up">The 4 Pillars of {gymConfig.displayName}</h2>
        </div>

        {/* Split Values Section */}
        <div className="mb-16">
          <div className="relative rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* We Stand For */}
              <div className="bg-white/5 p-8 md:p-12 md:border-r border-white/10">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px w-10 bg-white/20"></div>
                  <span className="mx-4 caption-lg text-gray-300 tracking-widest uppercase">We Stand For</span>
                  <div className="h-px w-10 bg-white/20"></div>
                </div>

                <div className="space-y-8">
                  {values.filter(v => v.type === 'for').map((value, index) => (
                    <div key={index} className="flex items-start space-x-4 animate-on-scroll">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white/90" />
                      </div>
                      <div>
                        <div className="heading-lg text-white mb-1">{value.title}</div>
                        <p className="body-md text-gray-400">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* We Stand Against */}
              <div className="bg-white/5 p-8 md:p-12">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px w-10 bg-white/20"></div>
                  <span className="mx-4 caption-lg text-gray-300 tracking-widest uppercase">We Stand Against</span>
                  <div className="h-px w-10 bg-white/20"></div>
                </div>

                <div className="space-y-8">
                  {values.filter(v => v.type === 'against').map((value, index) => (
                    <div key={index} className="flex items-start space-x-4 animate-on-scroll">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-rose-400/10 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-6 h-6 text-white/90" />
                      </div>
                      <div>
                        <div className="heading-lg text-white mb-1">{value.title}</div>
                        <p className="body-md text-gray-400">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 fade-in-up">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center max-w-3xl mx-auto">
            <p className="body-lg text-gray-300 mb-6">
              Want to see how these pillars shape your training?
            </p>
            <Link href="/join">
              <Button variant="secondary" size="lg">Find Out More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
