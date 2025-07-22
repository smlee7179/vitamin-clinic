'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PerformanceMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 로드 성능 측정
    const measurePerformance = () => {
      if (typeof window === 'undefined') return;

      // Navigation Timing API 사용
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      // 정확한 로드 시간 계산
      const loadTime = navigation.loadEventEnd > 0 ? 
        navigation.loadEventEnd - navigation.requestStart : 0;
      
      const domContentLoaded = navigation.domContentLoadedEventEnd > 0 ? 
        navigation.domContentLoadedEventEnd - navigation.requestStart : 0;
      
      const performanceData = {
        url: window.location.href,
        loadTime: Math.max(0, loadTime),
        domContentLoaded: Math.max(0, domContentLoaded),
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: 0, // LCP는 별도로 측정
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ip: '127.0.0.1' // 개발 환경에서는 로컬 IP
      };

      // LCP 측정
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          performanceData.largestContentfulPaint = lastEntry.startTime;
          
          // 성능 데이터 전송
          sendPerformanceData(performanceData);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } else {
        // LCP 측정이 불가능한 경우 기본값 사용
        setTimeout(() => {
          sendPerformanceData(performanceData);
        }, 1000);
      }
    };

    const sendPerformanceData = async (data: any) => {
      try {
        const response = await fetch('/api/performance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          console.warn('Performance data send failed:', response.status);
        }
      } catch (error) {
        console.warn('Failed to send performance data:', error);
      }
    };

    // 페이지 로드 완료 후 성능 측정
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [pathname]);

  return null;
} 