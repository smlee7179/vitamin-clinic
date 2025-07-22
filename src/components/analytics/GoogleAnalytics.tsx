'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Google Analytics 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // gtag 초기화
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [GA_TRACKING_ID]);

  useEffect(() => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    // 페이지 뷰 추적
    window.gtag('config', GA_TRACKING_ID, {
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname, GA_TRACKING_ID]);

  return null;
}

// 이벤트 추적 함수들
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 전화번호 클릭 추적
export const trackPhoneClick = () => {
  trackEvent('click', 'contact', 'phone_number');
};

// 예약 문의 추적
export const trackAppointmentInquiry = () => {
  trackEvent('click', 'conversion', 'appointment_inquiry');
};

// 지도 클릭 추적
export const trackMapClick = () => {
  trackEvent('click', 'contact', 'map_location');
}; 