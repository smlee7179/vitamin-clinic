import "./globals.css";
import { Inter, Pacifico } from "next/font/google";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import PerformanceMonitor from "../components/analytics/PerformanceMonitor";
import ProgressBar from "../components/layout/ProgressBar";
import { Metadata } from "next";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: '비타민 의원 - 부산 정형외과 | 노인 친화적 정형외과',
    template: '%s | 비타민 의원'
  },
  description: '부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다. 관절염, 척추질환, 골다공증 치료에 특화되어 있으며, 큰 글자와 높은 대비로 노인분들도 편리하게 이용하실 수 있습니다.',
  keywords: ['부산 정형외과', '해운대 정형외과', '노인 친화적 병원', '관절염 치료', '척추질환', '골다공증', '정형외과 전문의', '부산 병원'],
  authors: [{ name: '비타민 의원' }],
  creator: '비타민 의원',
  publisher: '비타민 의원',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vitamin-clinic.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://vitamin-clinic.com',
    title: '비타민 의원 - 부산 정형외과 | 노인 친화적 정형외과',
    description: '부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다. 관절염, 척추질환, 골다공증 치료에 특화되어 있습니다.',
    siteName: '비타민 의원',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '비타민 의원 - 부산 정형외과',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '비타민 의원 - 부산 정형외과 | 노인 친화적 정형외과',
    description: '부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* manifest는 Next.js가 manifest.ts에서 자동 생성 */}
        <meta name="theme-color" content="#ff6b35" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="KR-26" />
        <meta name="geo.placename" content="부산광역시 해운대구" />
        <meta name="geo.position" content="35.1586;129.1603" />
        <meta name="ICBM" content="35.1586, 129.1603" />
        <link rel="stylesheet" href="/remixicon.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.variable} ${pacifico.variable} antialiased min-h-screen bg-neutral-50 text-neutral-900`}>
        <GoogleAnalytics />
        <PerformanceMonitor />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
