'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Check, CheckCircle, Dumbbell, Heart, Trophy, Target, Zap, Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';
import { useFormProtection } from '@/hooks/useFormProtection';
import RecaptchaWidget from '@/components/ui/RecaptchaWidget';

const programs = [
  {
    id: 'sweat',
    name: 'Sweat',
    cta: { label: 'Get Pricing', href: 'sweat', target: '_sweat_modal' },
    tagline: 'CrossFit-Style Training for Every Fitness Level',
    image: '/programs/sweat.jpg',
    icon: Dumbbell,
    accentColor: 'bg-orange-500',
    description: [
      'Programmed with CrossFit-style movements, we\'ve taken out the Olympic-lifting and the high skill Gymnastics so that any fitness level can join us in this class. There are no prescribed weights, so you can dial up or down the load as heavy or light as you need.',
      'We realise some athletes participate in sports or activities where lifting heavy weights do not translate to their needs, or others who may have prior injuries that just don\'t allow them to do so. We also realise there are many athletes no longer seeing results with their current Bootcamp, spin, or fitness class and want to try something new. We\'ve created SWEAT keeping those ideas in mind.',
      'This program utilises functional movements. These movements have analogs in nature and do a great job at doing a great deal of work quickly. We will squat, push, pull, jump, run, press, and throw - as opposed to bicep curls and crunches - taking a slower, more enduring approach designed to build the broadest, general, inclusive fitness possible.',
      'Workouts can be adjusted in weight, intensity, and certain mechanics in order to scale to the experience and fitness levels of any individual, be it a total fitness beginner or a gym expert.',
    ],
    whatToExpect: 'A certified coach will guide you through warming up, followed by movement instruction and demonstration for the workout. The Coach will supervise and correct any movement performed by you during the workout. We scale each exercise to your fitness level, so you get the maximum workout every time.',
    highlights: [
      'No Olympic lifting or high-skill gymnastics',
      'No prescribed weights - fully scalable',
      'Certified coach guidance every session',
      'Squat, push, pull, jump, run & more',
      'Perfect for athletes with prior injuries',
      'Maximum workout for every fitness level',
    ],
  },
  {
    id: 'hyrox',
    name: 'Hyrox',
    cta: { label: 'Book a Class', href: 'calendar', target: '_modal' },
    tagline: 'The Sport of Fitness Racing - In Limerick',
    image: '/programs/hyrox.jpeg',
    icon: Trophy,
    accentColor: 'bg-blue-500',
    description: [
      'Our HYROX Classes will prepare you for the sport of Fitness Racing. HYROX combines both running & functional workout stations, where participants run 1km, followed by 1 functional workout station, repeated eight times.',
      'Each race is hosted indoors in expansive exhibition halls, creating an immersive and electrifying race where your spectators can support you from the very beginning to the very end. This race format remains consistent across the globe, enabling global leaderboards & a cumulative World Championships at the end of each race season.',
      'Accommodating both professional athletes and everyday fitness enthusiasts looking to take their training to the next level, HYROX is the sport for everybody.',
    ],
    benefits: 'HYROX is a unique blend of running and functional fitness that builds full-body strength, endurance, and mental resilience. The mix of steady running and challenging workout stations improves your cardiovascular fitness, boosts power and stamina, and helps you develop real-world functional strength. It\'s suitable for all levels, highly measurable, and a great way to stay motivated by training for a structured, race-style event.',
    accessibility: 'Our HYROX classes are for everyone, no matter what their current fitness level. Whether you are looking to take on a HYROX race by yourself, share the experience with a teammate or just take part to increase your fitness, we can scale the class for anyone\'s ability.',
    highlights: [
      'For everyone, any fitness level',
      'Solo or team participation options',
      'Scalable for any ability',
      'Hosted indoors in exhibition halls',
      'Global leaderboards & World Championships',
      'Builds full-body strength & endurance',
    ],
    stations: [
      'Ski Erg – 1,000m',
      'Sled Push – 50m',
      'Sled Pull – 50m',
      'Burpee Broad Jumps – 80m',
      'Row – 1,000m',
      'Farmers Carry – 200m',
      'Sandbag Lunges – 100m',
      'Wall Balls – 100 reps',
    ],
  },
  {
    id: 'foundation',
    name: 'CrossFit Foundation Course',
    cta: { label: 'Book Your Course', href: 'calendar', target: '_modal' },
    tagline: 'Your Perfect Start to CrossFit',
    image: '/programs/foundation.jpg',
    icon: Target,
    accentColor: 'bg-emerald-500',
    schedule: 'Every weekday at 7:30pm',
    description: [
      'Our CrossFit Foundation Course consists of 3 one-to-one sessions over a 1 week period that is designed to introduce our new clients to the fundamental movements of CrossFit and how to scale them according to your fitness level.',
      'Each class builds upon the previous and is carefully structured to allow you to seamlessly transition into the regular classes upon completion. There is an emphasis on coaching each movement and gradually increasing the intensity.',
    ],
    whatYouLearn: [
      'Learn how to train properly by coaches who are there to guide and supervise you each time you enter our gym.',
      'Be constantly guided through each class - no more wandering around the gym left to your own devices! Because of this, our clients become stronger and fitter in a shorter amount of time.',
      'Learn new techniques including Olympic Lifting, Kettlebells, Powerlifting, Calisthenics, and other Bodyweight Movements, and about Proper Nutrition.',
      'Have each session tailored to suit your needs, whatever your background.',
      'Have your movement assessed and learn perfect form for each exercise.',
    ],
    highlights: [
      '3 personal one-to-one sessions',
      'Spread over 1 week - weekdays at 7:30pm',
      'Movement assessment & perfect form coaching',
      'Olympic Lifting, Kettlebells & Powerlifting',
      'Calisthenics & Bodyweight Movements',
      'Seamless transition into regular classes',
    ],
  },
  {
    id: 'crossfit',
    name: 'CrossFit Classes',
    cta: { label: 'Book a Class', href: 'calendar', target: '_modal' },
    tagline: 'Elite Fitness Through Varied Functional Movements',
    image: '/programs/crossfit.jpg',
    icon: Zap,
    accentColor: 'bg-red-500',
    description: [
      'You\'ll be participating in group classes utilizing the CrossFit methodologies outlined below. Workouts can be adjusted in weight, intensity, and certain mechanics to scale to the experience and fitness levels of any individual, be it a total fitness beginner or elite competitive CrossFitter.',
      'CrossFit is designed to be constantly varied, meaning everyday is different so you never get bored. All workouts are based on the core movements of life, and these movements reflect the best aspects of gymnastics, weightlifting, rowing and more.',
      'All of our CrossFit Classes are coach-led and follow a planned progression roughly 60 minutes in duration. A certified coach will guide you through warming up, followed by movement instruction and demonstration for the workout. The Coach will supervise and correct any movement performed by you during the workout.',
    ],
    methodologies: [
      { name: 'Diet', description: 'Lays the molecular foundations for fitness and health.' },
      { name: 'Metabolic Conditioning', description: 'Builds capacity in each of three metabolic pathways, beginning with aerobic, then lactic acid, and then phosphocreatine pathways.' },
      { name: 'Gymnastics', description: 'Establishes functional capacity for body control and range of motion.' },
      { name: 'Weightlifting & Throwing', description: 'Develops the ability to control external objects and produce power.' },
      { name: 'Sport', description: 'Applies fitness in a competitive atmosphere with more randomized movements and skill mastery.' },
    ],
    highlights: [
      'Constantly varied - never the same workout twice',
      'Scalable for all fitness levels',
      'Coach-led sessions ~60 minutes',
      'Planned progression over time',
      'Gymnastics, weightlifting & conditioning',
      'Supportive community atmosphere',
    ],
  },
  {
    id: 'nutrition',
    name: 'Nutrition Coaching',
    cta: { label: 'Join the Program', href: 'https://www.skool.com/pmi-nutrition-8504/about?ref=e9e4b784a5c94e919688c9b03434174b', target: '_blank' },
    tagline: 'Accountability & Support to Help You See Results',
    image: '/programs/nutrition.jpg',
    icon: Heart,
    accentColor: 'bg-teal-500',
    description: [
      'Fitness is achieved through optimisation of exercise and nutrition - fitness cannot be optimised without the inclusion of both. That\'s why the best gyms in the world pair exercise and nutrition together.',
      'We want you to learn more about your nutrition and how it will accelerate your health and fitness goals. Our fat loss system is so straightforward and easy to follow that you will be wondering why everyone isn\'t doing it. We focus on a simple habit-based approach and create a customised plan just for you to achieve long-term sustainable results.',
      'This nutrition program will transform your health and your life with the ongoing support and accountability of a community of people with the same goals, on the same journey.',
      'Nutrition is the base of the pyramid CrossFit founder Greg Glassman created - with met-cons, gymnastics, weight lifting and sport all being supported by it. What we put into our bodies greatly affects how we look, feel, and perform, but most athletes make nutrition secondary in their training. Your food has a much larger role in your life than you may think.',
    ],
    philosophy: '"Eat meat and vegetables, nuts and seeds, some fruit, little starch and no sugar. Keep intake to levels that will support exercise but not body fat." - CrossFit Journal, September 2002',
    highlights: [
      'Get started with a 7 day free trial',
      'Simple habit-based approach',
      'Customised plan built for you',
      'Community support & accountability',
      'Long-term sustainable results',
      'Optimise body composition & performance',
    ],
  },
  {
    id: 'olympic-lifting',
    name: 'Olympic Lifting',
    cta: { label: 'Sign Up', href: 'https://crossfitpmi.pushpress.com/landing/plans/plan_cda9a73e022300/login', target: '_blank' },
    tagline: 'Master the Art of Explosive Power',
    image: '/programs/olympic-lifting.jpg',
    icon: Dumbbell,
    accentColor: 'bg-purple-500',
    description: [
      'Olympic lifting focuses mainly on the Snatch and Clean & Jerk. Whether you are a new or developing lifter, we\'ll help you learn to lift with an efficient technique suited to your body.',
      'Olympic lifting provides benefits such as improved muscular power, coordination, and full-body strength, making it excellent for enhancing athletic performance in various sports. It also improves bone density, increases calorie burn, boosts metabolism, and promotes flexibility and balance.',
      'You will be paired with a coach in a small group class to refine your style through various accessory techniques.',
    ],
    athleticBenefits: [
      { title: 'Enhances power and speed', description: 'The explosive movements improve rate of force development, translating to better speed and power in sports like sprinting and jumping.' },
      { title: 'Builds coordination and balance', description: 'The complex, full-body movements require precise coordination, rhythm, and timing, improving overall balance and body awareness.' },
      { title: 'Improves agility and flexibility', description: 'The dynamic nature of the lifts and required range of motion leads to better flexibility and agility.' },
    ],
    healthBenefits: [
      { title: 'Increases bone density', description: 'High forces placed on the skeleton stimulate the body to lay down new bone, helping prevent osteoporosis and fractures.' },
      { title: 'Boosts metabolism', description: 'Full-body, high-intensity movements burn more calories in a shorter time compared to isolation exercises.' },
      { title: 'Builds full-body strength', description: 'The lifts engage multiple large muscle groups simultaneously - legs, back, shoulders, and arms.' },
      { title: 'Improves work capacity', description: 'The lifts increase your capacity to do work by improving cardiovascular and muscular endurance.' },
      { title: 'Enhances mental well-being', description: 'Learning and mastering the lifts leads to increased confidence and provides an effective way to relieve stress.' },
    ],
    highlights: [
      'Snatch & Clean and Jerk focus',
      'Small group coaching sessions',
      'Personalised technique refinement',
      'Accessory exercises included',
      'Improves power, speed & coordination',
      'Increases bone density & boosts metabolism',
    ],
  },
  {
    id: 'inbody',
    name: 'InBody Scan',
    cta: { label: 'Get in Touch', href: '/contact', target: '_self' },
    tagline: 'Go Beyond Your Weight - Understand Your Body',
    image: '/programs/inbody-scan.jpg',
    icon: Activity,
    accentColor: 'bg-cyan-500',
    description: [
      'Body composition analysis is essential to completely understand health and weight as traditional methods of assessing health, such as BMI, can be misleading. Going beyond your weight! Body composition analysis breaks down your body into four components: fat, lean body mass, minerals, and body water.',
      'The InBody 270 measures your body composition and displays it on an organised, easy-to-understand Result Sheet. The results help you understand where your fat, muscle, and body levels are at and act as a guide to help you achieve your goals - whether that is shedding a few unwanted pounds or a complete body transformation.',
    ],
    features: [
      { title: '15 Second Tests', description: 'Quickly measure fat mass, muscle mass, and body water levels. No dunking. No pinching. No discomfort. Simply stand on the device and hold the hand electrodes.' },
      { title: 'No Estimations', description: 'Only impedance is used to determine your body composition results; no empirical estimations such as gender and age are used or required to predict your body composition.' },
      { title: 'Track Your Progress', description: 'The InBody 270 records your weight, skeletal muscle mass, and percent body fat from the last eight tests to track progress over time.' },
    ],
    highlights: [
      '15 second test - quick & comfortable',
      'No dunking, pinching or discomfort',
      'Pure impedance - no estimations',
      'Tracks last 8 tests for progress',
      'Measures fat, muscle & body water',
      'Easy-to-understand result sheet',
    ],
  },
];

const BOOKING_URL = 'https://api.gymgrow.app/widget/booking/f8OQxOoGIvOSdAS0sWNg';

function SweatFormModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
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
      const response = await fetch(gymConfig.sweatWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          program: 'Sweat',
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
      console.error('Sweat form submission error:', error);
      protection.handleSubmitError();
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-300">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-6" style={{ background: '#ED1707' }} />
              <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>Sweat Program</span>
              <div className="h-px w-6" style={{ background: '#ED1707' }} />
            </div>

            <h2 className="display-sm text-black mb-2">Membership Pricing</h2>
            <p className="body-sm text-gray-500 mb-8">
              Fill in your details below and we&apos;ll send you our membership pricing straight away.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="heading-xl text-black mb-2">Pricing Sent!</h3>
                <p className="body-md text-gray-600 mb-6">
                  Thanks! Check your inbox — we&apos;ve sent you the membership pricing.
                </p>
                <Button variant="primary" onClick={onClose}>Close</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sweat_first_name" className="block caption-lg text-black mb-2">First Name *</label>
                    <input
                      type="text"
                      id="sweat_first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="sweat_last_name" className="block caption-lg text-black mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="sweat_last_name"
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
                  <label htmlFor="sweat_email" className="block caption-lg text-black mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="sweat_email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="sweat_phone" className="block caption-lg text-black mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="sweat_phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

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
                      <p className="text-red-500 text-sm font-medium">{protection.errorMessage}</p>
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
                  {protection.isSubmitting ? 'Submitting...' : 'Send Me the Pricing'}
                  {!protection.isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <p className="caption-md text-gray-500 text-center">
                  By submitting this form, you agree to receive communications from {gymConfig.name}. You can unsubscribe at any time.
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

export default function ProgramsPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSweatModal, setShowSweatModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const body = document.body as HTMLBodyElement;
    if (showBookingModal) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    } else {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      if (scrollYRef.current) window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      if (scrollYRef.current) window.scrollTo(0, scrollYRef.current);
    };
  }, [showBookingModal, isMounted]);

  const handleCta = (cta: { href: string; target: string }) => {
    if (cta.target === '_modal') {
      setShowBookingModal(true);
    } else if (cta.target === '_sweat_modal') {
      setShowSweatModal(true);
    } else if (cta.target === '_blank') {
      window.open(cta.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = cta.href;
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>CrossFit PMI</span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          <h1 className="display-2xl text-white mb-6">Our Programs</h1>
          <p className="heading-md text-gray-400 max-w-2xl mx-auto mb-10">
            Expert coaching and structured programs designed for every fitness level and goal
          </p>
          <Link href="/join">
            <Button variant="primary" size="lg">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="bg-gray-50 border-b border-gray-200 sticky top-24 z-40">
        <div className="relative">
          {/* Fade left edge */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 md:hidden" />
          {/* Fade right edge */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 md:hidden" />
          <div className="flex overflow-x-auto gap-1 py-2 px-3 md:px-4 md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {programs.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex-shrink-0 px-3 py-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 hover:text-[#ED1707] hover:bg-white rounded-lg transition-all duration-200 whitespace-nowrap active:scale-95"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Programs List */}
      <div className="max-w-7xl mx-auto px-4">
        {programs.map((program) => {
          const Icon = program.icon;

          return (
            <section
              key={program.id}
              id={program.id}
              className="scroll-mt-40 py-20 border-b border-gray-100 last:border-none"
            >
              {/* Program Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl ${program.accentColor} flex items-center justify-center shadow-md flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{program.name}</h2>
                  <p className="text-base font-medium text-gray-500 mt-0.5">{program.tagline}</p>
                </div>
              </div>

              {/* Landscape Image */}
              <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden mb-12">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left: Description + extras */}
                <div className="lg:col-span-2 space-y-5">
                  {program.schedule && (
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-semibold">{program.schedule}</span>
                    </div>
                  )}

                  {program.description.map((para, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
                  ))}

                  {/* What To Expect (Sweat) */}
                  {program.whatToExpect && (
                    <div className="mt-4 bg-orange-50 border border-orange-100 rounded-xl p-5">
                      <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wide mb-2">What to Expect</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{program.whatToExpect}</p>
                    </div>
                  )}

                  {/* Accessibility (Hyrox) */}
                  {program.accessibility && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Accessibility</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{program.accessibility}</p>
                    </div>
                  )}

                  {/* Hyrox Benefits */}
                  {program.benefits && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">Benefits of Hyrox</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{program.benefits}</p>
                    </div>
                  )}

                  {/* Hyrox Stations */}
                  {program.stations && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">8 Race Stations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {program.stations.map((station, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 text-sm">{station}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Foundation: What You Learn */}
                  {program.whatYouLearn && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">In Our Course, You Will</h3>
                      <ul className="space-y-3">
                        {program.whatYouLearn.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={`mt-1 w-5 h-5 rounded-full ${program.accentColor} flex items-center justify-center flex-shrink-0`}>
                              <Check className="w-3 h-3 text-white" />
                            </span>
                            <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CrossFit Methodologies */}
                  {program.methodologies && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">CrossFit Methodologies</h3>
                      <div className="space-y-3">
                        {program.methodologies.map((m, idx) => (
                          <div key={idx} className="border-l-2 border-red-200 pl-4">
                            <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{m.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nutrition Philosophy */}
                  {program.philosophy && (
                    <blockquote className="border-l-4 border-teal-300 pl-5 text-gray-500 italic text-sm leading-relaxed bg-teal-50 py-4 pr-5 rounded-r-xl">
                      {program.philosophy}
                    </blockquote>
                  )}

                  {/* Olympic Lifting Benefits */}
                  {program.athleticBenefits && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Athletic Performance Benefits</h3>
                      <div className="space-y-3">
                        {program.athleticBenefits.map((b, idx) => (
                          <div key={idx} className="border-l-2 border-purple-200 pl-4">
                            <p className="text-sm font-semibold text-gray-800">{b.title}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{b.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {program.healthBenefits && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Health & Fitness Benefits</h3>
                      <div className="space-y-3">
                        {program.healthBenefits.map((b, idx) => (
                          <div key={idx} className="border-l-2 border-purple-200 pl-4">
                            <p className="text-sm font-semibold text-gray-800">{b.title}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{b.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* InBody Features */}
                  {program.features && (
                    <div className="space-y-4">
                      {program.features.map((f, idx) => (
                        <div key={idx} className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                          <h3 className="text-sm font-bold text-cyan-700 mb-1">{f.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: What You Get card + CTA */}
                <div className="flex flex-col gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What You Get</h3>
                    <ul className="space-y-3">
                      {program.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className={`mt-0.5 w-5 h-5 rounded-full ${program.accentColor} flex items-center justify-center flex-shrink-0`}>
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span className="text-gray-700 text-sm leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="primary"
                    size="default"
                    className="w-full"
                    onClick={() => handleCta(program.cta)}
                  >
                    {program.cta.label}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="display-lg text-white mb-5">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="heading-md text-gray-400 mb-10">
            Book your free No-Sweat Intro and discover which program is right for you
          </p>
          <Button variant="primary" size="lg" onClick={() => setShowBookingModal(true)}>
            Book Your Free Intro
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>

    {/* Booking Modal */}

    {isMounted && showBookingModal && createPortal(
      <>
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md overscroll-contain"
          onClick={() => setShowBookingModal(false)}
        />
        <div className="fixed mt-12 inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] h-[80vh] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300 flex flex-col">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-6 right-6 z-10 p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Close booking calendar"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <h3 className="heading-lg text-black mb-3">Book your class with our team</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src={BOOKING_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a class"
                className="w-full h-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </>,
      document.body
    )}
    {isMounted && showSweatModal && (
      <SweatFormModal onClose={() => setShowSweatModal(false)} />
    )}
    </>
  );
}
