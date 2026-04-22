'use client';

import Image from 'next/image';
import HeroFeatureCards from '@/components/HeroFeatureCards';
import { gymConfig } from '@/lib/gym-config';

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - mobile */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src={gymConfig.assets.aboutImageMobile}
          alt="CrossFit PMI coaches and members training"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/80 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/90" />
      </div>

      {/* Background Image - desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={gymConfig.assets.aboutImage}
          alt="CrossFit PMI coaches and members training"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/80 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative z-20 text-center pt-40 pb-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>
              About CrossFit PMI
            </span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>

          {/* Headline */}
          <h1 className="display-lg font-extrabold text-white mb-8 leading-tight">
            Our Mission is to{' '}
            <span style={{ color: '#ED1707' }}>Help You Succeed</span>
          </h1>

          {/* Sub-copy */}
          <p className="body-xl text-gray-300 max-w-3xl mx-auto mb-14">
            A coaching-led gym in Limerick dedicated to helping people at every fitness level
            build consistent habits, gain strength, and become the best version of themselves.
          </p>

          {/* Feature cards reused from hero */}
          <HeroFeatureCards />
        </div>
      </div>
    </section>
  );
}
