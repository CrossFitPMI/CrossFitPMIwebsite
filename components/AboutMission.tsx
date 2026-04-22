'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { gymConfig } from '@/lib/gym-config';

export default function AboutMission() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text side */}
          <div className="fade-in-up">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 shrink-0" style={{ background: '#ED1707' }} />
              <span
                className="caption-lg font-semibold uppercase tracking-widest"
                style={{ color: '#ED1707' }}
              >
                About CrossFit PMI
              </span>
            </div>

            <h2 className="display-sm font-extrabold text-white mb-8 leading-tight">
              Simply put, our mission is to help you{' '}
              <span style={{ color: '#ED1707' }}>"Change Your Life With Us."</span>
            </h2>

            <div className="space-y-5" style={{ color: 'var(--color-text-tertiary)' }}>
              <p className="body-lg">
                After spending time in our facility and with our team we want our members to walk
                out of our doors after a workout and feel like they are a better version of
                themselves.
              </p>
              <p className="body-lg">
                It isn't the scientific sum of calories, workouts, and weight that keeps our
                members returning. It is not the cutting-edge equipment and technology.{' '}
                <span className="text-white font-semibold">It is the people that count.</span>
              </p>
              <p className="body-lg">
                Our team cares about guiding and encouraging each and every member to obtain the
                goals they seek for themselves.
              </p>
              <p className="body-lg">
                Our members' goals are specific and if we can assist in that journey to realising
                their aspirations then we have truly helped them change their life.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
              {[
                { value: gymConfig.stats.members, label: 'Active Members' },
                { value: gymConfig.stats.rating, label: 'Google Rating' },
                { value: gymConfig.stats.yearsOfExperience, label: 'Years Coaching' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="display-sm font-extrabold" style={{ color: '#ED1707' }}>
                    {value}
                  </div>
                  <div className="caption-lg mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative fade-in-up">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src={gymConfig.assets.aboutUsImage}
                alt="CrossFit PMI training facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <div
              className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-4 shadow-2xl"
              style={{
                background: '#ED1707',
              }}
            >
              <div className="display-sm font-extrabold text-white leading-none">
                {gymConfig.stats.successRate}
              </div>
              <div className="caption-lg text-white/80 mt-1">Member Success Rate</div>
            </div>

            {/* Decorative border frame */}
            <div
              className="absolute -top-4 -right-4 w-full h-full rounded-3xl -z-10"
              style={{ border: '2px solid rgba(237,23,7,0.2)' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
