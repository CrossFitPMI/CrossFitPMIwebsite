'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How do I sign up for a Foundation Course?',
    answer: 'Schedule your Foundation Course with us. Fill out the contact form with all of your details and we\'ll contact you to schedule your Foundation Course.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Be patient. Results take time, but if you\'re consistent, they absolutely will come. The exciting thing is that as a beginner, results come fairly quickly. Even in 30 days, you can really see a difference in your strength and overall fitness.',
  },
  {
    question: 'Do I get the chance to meet new friends?',
    answer: 'Yes. We like to organize our classes in small groups. Small group settings allow you to make new friends that might share the same interest(s) as you!',
  },
  {
    question: 'What sets you apart from other gyms in the area?',
    answer: 'We are a community of people that share the same fitness journey as you. We are here to build each other up - if you win, we all win!',
  },
  {
    question: 'How often should I come?',
    answer: '2–4 classes a week is realistic for beginners, depending on your level of fitness when you start. It may take a while for your body to get used to training at that intensity, so at the beginning, you might need more recovery time between training days. Over the first few months, start working your way up to training 5 days a week.',
  },
  {
    question: 'Do you provide free refreshments there?',
    answer: 'We have filtered water available to our members. Other snacks and drinks are available for purchase.',
  },
  {
    question: 'Do I have to be fit to join?',
    answer: 'No. Our fitness program is what will get you in shape. No matter what your current fitness level is, we have the fitness program that is right for you. As you become fitter, workouts will become more challenging. Every workout is designed to help you succeed, improve fitness, and move you toward your goals. Our program is designed for universal scalability, making it the perfect application for any committed individual regardless of experience.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We take all major credit cards and debit cards. We do not accept personal checks or cash.',
  },
  {
    question: 'What kind of movements/exercises can I expect?',
    answer: 'Our class programming will include a strength portion in which you\'ll work on something like Olympic weightlifting, deadlifting, squatting, or bodyweight strength - or you may work on a skill like handstand push-ups. After the strength or skill portion of the class is complete, most days will involve a workout programmed for that specific day. Workouts can be anywhere between 5 to 20 minutes or more.',
  },
  {
    question: 'Do I have to stop eating my favorite foods?',
    answer: 'Do enjoy special indulgences and meals - it\'s a lifestyle, but it has to be manageable and realistic for the long-term. Luckily, the healthier you eat, the healthier you tend to want to eat. You get hooked on feeling good and junk food just isn\'t worth it. By avoiding excessive amounts of refined carbohydrates and measuring your intake of protein, carbohydrates, and fat, you will see dramatic, measurable increases in health.',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-gray-100 last:border-none transition-colors duration-200 ${open ? 'bg-white' : ''}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span className="text-xs font-bold text-gray-300 mt-1 w-6 flex-shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-base font-semibold transition-colors duration-200 ${open ? 'text-[#ED1707]' : 'text-gray-900 group-hover:text-[#ED1707]'}`}>
            {question}
          </span>
        </div>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${open ? 'bg-[#ED1707]' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
          {open
            ? <Minus className="w-3.5 h-3.5 text-white" />
            : <Plus className="w-3.5 h-3.5 text-gray-600" />
          }
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="pl-10 pb-6 text-gray-500 leading-relaxed text-sm pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const half = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, half);
  const rightColumn = faqs.slice(half);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
            <span className="caption-lg font-semibold uppercase tracking-widest" style={{ color: '#ED1707' }}>FAQ</span>
            <div className="h-px w-8" style={{ background: '#ED1707' }} />
          </div>
          <h2 className="display-md text-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="body-xl text-gray-600 max-w-4xl mx-auto">
            Everything you need to know before getting started. Can't find an answer?{' '}
            <a href="/contact" className="text-[#ED1707] font-medium hover:underline">
              Get in touch.
            </a>
          </p>
        </div>

        {/* Two-column FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          {/* Left column */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 divide-y divide-gray-100">
            {leftColumn.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>

          {/* Right column */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 divide-y divide-gray-100 mt-6 lg:mt-0">
            {rightColumn.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={half + i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
