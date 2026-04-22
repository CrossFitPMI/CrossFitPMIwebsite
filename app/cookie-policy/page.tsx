'use client';

import { useEffect } from 'react';
import { Cookie, Settings, Eye, Shield, BarChart3, Target, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { gymConfig } from '@/lib/gym-config';

export default function CookiePolicyPage() {


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

  const cookieTypes = [
    {
      icon: Settings,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: [
        "Session management and user authentication",
        "Shopping cart functionality",
        "Security and fraud prevention",
        "Website functionality and navigation"
      ],
      duration: "Session or up to 1 year",
      canDisable: false
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Google Analytics - website traffic and user behavior",
        "Page views and session duration",
        "Popular content and user journeys",
        "Device and browser information"
      ],
      duration: "Up to 2 years",
      canDisable: true
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      description: "These cookies are used to deliver relevant advertisements and track marketing campaigns.",
      examples: [
        "Facebook Pixel - ad targeting and conversion tracking",
        "Google Ads - remarketing and campaign optimisation",
        "Social media integration",
        "Personalised content delivery"
      ],
      duration: "Up to 1 year",
      canDisable: true
    },
    {
      icon: Eye,
      title: "Functional Cookies",
      description: "These cookies enhance your experience by remembering your preferences.",
      examples: [
        "Language preferences",
        "Location settings",
        "Theme and display preferences",
        "Form auto-fill information"
      ],
      duration: "Up to 1 year",
      canDisable: true
    }
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
              <Cookie className="w-5 h-5 text-white mr-2" />
              <span className="caption-lg text-white">Cookie Information</span>
            </div>
            
            <h1 className="display-lg text-white mb-6 fade-in-up">
              Cookie Policy
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto mb-6 fade-in-up">
              Learn about how {gymConfig.name} uses cookies to enhance your browsing experience and provide better services.
            </p>
            <div className="caption-md text-gray-400 fade-in-up">
              Last Updated: August 2025
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white section-container">
        <div className="content-width container-padding">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-16 slide-in-left">
              <h2 className="display-md text-black mb-6">What Are Cookies?</h2>
              <p className="body-xl text-gray-700 leading-relaxed mb-6">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and improving our services.
              </p>
              <p className="body-lg text-gray-600 leading-relaxed">
                This Cookie Policy explains what cookies we use, why we use them, and how you can manage your cookie preferences.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="mb-16">
              <h2 className="display-md text-black mb-12 text-center fade-in-up">Types of Cookies We Use</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cookieTypes.map((type, index) => (
                  <div key={index} className="bg-gray-50 rounded-3xl p-8 slide-in-left">
                    <div className="flex items-start space-x-4 mb-6 animate-on-scroll">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="heading-xl text-black mb-3">{type.title}</h3>
                        <p className="body-md text-gray-600 mb-4">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 animate-on-scroll">
                      <div>
                        <h4 className="font-semibold text-black mb-2">Examples:</h4>
                        <ul className="space-y-1">
                          {type.examples.map((example, exampleIndex) => (
                            <li key={exampleIndex} className="caption-lg text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="caption-lg font-semibold text-black">Duration:</span>
                          <span className="caption-md text-gray-600">{type.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="caption-lg font-semibold text-black">Can be disabled:</span>
                          <span className={`caption-md font-semibold ${type.canDisable ? 'text-green-600' : 'text-red-600'}`}>
                            {type.canDisable ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-16 slide-in-left">
              <div className="flex items-start space-x-4 mb-6 animate-on-scroll">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="display-sm text-black mb-6">How We Use Cookies</h2>
                </div>
              </div>
              <div className="ml-16">
                <ul className="space-y-4">
                  {[
                    "To improve website performance and user experience",
                    "To remember your preferences and settings",
                    "To analyze website traffic and user behavior",
                    "To deliver relevant content and advertisements",
                    "To measure the effectiveness of our marketing campaigns",
                    "To provide social media features and integrations"
                  ].map((item, index) => (
                    <li key={index} className="body-md text-gray-700 leading-relaxed animate-on-scroll">
                      <div className="flex items-start">
                        <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-16 slide-in-left">
              <div className="flex items-start space-x-4 mb-6 animate-on-scroll">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="display-sm text-black mb-6">Third-Party Cookies</h2>
                </div>
              </div>
              <div className="ml-16">
                <p className="body-md text-gray-700 leading-relaxed mb-6 animate-on-scroll">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6 animate-on-scroll">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-black mb-3">Analytics & Performance</h4>
                      <ul className="space-y-2">
                        <li className="caption-lg text-gray-600">• Google Analytics</li>
                        <li className="caption-lg text-gray-600">• Google Tag Manager</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-3">Marketing & Social</h4>
                      <ul className="space-y-2">
                        <li className="caption-lg text-gray-600">• Facebook Pixel</li>
                        <li className="caption-lg text-gray-600">• Instagram Embedding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-16 slide-in-left">
              <div className="flex items-start space-x-4 mb-6 animate-on-scroll">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="display-sm text-black mb-6">Managing Your Cookie Preferences</h2>
                </div>
              </div>
              <div className="ml-16">
                <p className="body-md text-gray-700 leading-relaxed mb-6 animate-on-scroll">
                  You have several options for managing cookies:
                </p>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6 animate-on-scroll">
                    <h4 className="font-semibold text-black mb-3">Browser Settings</h4>
                    <p className="caption-lg text-gray-600 mb-3">
                      Most browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="space-y-1">
                      <li className="caption-md text-gray-600">• Block all cookies</li>
                      <li className="caption-md text-gray-600">• Block third-party cookies only</li>
                      <li className="caption-md text-gray-600">• Delete existing cookies</li>
                      <li className="caption-md text-gray-600">• Set cookies to expire when you close your browser</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 animate-on-scroll">
                    <h4 className="font-semibold text-black mb-3">Opt-Out Links</h4>
                    <p className="caption-lg text-gray-600 mb-3">
                      You can opt out of specific tracking services:
                    </p>
                    <ul className="space-y-1">
                      <li className="caption-md text-gray-600">• Google Analytics: <span className="text-blue-600">tools.google.com/dlpage/gaoptout</span></li>
                      <li className="caption-md text-gray-600">• Facebook: Adjust your ad preferences in your Facebook account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-20 bg-gray-50 rounded-3xl p-8 scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="display-sm text-black mb-4">
                  Questions About Cookies?
                </h3>
                <p className="body-md text-gray-600 mb-6">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="body-md text-black">
                    <strong>Email:</strong> {gymConfig.contact.email}
                  </p>
                  <p className="body-md text-black">
                    <strong>Address:</strong> {gymConfig.contact.address.full}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="caption-md text-gray-500">
                    This Cookie Policy was last updated in August 2025. We may update this policy from time to time to reflect changes in our practices or applicable laws.
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
