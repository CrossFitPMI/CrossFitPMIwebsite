'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Community from '@/components/Community';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import ValuesSection from '@/components/ValuesSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { gymConfig } from '@/lib/gym-config';
import Script from 'next/script';

export default function Home() {
  
  // Page-specific JSON-LD Schema
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${gymConfig.name} - ${gymConfig.tagline}`,
    description: gymConfig.description,
    url: gymConfig.urls.website,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: gymConfig.name,
      description: gymConfig.description,
      telephone: gymConfig.contact.phone,
      email: gymConfig.contact.email,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: gymConfig.urls.website,
        },
      ],
    },
  };
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
          
          // Add stagger animation to child elements with optimised timing
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

    // Enhanced smooth scroll behavior
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId || '' ) as HTMLElement;
        
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      observer.disconnect();
      smoothScrollLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <>
      <Script
        id="home-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <Community />
        <ReviewsMarquee />
        <FeaturesGrid />
        <ValuesSection />
        <FAQ />
      </main>
      <Footer/>
    </>
  );
}