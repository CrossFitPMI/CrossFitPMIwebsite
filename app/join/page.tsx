'use client';

import { useEffect } from 'react';
import { CheckCircle, Users, Award, Zap, Target, Star, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrialForm from '@/components/TrialForm';
import { gymConfig } from '@/lib/gym-config';

const benefits = [
  {
    icon: Users,
    title: `Join Our Members`,
    description: 'Become part of a thriving community that supports and motivates each other'
  },
  {
    icon: Award,
    title: 'Expert Coaching',
    description: 'Train with certified coaches who have 10+ years of experience'
  },
  {
    icon: Zap,
    title: 'Proven Results',
    description: `${gymConfig.stats.successRate} of our members achieve their fitness goals within 90 days`
  },
  {
    icon: Target,
    title: 'Personalised Approach',
    description: 'Every workout is scalable to your fitness level and goals'
  },
  {
    icon: Heart,
    title: 'Holistic Wellness',
    description: 'Fitness, nutrition, and mental health support all in one place'
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Modern equipment and facilities designed for your success'
  }
];


export default function JoinPage() {

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



  return (
    <div className="min-h-screen bg-black text-white section-container">
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
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Join Us</span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            
            <h1 className="display-lg text-white mb-6 fade-in-up">
              Start Your Fitness Journey
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto mb-6 fade-in-up">
              Join our community of members who have transformed their lives at {gymConfig.name}. 
              Start your transformation journey today.
            </p>
            {/* <div className="flex items-center justify-center space-x-6 body-md fade-in-up">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No joining fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Satisfaction guarantee</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

       {/* Signup Form */}
       <section className="pb-20 section-container">
        <div className="content-width container-padding">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 scale-in">
              <TrialForm 
                title="Find Out How We Can Help"
                description="Fill out the form below and we'll contact you within 10 minutes to get you started"
                buttonText="Get Started Today"
                theme="dark"
                size="default"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-20 section-container">
        <div className="content-width container-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 fade-in-up">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Why Us</span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            <h2 className="display-md text-white mb-4 fade-in-up">
              Why Choose {gymConfig.displayName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 slide-in-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-on-scroll">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 scale-in">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Testimonials */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-right">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-on-scroll">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-green-400">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}