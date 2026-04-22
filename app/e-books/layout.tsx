import { Metadata } from 'next';
import { gymConfig } from '@/lib/gym-config';

export const metadata: Metadata = {
  title: `E-Books | ${gymConfig.name}`,
  description: `Free fitness resources from ${gymConfig.name}. Meal plans, workout guides, injury prevention tips, strength training and more.`,
  openGraph: {
    title: `E-Books | ${gymConfig.name}`,
    description: `Free fitness resources from ${gymConfig.name}. Meal plans, workout guides, injury prevention tips, strength training and more.`,
    url: `${gymConfig.urls.website}/e-books`,
  },
  alternates: {
    canonical: '/e-books',
  },
};

export default function EBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
