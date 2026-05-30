import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indiansolargreenenergy.com';

  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/services/residential-solar',
    '/services/commercial-solar',
    '/services/industrial-solar',
    '/services/on-grid-solar',
    '/services/off-grid-solar',
    '/services/hybrid-solar',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
