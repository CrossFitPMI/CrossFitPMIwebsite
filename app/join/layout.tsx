import { Metadata } from 'next';
import { gymConfig } from '@/lib/gym-config';

export const metadata: Metadata = {
  title: `Join ${gymConfig.name} | Transform Your Fitness`,
  description: `Join ${gymConfig.name} and transform your fitness. Expert coaching, supportive community, proven results. Start your journey today!`,
  openGraph: {
    title: `Join ${gymConfig.name} | Transform Your Fitness`,
    description: `Join ${gymConfig.name} and transform your fitness. Expert coaching, supportive community, proven results.`,
    url: `${gymConfig.urls.website}/join`,
  },
  alternates: {
    canonical: '/join',
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}