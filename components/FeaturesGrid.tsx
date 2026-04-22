'use client';

import { Calendar, Monitor, Cookie, Smartphone, Dumbbell, Salad } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Calendar,
    title: 'Weekend Classes',
    description: 'Train on your schedule with our weekend class options.',
  },
  {
    icon: Monitor,
    title: 'Virtual Programming',
    description: 'Access workouts and programming from anywhere, anytime.',
  },
  {
    icon: Cookie,
    title: 'Snacks for Purchase',
    description: 'Fuel up before or after your workout with on-site snacks.',
  },
  {
    icon: Smartphone,
    title: 'Members Only App',
    description: 'Track progress, book classes, and stay connected via our app.',
  },
  {
    icon: Dumbbell,
    title: 'Top of the Line Equipment',
    description: 'Train with premium, professional-grade equipment every session.',
  },
  {
    icon: Salad,
    title: 'Nutrition Programming',
    description: 'Optimise your results with expert-led nutrition guidance.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>What We Offer</span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          <h2 className="display-md font-extrabold text-white mb-4">
            Everything You Need To{' '}
            <span style={{ color: '#ED1707' }}>Crush Your Fitness Goals</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  'group relative rounded-2xl p-6 md:p-8 border transition-all duration-300',
                  'fade-in-up animate-on-scroll',
                  'hover:-translate-y-1'
                )}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-primary)',
                  animationDelay: `${index * 80}ms`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface-hover)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237, 23, 7, 0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(237, 23, 7, 0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-primary)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(237, 23, 7, 0.1)',
                    border: '1px solid rgba(237, 23, 7, 0.2)',
                  }}
                >
                  <Icon
                    size={26}
                    style={{ color: '#ED1707' }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text */}
                <h3 className="heading-md font-bold text-white mb-2">{feature.title}</h3>
                <p className="body-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                  {feature.description}
                </p>

                {/* Subtle accent line on hover */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: '#ED1707' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
