'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { gymConfig } from '@/lib/gym-config';

function ReviewCard({ name, review }: { name: string; review: string }) {
  return (
    <div className="review-card group relative flex-shrink-0 w-[340px] sm:w-[400px] p-6 mx-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[#ED1707]/30 hover:bg-white/[0.06]">
      <Quote
        className="absolute top-4 right-4 w-8 h-8 text-white/[0.06] group-hover:text-[#ED1707]/20 transition-colors duration-300"
        aria-hidden="true"
      />
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-[#ED1707] text-[#ED1707]"
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="body-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
        {review}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#ED1707]/15 flex items-center justify-center text-sm font-semibold text-[#ED1707]">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-gray-500">Google Review</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  const reviews = gymConfig.testimonials;
  const mid = Math.ceil(reviews.length / 2);
  const topRow = reviews.slice(0, mid);
  const bottomRow = reviews.slice(mid);

  // Triple items for seamless infinite loop
  const topItems = [...topRow, ...topRow, ...topRow];
  const botItems = [...bottomRow, ...bottomRow, ...bottomRow];

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Measure actual pixel width of one card set and set as CSS variable
  const measureAndSet = useCallback(() => {
    [
      { ref: row1Ref, count: topRow.length },
      { ref: row2Ref, count: bottomRow.length },
    ].forEach(({ ref, count }) => {
      const el = ref.current;
      if (!el) return;
      let setWidth = 0;
      for (let i = 0; i < count && i < el.children.length; i++) {
        const child = el.children[i] as HTMLElement;
        const style = getComputedStyle(child);
        setWidth +=
          child.offsetWidth +
          parseFloat(style.marginLeft) +
          parseFloat(style.marginRight);
      }
      el.style.setProperty('--slide-distance', `-${setWidth}px`);
    });
  }, [topRow.length, bottomRow.length]);

  useEffect(() => {
    measureAndSet();
    window.addEventListener('resize', measureAndSet);
    return () => window.removeEventListener('resize', measureAndSet);
  }, [measureAndSet]);

  return (
    <section className="py-16 md:py-24 bg-[#0f0f0f] overflow-hidden relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-[#0f0f0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-[#0f0f0f] to-transparent" />

      {/* Section heading */}
      <div className="content-width container-padding mb-12 md:mb-16 text-center relative z-20">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8" style={{ background: '#ED1707' }} />
          <span
            className="caption-lg font-semibold uppercase tracking-widest"
            style={{ color: '#ED1707' }}
          >
            Real Reviews
          </span>
          <div className="h-px w-8" style={{ background: '#ED1707' }} />
        </div>
        <h2 className="display-md text-white mb-4">
          What Our Members Say
        </h2>
        <p className="body-lg text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it - hear from the people who train with us every day.
        </p>
      </div>

      {/* Row 1 - scrolls left */}
      <div className="marquee-container mb-5">
        <div ref={row1Ref} className="marquee-track marquee-left">
          {topItems.map((t, i) => (
            <ReviewCard key={`top-${i}`} name={t.name} review={t.review} />
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="marquee-container">
        <div ref={row2Ref} className="marquee-track marquee-right">
          {botItems.map((t, i) => (
            <ReviewCard key={`bot-${i}`} name={t.name} review={t.review} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="content-width container-padding mt-12 text-center relative z-20">
        <a
          href="https://maps.app.goo.gl/vsC19MEhCF4P4cTH8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-[#ED1707]/40 hover:bg-white/[0.06] transition-all duration-300 text-sm font-medium"
        >
          Read all our Google reviews
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
