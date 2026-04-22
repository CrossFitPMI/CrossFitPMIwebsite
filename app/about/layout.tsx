import { Metadata } from 'next';
import { gymConfig } from '@/lib/gym-config';

export const metadata: Metadata = {
  title: `About ${gymConfig.name} - Our Mission & Coaching Team | Limerick`,
  description: `Meet the expert coaching team at ${gymConfig.name} in Limerick. Our mission is to help you change your life through expert guidance, varied workouts, and a supportive community.`,
  openGraph: {
    title: `About ${gymConfig.name} - Our Mission & Coaching Team`,
    description: `Meet the expert coaching team at ${gymConfig.name}. Our mission is to help you change your life through expert guidance and a supportive community.`,
    url: `${gymConfig.urls.website}/about`,
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}