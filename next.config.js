/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readdy.ai',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },



  // 압축 설정
  compress: true,

  // 실험적 기능
  experimental: {
    scrollRestoration: true,
  },

  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob: https://*.google.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https: data: blob:; font-src 'self' https: data: blob:; img-src 'self' data: https: blob: *; connect-src 'self' https: data: blob:; frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps https://maps.googleapis.com https://www.google.com/maps/embed https://www.google.com/maps/place; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // 환경 변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // TypeScript 설정
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 출력 설정
  output: 'standalone',

  // 트레일링 슬래시 설정
  trailingSlash: false,

  // 페이지 확장자 설정
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Webpack 설정
  webpack: (config, { isServer }) => {
    // lenis를 클라이언트 사이드에서만 로드
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 