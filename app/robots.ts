import { gymConfig } from '@/lib/gym-config';

export default function robots() {
  const baseUrl = gymConfig.urls.website;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}