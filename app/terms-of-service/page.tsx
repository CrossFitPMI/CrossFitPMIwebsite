'use client';

import { useEffect } from 'react';
import { Users, CreditCard, Pause, Calendar, Shield, Award, Scale, FileText, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { gymConfig } from '@/lib/gym-config';

export default function TermsOfServicePage() {


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

  const sections = [
    {
      icon: Scale,
      title: "Terms",
      content: "By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law."
    },
    {
      icon: Shield,
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on CrossFit PMI's web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on CrossFit PMI's web site; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or \"mirror\" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by CrossFit PMI at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format."
    },
    {
      icon: FileText,
      title: "Disclaimer",
      content: "The materials on CrossFit PMI's web site are provided \"as is\". CrossFit PMI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, CrossFit PMI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site."
    },
    {
      icon: Award,
      title: "Limitations",
      content: "In no event shall CrossFit PMI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on CrossFit PMI's Internet site, even if CrossFit PMI or a CrossFit PMI authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you."
    },
    {
      icon: Users,
      title: "Revisions and Errata",
      content: "The materials appearing on CrossFit PMI's web site could include technical, typographical, or photographic errors. CrossFit PMI does not warrant that any of the materials on its web site are accurate, complete, or current. CrossFit PMI may make changes to the materials contained on its web site at any time without notice. CrossFit PMI does not, however, make any commitment to update the materials."
    },
    {
      icon: CreditCard,
      title: "Links",
      content: "CrossFit PMI has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CrossFit PMI of the site. Use of any such linked web site is at the user's own risk."
    },
    {
      icon: Calendar,
      title: "Site Terms of Use Modifications",
      content: "CrossFit PMI may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use."
    },
    {
      icon: Pause,
      title: "Governing Law",
      content: "Any claim relating to CrossFit PMI's web site shall be governed by the laws of the State of Ireland without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Web Site."
    },
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
              <Scale className="w-5 h-5 text-white mr-2" />
              <span className="caption-lg text-white">Terms & Conditions</span>
            </div>
            
            <h1 className="display-lg text-white mb-6 fade-in-up">
              Terms of Service
            </h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto mb-6 fade-in-up">
              These terms set out the conditions under which you may use the services, website, and facilities of {gymConfig.name}.
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
            <div className="mb-16 slide-in-left">
              <h2 className="display-sm text-black mb-4">Web Site Terms and Conditions of Use</h2>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="slide-in-left">
                  <div className="flex items-start space-x-4 mb-4 animate-on-scroll">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 scale-in">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="display-sm text-black">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="ml-16">
                    <p className="body-md text-gray-700 leading-relaxed animate-on-scroll">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-20 bg-gray-50 rounded-3xl p-8 scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="display-sm text-black mb-4">
                  Questions About These Terms?
                </h3>
                <p className="body-md text-gray-600 mb-6">
                  For any queries or support regarding these Terms, please contact:
                </p>
                <div className="space-y-2">
                  <p className="body-md text-black">
                    <strong>Email:</strong> {gymConfig.contact.email}
                  </p>
                  <p className="body-md text-black">
                    <strong>Phone:</strong> {gymConfig.contact.phone}
                  </p>
                  <p className="body-md text-black">
                    <strong>Address:</strong> {gymConfig.contact.address.full}
                  </p>
                  <p className="body-md text-black">
                    <strong>Website:</strong> {gymConfig.urls.website}
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