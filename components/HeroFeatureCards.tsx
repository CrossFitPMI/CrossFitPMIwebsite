'use client';

import { ShieldCheck, TrendingUp, Shuffle } from 'lucide-react';

const cards = [
  {
    icon: ShieldCheck,
    title: 'Expert Guidance',
    description: 'Our certified coaching staff will ensure you train safely, efficiently, and with purpose every session.',
  },
  {
    icon: TrendingUp,
    title: 'Reach New Heights',
    description: 'No matter where you start, you will be pushed to become a better version of yourself - every single day.',
  },
  {
    icon: Shuffle,
    title: 'Varied Workouts',
    description: 'You will never do the same workout twice. We keep things fresh so you stay challenged and never bored.',
  },
];

interface HeroFeatureCardsProps {
  className?: string;
}

export default function HeroFeatureCards({ className = '' }: HeroFeatureCardsProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      {cards.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="group flex flex-col gap-4 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,23,7,0.4)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(237,23,7,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{
              background: 'rgba(237,23,7,0.15)',
              border: '1px solid rgba(237,23,7,0.25)',
            }}
          >
            <Icon size={22} style={{ color: '#ED1707' }} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="heading-md font-bold text-white mb-1">{title}</h3>
            <p className="body-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
