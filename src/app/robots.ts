import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Rules for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*',
          '/api/auth/*',
          '/_next/*',
          '/private/*',
          '/*.json$',
          '/admin',
        ],
        crawlDelay: 10,
      },
      // Specific rules for Google bot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/*', '/api/admin/*', '/api/auth/*'],
        crawlDelay: 5,
      },
      // Specific rules for Google Image bot
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/*', '/uploads/*'],
        disallow: ['/admin/*'],
      },
      // Specific rules for Bing bot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/*', '/api/admin/*', '/api/auth/*'],
        crawlDelay: 10,
      },
      // Specific rules for Naver bot (Korean search engine)
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/admin/*', '/api/admin/*', '/api/auth/*'],
        crawlDelay: 5,
      },
      // Block bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://vitaminpain.com/sitemap.xml',
  }
} 