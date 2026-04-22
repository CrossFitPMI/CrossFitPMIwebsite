'use client';

import { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrialForm from '@/components/TrialForm';
import { gymConfig } from '@/lib/gym-config';
import { WhatsAppIcon } from '@/components/WhatsAppChatButton';
import MapSection from '@/components/MapSection';

export default function ContactPage() {


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

  const handleClick = () => {
    // Always open WhatsApp regardless of device
    const whatsappNumber = gymConfig.contact.whatsapp.replace(/\s+/g, '').replace('+', '');
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };



  return (
    <div className="min-h-screen bg-white section-container">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black text-white relative overflow-hidden section-container">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="content-width container-padding">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 scale-in">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Get In Touch</span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>

            <h1 className="display-lg text-white mb-6 fade-in-up">
              We'd Love to Hear From You
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto fade-in-up">
              Have questions? Ready to get started? We’d love to hear from you! Reach out below or drop in for a chat.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding bg-white section-container">
        <div className="content-width container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Information */}
            <div className="slide-in-left">
              <h2 className="display-md text-black mb-8 fade-in-up">
                Visit Our Gym
              </h2>
              <p className="body-lg text-gray-600 mb-12 fade-in-up">
                Come see our state-of-the-art facility and meet our expert coaching team.
                We'd love to show you around and discuss how we can help you achieve your fitness goals.
              </p>

              <div className="space-y-8 slide-in-left">
                {/* Address */}
                <div className="flex items-start space-x-4 animate-on-scroll">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('contact-map');
                      if (el) {
                        const headerOffset = 80;
                        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in cursor-pointer hover:bg-black/90 transition-colors"
                    aria-label="Scroll to map"
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </button>
                  <div>
                    <h3 className="heading-lg text-black mb-2">Address</h3>
                    <p className="body-md text-gray-600">
                      {gymConfig.contact.address.street}<br />
                      {gymConfig.contact.address.city}, {gymConfig.contact.address.country} {gymConfig.contact.address.postcode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 animate-on-scroll">
                  <a
                    href={`tel:${gymConfig.contact.phone.replace(/\s+/g, '')}`}
                    aria-label={`Call ${gymConfig.contact.phone}`}
                    className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in hover:bg-black/90 transition-colors"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </a>
                  <div>
                    <h3 className="heading-lg text-black mb-2">Phone</h3>
                    <a
                      href={`tel:${gymConfig.contact.phone.replace(/\s+/g, '')}`}
                      className="body-md text-gray-600 hover:text-black transition-colors"
                    >
                      {gymConfig.contact.phone}
                    </a>
                    <p className="caption-md text-gray-500 mt-1">Call or text us anytime</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 animate-on-scroll">
                  <a
                    href={`mailto:${gymConfig.contact.email}`}
                    aria-label={`Email ${gymConfig.contact.email}`}
                    className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in hover:bg-black/90 transition-colors"
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </a>
                  <div>
                    <h3 className="heading-lg text-black mb-2">Email</h3>
                    <a
                      href={`mailto:${gymConfig.contact.email}`}
                      className="body-md text-gray-600 hover:text-black transition-colors break-words"
                    >
                      {gymConfig.contact.email}
                    </a>
                    <p className="caption-md text-gray-500 mt-1">We'll respond within 10 minutes</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4 animate-on-scroll">
                  <div onClick={handleClick} className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 scale-in cursor-pointer group">
                    <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h3 className="heading-lg text-black mb-2">WhatsApp</h3>
                    <p className="body-md text-gray-600">{gymConfig.contact.whatsapp}</p>
                    <p className="caption-md text-gray-500 mt-1">Quick questions? Message us!</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 animate-on-scroll">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-lg text-black mb-2">Opening Hours</h3>
                    <div className="body-md text-gray-600 space-y-1">
                      <p>Mon – Thu: {gymConfig.hours.detailed.Monday}</p>
                      <p>Friday: {gymConfig.hours.detailed.Friday}</p>
                      <p>Saturday: {gymConfig.hours.detailed.Saturday}</p>
                      <p>Sunday: {gymConfig.hours.detailed.Sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="slide-in-right h-full flex items-center justify-center">
              <div className="bg-gray-50 rounded-3xl p-8 scale-in w-full max-w-xl">
                <TrialForm
                  title="Contact Us"
                  description="Fill out the form below and we'll get back to you as soon as possible."
                  buttonText="Find out more"
                  theme="light"
                  size="default"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapSection />

      <Footer />
    </div>
  );
}