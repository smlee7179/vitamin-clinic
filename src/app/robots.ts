import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/', '/_next/', '/private/'],
    },
    sitemap: 'https://vitamin-clinic.com/sitemap.xml',
  }
} 