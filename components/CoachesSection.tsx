'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Award, X, ChevronRight } from 'lucide-react';
import { gymConfig } from '@/lib/gym-config';

type Coach = typeof gymConfig.team[number];

function CoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{ background: 'var(--color-bg-secondary)', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(237,23,7,0.15)', border: '1px solid rgba(237,23,7,0.3)' }}
          aria-label="Close"
        >
          <X size={18} style={{ color: '#ED1707' }} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr]">
          {/* Photo column */}
          <div className="relative sm:rounded-l-3xl overflow-hidden" style={{ minHeight: '320px' }}>
            <Image
              src={coach.image}
              alt={coach.name}
              fill
              className="object-cover object-top"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {/* Role badge on image */}
            <div className="absolute bottom-4 left-4">
              <span
                className="caption-md font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'rgba(237,23,7,0.9)', color: '#fff' }}
              >
                {coach.role}
              </span>
            </div>
          </div>

          {/* Content column */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h2 className="display-sm font-extrabold text-white mb-1">{coach.name}</h2>

              {/* Qualifications */}
              {coach.qualifications && coach.qualifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {coach.qualifications.map((q) => (
                    <div key={q} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(237,23,7,0.1)', border: '1px solid rgba(237,23,7,0.2)' }}>
                      <Award size={11} style={{ color: '#ED1707' }} />
                      <span className="caption-md font-medium" style={{ color: '#ED1707' }}>{q}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChevronRight size={14} style={{ color: '#ED1707' }} />
                <span className="caption-lg font-bold uppercase tracking-widest text-white">About</span>
              </div>
              <p className="body-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>{coach.bio}</p>
            </div>

            {/* Turning Point */}
            {coach.turningPoint && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight size={14} style={{ color: '#ED1707' }} />
                  <span className="caption-lg font-bold uppercase tracking-widest text-white">Turning Point</span>
                </div>
                <p className="body-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>{coach.turningPoint}</p>
              </div>
            )}

            {/* Passion */}
            {coach.passion && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight size={14} style={{ color: '#ED1707' }} />
                  <span className="caption-lg font-bold uppercase tracking-widest text-white">Motivation & Passion</span>
                </div>
                <p className="body-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>{coach.passion}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoachesSection() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const staggerEls = entry.target.querySelectorAll('.animate-on-scroll');
            staggerEls.forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in-up, .animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {selectedCoach && (
        <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14 fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>
                Meet the Team
              </span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            <h2 className="display-md font-extrabold text-white mb-4">
              A Team of Coaches That Get{' '}
              <span style={{ color: '#ED1707' }}>Results, Consistently</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-tertiary)' }}>
              Every coach at CrossFit PMI brings a unique background and personal story - united by
              one shared goal: helping you become the best version of yourself.
            </p>
          </div>

          {/* Coaches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymConfig.team.map((coach, index) => (
              <button
                key={coach.name}
                onClick={() => setSelectedCoach(coach)}
                className="group relative rounded-3xl overflow-hidden text-left fade-in-up animate-on-scroll cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED1707]"
                style={{ animationDelay: `${index * 80}ms` }}
                aria-label={`Read more about ${coach.name}`}
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={coach.image}
                    alt={`${coach.name} - ${coach.role} at CrossFit PMI`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Hover overlay - "Click to read more" hint */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                  >
                    <div
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm"
                      style={{ background: '#ED1707' }}
                    >
                      Read more
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Name / role - always visible at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
                >
                  <div className="mb-1">
                    <span
                      className="caption-md font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(237,23,7,0.15)', color: '#ED1707', border: '1px solid rgba(237,23,7,0.3)' }}
                    >
                      {coach.role}
                    </span>
                  </div>
                  <h3 className="heading-md font-bold text-white">{coach.name}</h3>
                </div>

                {/* Bottom red accent bar on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: '#ED1707' }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
