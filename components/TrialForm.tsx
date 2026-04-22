'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';
import RecaptchaWidget from '@/components/ui/RecaptchaWidget';
import { useFormProtection } from '@/hooks/useFormProtection';

interface TrialFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  theme?: 'light' | 'dark';
  size?: 'default' | 'lg';
}

export default function TrialForm({ 
  title = "Find Out How We Can Help",
  description = "Fill out the form below and we'll contact you within 10 minutes",
  buttonText = "Get Started Today",
  theme = 'dark',
  size = 'default'
}: TrialFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollYRef = useRef(0);
  const protection = useFormProtection(30); // 30 second cooldown

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent body scroll when modal is open (mobile-friendly)
  useEffect(() => {
    if (!isMounted) return;
    const body = document.body as HTMLBodyElement;
    if (showBookingModal) {
      // Save current scroll position
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      // Lock body scroll
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    } else {
      // Restore body scroll
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current);
      }
    }

    return () => {
      // Cleanup on unmount or toggle
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current);
      }
    };
  }, [showBookingModal, isMounted]);

  const getBookingUrl = () => {
    return gymConfig.urls.consultation;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitCheck = protection.canSubmit();
    if (!submitCheck.allowed) {
      return; // Error message will be shown in UI
    }

    protection.handleSubmitStart();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: protection.recaptchaToken
        })
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        protection.handleSubmitSuccess();
        setIsSubmitted(true);
        setShowBookingModal(true);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: ''
        });
        // Reset success message after 3 seconds but keep modal open
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error('Form submission failed:', response.statusText);
        protection.handleSubmitError();
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      protection.handleSubmitError();
      alert('There was an error submitting your form. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isLight = theme === 'light';
  const textColor = isLight ? 'text-black' : 'text-white';
  const inputBg = isLight ? 'bg-white' : 'bg-white/10';
  const inputBorder = isLight ? 'border-gray-300' : 'border-white/20';
  const inputFocus = isLight ? 'focus:border-black focus:ring-black/20' : 'focus:border-white focus:ring-white/20';
  const inputText = isLight ? 'text-black' : 'text-white';
  const inputPlaceholder = isLight ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const labelColor = isLight ? 'text-black' : 'text-white';
  const successTextColor = isLight ? 'text-green-600' : 'text-green-400';

  return (
    <>
      <div>
        <div className="text-center mb-8">
        <h3 className={`${isLight ? 'display-sm' : 'text-3xl font-bold'} ${textColor} mb-4 fade-in-up`}>
          {title}
        </h3>
        <p className={`${isLight ? 'body-md text-gray-600' : 'text-gray-400'} fade-in-up`}>
          {description}
        </p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
          <div className={`flex items-center justify-center gap-2 ${successTextColor}`}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Success! We'll contact you within 10 minutes.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className={`block ${isLight ? 'caption-lg' : 'text-sm font-medium'} ${labelColor} mb-2`}>
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${inputText} ${inputPlaceholder} ${inputFocus} focus:outline-none focus:ring-2 transition-all duration-300`}
              placeholder="First name"
            />
          </div>
          <div>
            <label htmlFor="last_name" className={`block ${isLight ? 'caption-lg' : 'text-sm font-medium'} ${labelColor} mb-2`}>
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${inputText} ${inputPlaceholder} ${inputFocus} focus:outline-none focus:ring-2 transition-all duration-300`}
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={`block ${isLight ? 'caption-lg' : 'text-sm font-medium'} ${labelColor} mb-2`}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${inputText} ${inputPlaceholder} ${inputFocus} focus:outline-none focus:ring-2 transition-all duration-300`}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className={`block ${isLight ? 'caption-lg' : 'text-sm font-medium'} ${labelColor} mb-2`}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl ${inputText} ${inputPlaceholder} ${inputFocus} focus:outline-none focus:ring-2 transition-all duration-300`}
            placeholder="Enter your phone number"
          />
        </div>

        {/* reCAPTCHA Widget with Error Display */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <RecaptchaWidget
              onVerify={(token) => {
                protection.setRecaptchaToken(token);
                if (token) protection.clearError(); // Clear error when verified
              }}
              theme={theme === 'light' ? 'light' : 'dark'}
              size="normal"
            />
          </div>
          
          {/* Professional Error Message */}
          {protection.errorMessage && (
            <div className="text-center">
              <p className="text-red-500 text-sm font-medium">
                {protection.errorMessage}
              </p>
            </div>
          )}
        </div>

        <Button 
          type="submit"
          variant="primary"
          size={size}
          className="w-full"
          disabled={protection.isSubmitting}
        >
          {protection.isSubmitting ? 'Submitting...' : buttonText}
          {!protection.isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className={`${isLight ? 'caption-md text-gray-500' : 'text-sm text-gray-400'}`}>
          By submitting this form, you agree to receive communications from {gymConfig.name}. 
          You can unsubscribe at any time.
        </p>
      </div>
    </div>

    {/* Booking Modal - Rendered using Portal to escape all containers */}
    {isMounted && showBookingModal && createPortal(
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md overscroll-contain"
          onClick={() => setShowBookingModal(false)}
        />
        
        {/* Modal */}
        <div className="fixed mt-12 inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] h-[80vh] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300 flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-6 right-6 z-10 p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Close booking calendar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="p-8 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <h3 className="heading-lg text-black mb-3">Book your consultation with our team</h3>
            </div>

            {/* Calendar iframe */}
            <div className="flex-1 overflow-auto">
              <iframe
                src={getBookingUrl()}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book your consultation"
                className="w-full h-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </>,
      document.body
    )}
  </>
  );
}