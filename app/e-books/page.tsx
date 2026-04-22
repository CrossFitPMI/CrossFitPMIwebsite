'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { BookOpen, ArrowRight, X, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';
import { useFormProtection } from '@/hooks/useFormProtection';
import RecaptchaWidget from '@/components/ui/RecaptchaWidget';
import { cn } from '@/lib/utils';

interface EBook {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
}

interface OrderFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

function OrderModal({
  book,
  onClose,
}: {
  book: EBook;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<OrderFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const protection = useFormProtection(30);

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitCheck = protection.canSubmit();
    if (!submitCheck.allowed) return;

    protection.handleSubmitStart();

    try {
      const response = await fetch(gymConfig.ebooksWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ebook_id: book.id,
          ebook_name: book.name,
          ebook_tag: book.tag,
          recaptchaToken: protection.recaptchaToken,
        }),
      });

      if (response.ok) {
        protection.handleSubmitSuccess();
        setIsSubmitted(true);
        setFormData({ first_name: '', last_name: '', email: '', phone: '' });
      } else {
        protection.handleSubmitError();
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('E-book order submission error:', error);
      protection.handleSubmitError();
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-300">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
            aria-label="Close order form"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {/* Book badge */}
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6" style={{ background: '#ED1707' }} />
              <span
                className="caption-lg font-semibold uppercase tracking-widest"
                style={{ color: '#ED1707' }}
              >
                Order E-Book
              </span>
              <div className="h-px w-6" style={{ background: '#ED1707' }} />
            </div>

            <h2 className="display-sm text-black mb-2">{book.name}</h2>
            <p className="body-sm text-gray-500 mb-8">
              Fill in your details below and we'll send you this e-book.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="heading-xl text-black mb-2">Request Received!</h3>
                <p className="body-md text-gray-600 mb-6">
                  Thanks! We'll send <strong>{book.name}</strong> to your inbox shortly.
                </p>
                <Button variant="primary" onClick={onClose}>
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="order_first_name"
                      className="block caption-lg text-black mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="order_first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="order_last_name"
                      className="block caption-lg text-black mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="order_last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order_email"
                    className="block caption-lg text-black mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="order_email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order_phone"
                    className="block caption-lg text-black mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="order_phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <RecaptchaWidget
                      onVerify={(token) => {
                        protection.setRecaptchaToken(token);
                        if (token) protection.clearError();
                      }}
                      theme="light"
                      size="normal"
                    />
                  </div>
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
                  size="default"
                  className="w-full"
                  disabled={protection.isSubmitting}
                >
                  {protection.isSubmitting ? 'Submitting...' : 'Request E-Book'}
                  {!protection.isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <p className="caption-md text-gray-500 text-center">
                  By submitting this form, you agree to receive communications from{' '}
                  {gymConfig.name}. You can unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

function EBookCard({
  book,
  onOrder,
}: {
  book: EBook;
  onOrder: (book: EBook) => void;
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group fade-in-up flex flex-col">
      {/* Book Cover Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <Image
          src={book.image}
          alt={book.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle red accent overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: '#ED1707' }}
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: '#ED1707' }}
          >
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h3 className="heading-md text-black leading-tight">{book.name}</h3>
        </div>

        <p className="body-sm text-gray-600 leading-relaxed flex-1 mb-6">
          {book.description}
        </p>

        <Button
          variant="primary"
          size="default"
          className="w-full"
          onClick={() => onOrder(book)}
        >
          Order Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function EBooksPage() {
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const staggerElements = entry.target.querySelectorAll('.animate-on-scroll');
          staggerElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .animate-on-scroll'
    );
    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

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
              <span
                className="caption-lg font-semibold uppercase tracking-widest"
                style={{ color: '#ED1707' }}
              >
                Free Resources
              </span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>

            <h1 className="display-lg text-white mb-6 fade-in-up">E-Books</h1>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto fade-in-up">
              This page serves as a hub for a wide range of resources and information aimed at
              enhancing your overall well-being. From valuable insights on maintaining a balanced
              diet, efficient at-home workouts, and injury prevention tips, to demystifying the
              world of strength training and clean eating, this page covers all aspects of a
              healthy lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* E-Books Grid Section */}
      <section className="section-padding bg-white section-container">
        <div className="content-width container-padding">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 fade-in-up">
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
              <span
                className="caption-lg font-semibold uppercase tracking-widest"
                style={{ color: '#ED1707' }}
              >
                Our Library
              </span>
              <div className="h-px w-8" style={{ background: '#ED1707' }} />
            </div>
            <h2 className="display-md text-black mb-4 fade-in-up">
              Knowledge at Your Fingertips
            </h2>
            <p className="body-lg text-gray-600 max-w-2xl mx-auto fade-in-up">
              Browse our collection of expert guides. Click <strong>Order Now</strong> on any
              e-book to receive it directly in your inbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gymConfig.ebooks.map((book) => (
              <EBookCard
                key={book.id}
                book={book}
                onOrder={(b) => setSelectedBook(b)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Order Modal */}
      {isMounted && selectedBook && (
        <OrderModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
