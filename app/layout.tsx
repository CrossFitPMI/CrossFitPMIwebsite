import './globals.css';
import type { Metadata } from 'next';
import { gymConfig } from '@/lib/gym-config';
import Script from 'next/script';
import WhatsAppChatButton from '@/components/WhatsAppChatButton';

export const metadata: Metadata = {
  title: gymConfig.seo.title,
  description: gymConfig.seo.description,
  keywords: [
    ...gymConfig.seo.keywords
  ].join(', '),
  authors: [{ name: 'GymGrow Team' }],
  creator: 'GymGrow',
  publisher: gymConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(gymConfig.urls.website),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  openGraph: {
    title: `${gymConfig.name} - ${gymConfig.tagline}`,
    description: gymConfig.description,
    url: gymConfig.urls.website,
    siteName: gymConfig.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${gymConfig.name} - Premium Gym Center`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${gymConfig.name} - ${gymConfig.tagline}`,
    description: gymConfig.description,
    images: ['/og-image.png'],
    creator: `@${gymConfig.name.toLowerCase()}`,
    site: `@${gymConfig.name.toLowerCase()}`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'fitness',
  classification: 'fitness gym',
  referrer: 'origin-when-cross-origin',
};

// JSON-LD Schema for Local Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': gymConfig.urls.website,
  name: gymConfig.name,
  description: gymConfig.description,
  url: gymConfig.urls.website,
  telephone: gymConfig.contact.phone,
  email: gymConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: gymConfig.contact.address.street,
    addressLocality: gymConfig.contact.address.city,
    postalCode: gymConfig.contact.address.postcode,
    addressCountry: gymConfig.contact.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.5074',
    longitude: '-0.1278',
  },
  // Opening hours vary by location - see contact page for specific hours
  priceRange: '£49-£149',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '400',
  },
  sameAs: [
    gymConfig.social.instagram,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fitness Programs',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Group Training',
          description: 'CrossFit group classes for all fitness levels',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Training',
          description: 'One-on-one coaching sessions',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="apple-mobile-web-app-title" content="CF PMI" />
        
        {/* Meta Pixel - Noscript fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1086145052934385&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1086145052934385');
            fbq('track', 'PageView');
          `}
        </Script>
{/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5S7L2H1RBH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5S7L2H1RBH');
          `}
        </Script>
        {children}
        <WhatsAppChatButton />
      </body>
    </html>
  );
}
