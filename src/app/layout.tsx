import "./globals.css";
import { Inter, Pacifico } from "next/font/google";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import PerformanceMonitor from "../components/analytics/PerformanceMonitor";
import ProgressBar from "../components/layout/ProgressBar";
import { HospitalInfoProvider } from "../contexts/HospitalInfoContext";
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

// Fetch site settings for dynamic metadata
async function getSiteSettings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vitaminpain.com';
    const response = await fetch(`${baseUrl}/api/site-settings`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  // Use custom settings if available, otherwise use defaults
  const title = siteSettings?.siteTitle || '비타민 의원 - 부산 정형외과 | 노인 친화적 정형외과';
  const description = siteSettings?.siteDescription || '부산 해운대구 비타민 의원은 노인 친화적 정형외과 전문병원입니다. 관절염, 척추질환, 골다공증 치료에 특화되어 있으며, 큰 글자와 높은 대비로 노인분들도 편리하게 이용하실 수 있습니다.';
  const keywords = siteSettings?.keywords || '부산 정형외과, 해운대 정형외과, 노인 친화적 병원, 관절염 치료, 척추질환, 골다공증, 정형외과 전문의, 부산 병원';

  // Use custom OG image if available, otherwise use default
  const ogImageUrl = siteSettings?.ogImageUrl || '/images/og-image.jpg';
  const ogTitle = siteSettings?.ogTitle || title;
  const ogDescription = siteSettings?.ogDescription || description;

  // Use custom Twitter image if available, otherwise use OG image
  const twitterImageUrl = siteSettings?.twitterImageUrl || ogImageUrl;
  const twitterTitle = siteSettings?.twitterTitle || ogTitle;
  const twitterDescription = siteSettings?.twitterDescription || ogDescription;

  return {
    title: {
      default: title,
      template: `%s | ${siteSettings?.siteTitle || '비타민 의원'}`
    },
    description,
    keywords: keywords.split(',').map((k: string) => k.trim()),
    authors: [{ name: '비타민 의원' }],
    creator: '비타민 의원',
    publisher: '비타민 의원',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://vitaminpain.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'https://vitaminpain.com',
      title: ogTitle,
      description: ogDescription,
      siteName: siteSettings?.siteTitle || '비타민 의원',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImageUrl],
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
}

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className={`${inter.variable} ${pacifico.variable} antialiased min-h-screen bg-neutral-50 text-neutral-900`}>
        <GoogleAnalytics />
        <PerformanceMonitor />
        <ProgressBar />
        <HospitalInfoProvider>
          {children}
        </HospitalInfoProvider>
      </body>
    </html>
  );
}
