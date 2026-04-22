import { Metadata } from 'next';
import { gymConfig } from '@/lib/gym-config';

export const metadata: Metadata = {
  title: `Contact ${gymConfig.name} | Get in Touch`,
  description: `Contact ${gymConfig.name} for membership info or questions. Call ${gymConfig.contact.phone} or visit us today.`,
  openGraph: {
    title: `Contact ${gymConfig.name} | Get in Touch`,
    description: `Contact ${gymConfig.name} for membership info or questions.`,
    url: `${gymConfig.urls.website}/contact`,
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}