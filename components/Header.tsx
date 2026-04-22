'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gymConfig } from '@/lib/gym-config';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  // { name: 'Services', href: '/services' }, // Hidden temporarily
  // { name: 'Testimonials', href: '/testimonials' }, // Hidden temporarily
  { name: 'Programs', href: '/programs', hasDropdown: true },
  { name: 'Timetable', href: '/timetable' },
  { name: 'E-Books', href: '/e-books' },
  { name: 'Contact', href: '/contact' },
  // { name: 'Join Now', href: '/join' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  useEffect(() => {
    // Set initial scroll state based on current scroll position
    const checkInitialScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Check scroll position immediately on mount
    checkInitialScroll();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    // Navigation now handled by Next.js routing
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="content-width container-padding">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center lg:flex-1">
            <Link 
              href="/" 
              className="flex items-center group"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={gymConfig.assets.logo}
                  alt={`${gymConfig.name} Logo`}
                  fill
                  className="object-contain drop-shadow-lg"
                  loading="eager"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-10 lg:flex-1 flex-nowrap" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#ED1707] font-semibold text-lg transition-all duration-300 relative py-2 flex items-center gap-1 whitespace-nowrap"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#ED1707] transition-all duration-300 group-hover:w-full rounded-full"></div>
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-4">
                      {gymConfig.programsNav.map((program) => (
                        <Link
                          key={program.id}
                          href={program.href}
                          className="block  px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          {program.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#ED1707] font-semibold text-lg transition-all duration-300 relative group py-2 whitespace-nowrap"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#ED1707] transition-all duration-300 group-hover:w-full rounded-full"></div>
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/join">
              <Button variant="primary" size="default">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-4 transition-all duration-300 rounded-xl hover:bg-white/10"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" aria-hidden="true" />
              ) : (
                <Menu className="w-7 h-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl rounded-b-3xl mt-2 shadow-2xl"
          >
            <div className="px-8 pt-8 pb-10 space-y-4">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name}>
                    <button
                      onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                      className="flex items-center justify-between w-full text-left px-6 py-5 text-gray-300 hover:text-white heading-lg hover:bg-white/10 transition-all duration-300 rounded-2xl"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileProgramsOpen && (
                      <div className="mt-2 ml-4 space-y-2">
                        {gymConfig.programsNav.map((program) => (
                          <Link
                            key={program.id}
                            href={program.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-6 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-xl"
                          >
                            {program.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block w-full text-left px-6 py-5 text-gray-300 hover:text-white heading-lg hover:bg-white/10 transition-all duration-300 rounded-2xl"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-6">
                <Link href="/join">
                  <Button variant="primary" size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}