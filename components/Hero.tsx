'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';

export default function Hero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - mobile */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src="/hero-mobile.jpg"
          alt="CrossFit PMI gym"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/80 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/70"></div>
      </div>

      {/* Background Image - desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={gymConfig.assets.heroImage}
          alt="CrossFit PMI gym"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/80 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/90"></div>
      </div>
      
      <div className="relative z-20 text-center pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6 hero-animate" style={{ '--animation-delay': '0s' } as React.CSSProperties}>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>
              CrossFit Gym in Limerick
            </span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>

          {/* Main Headline */}
          <h1 className="display-lg sm:display-2xl text-white mb-8 hero-animate" style={{ '--animation-delay': '0.05s' } as React.CSSProperties}>
            Reach New Heights{' '}
            <span style={{ color: '#ED1707' }}>No Matter</span>{' '}Your Fitness Level
          </h1>

          {/* Subtitle */}
          {/* <p className="heading-xl text-white mb-8 max-w-4xl mx-auto hero-animate" style={{ '--animation-delay': '0.05s' } as React.CSSProperties}>
            Welcome to {gymConfig.name} - where results are built through community, consistency, and coaching.
          </p> */}

          {/* Subheading */}
          <div className="body-xl text-gray-300 mb-12 max-w-3xl mx-auto hero-animate" style={{ '--animation-delay': '0.1s' } as React.CSSProperties}>
            {gymConfig.description.split('\n').map((line, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>
                {line}
              </p>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 hero-animate" style={{ '--animation-delay': '0.2s' } as React.CSSProperties}>
            <Link href="/join">
              <Button variant="primary" size="lg">
                {gymConfig.hero.ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Reviews Section */}
          <div className="flex items-center justify-center space-x-6 hero-animate" style={{ '--animation-delay': '0.3s' } as React.CSSProperties}>
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-lg relative">
                <Image src="/people/man-gym.jpg" alt={`${gymConfig.displayName} member training at the gym`} fill className="object-cover" sizes="48px" />
              </div>
              <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-lg relative">
                <Image src="/people/woman.jpg" alt={`${gymConfig.displayName} member portrait`} fill className="object-cover" sizes="48px" />
              </div>
              <div className="w-12 h-12 rounded-full border-3 border-white overflow-hidden shadow-lg relative">
                <Image src="/people/woman-gym.jpg" alt={`${gymConfig.displayName} female member during workout`} fill className="object-cover" sizes="48px" />
              </div>
              <div className="w-12 h-12 bg-white border-3 border-white rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-black font-bold" />
              </div>
            </div>
            
            <div className="text-left">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-white fill-current drop-shadow-sm" />
                ))}
              </div>
              <span className="caption-lg text-gray-300">
                Growing Community
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}