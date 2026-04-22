'use client';

import { useEffect } from 'react';
import { Shield, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { gymConfig } from '@/lib/gym-config';

export default function PrivacyPolicyPage() {


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

  const principles = [
    "Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.",
    "We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.",
    "We will only retain personal information as long as necessary for the fulfillment of those purposes.",
    "We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.",
    "Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.",
    "We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.",
    "We will make readily available to customers information about our policies and practices relating to the management of personal information.",
    "We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.",
  ];

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
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20 scale-in">
              <Shield className="w-5 h-5 text-white mr-2" />
              <span className="caption-lg text-white">Your Privacy Matters</span>
            </div>
            
            <h1 className="display-lg text-white mb-6 fade-in-up">
              Privacy Policy
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto mb-6 fade-in-up">
              {gymConfig.name} is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            </p>
            <div className="caption-md text-gray-400 fade-in-up">
              Effective Date: August 2025
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white section-container">
        <div className="content-width container-padding">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-12 slide-in-left">
              <p className="body-xl text-gray-700 leading-relaxed">
                Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
              </p>
            </div>

            {/* Principles list */}
            <div className="slide-in-left">
              <ul className="space-y-6">
                {principles.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 animate-on-scroll">
                    <span
                      className="mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ background: '#ED1707' }}
                    >
                      {index + 1}
                    </span>
                    <p className="body-md text-gray-700 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="mt-20 bg-gray-50 rounded-3xl p-8 scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="display-sm text-black mb-4">
                  Questions About Your Privacy?
                </h3>
                <p className="body-md text-gray-600 mb-6">
                  For any privacy-related questions or concerns, please contact us at:
                </p>
                <div className="space-y-2">
                  <p className="body-md text-black">
                    <strong>Email:</strong> {gymConfig.contact.email}
                  </p>
                  <p className="body-md text-black">
                    <strong>Address:</strong> {gymConfig.contact.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}