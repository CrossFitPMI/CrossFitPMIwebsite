'use client';

import { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { gymConfig } from '@/lib/gym-config';

export default function MapSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const staggerEls = entry.target.querySelectorAll('.animate-on-scroll');
            staggerEls.forEach((el, i) => {
              setTimeout(() => el.classList.add('is-visible'), i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.fade-in-up, .slide-in-left, .scale-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-6 fade-in-up">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>
              Find Us
            </span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          <h2 className="display-md text-black mb-4 fade-in-up">
            Come Train With Us
          </h2>
          <p className="body-xl text-gray-600 max-w-3xl mx-auto fade-in-up">
            10 minute walk from the city centre and just a very short distance to the Motorway.
          </p>
        </div>

        {/* Map embed */}
        <div className="rounded-3xl overflow-hidden shadow-lg scale-in">
          {gymConfig.mapEmbedUrl ? (
            <iframe
              src={gymConfig.mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${gymConfig.name} Location Map`}
              className="w-full"
            />
          ) : (
            <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="display-sm text-gray-600 mb-2">Interactive Map</h3>
                <p className="body-md text-gray-500">Map will be available soon for this location</p>
              </div>
            </div>
          )}
        </div>

        {/* Info row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-left">
          <div className="text-center animate-on-scroll">
            <h3 className="heading-xl text-black mb-3">Address</h3>
            <p className="body-md text-gray-600">
              {gymConfig.contact.address.street}<br />
              {gymConfig.contact.address.city}, {gymConfig.contact.address.postcode}
            </p>
          </div>
          <div className="text-center animate-on-scroll">
            <h3 className="heading-xl text-black mb-3">Contact</h3>
            <p className="body-md text-gray-600">
              Phone: {gymConfig.contact.phone}<br />
              Email: {gymConfig.contact.email}
            </p>
          </div>
          <div className="text-center animate-on-scroll">
            <h3 className="heading-xl text-black mb-3">Getting Here</h3>
            <p className="body-md text-gray-600">
              10 min walk from city centre<br />
              Short distance to the Motorway
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
