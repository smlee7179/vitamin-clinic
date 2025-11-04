'use client';

import { useState, useEffect, useRef } from 'react';

interface MarqueeItem {
  icon: string;
  text: string;
}

const DEFAULT_NOTICES: MarqueeItem[] = [
  { icon: '🏥', text: '비타민마취통증의학과의원 홈페이지 오픈하였습니다.' },
  { icon: '📋', text: '진료과목 ) 정형외과, 마취통증의학과, 재활의학과' },
  { icon: '✅', text: '비수술 척추 · 관절 클리닉 통증 치료 전문' },
];

export default function MarqueeSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [notices, setNotices] = useState<MarqueeItem[]>(DEFAULT_NOTICES);

  // Load notices from DB (with localStorage fallback)
  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const response = await fetch('/api/marquee');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setNotices(data.map((item: any) => ({ icon: item.icon, text: item.text })));
          return;
        }
      }
    } catch (error) {
      console.error('Failed to load from DB, using localStorage:', error);
    }

    // Fallback to localStorage
    const saved = localStorage.getItem('marqueeNotices');
    if (saved) {
      try {
        setNotices(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load marquee notices');
      }
    }
  };

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadNotices();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let scrollLeft = 0;

    const animate = () => {
      scrollLeft += 0.5;
      if (scrollLeft >= slider.scrollWidth / 2) {
        scrollLeft = 0;
      }
      slider.scrollLeft = scrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="bg-orange-500 text-white py-3 overflow-hidden">
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {[...notices, ...notices, ...notices].map((notice, idx) => (
          <div key={idx} className="inline-flex items-center px-8">
            <span className="text-xl mr-2">{notice.icon}</span>
            <span className="text-sm sm:text-base font-medium">{notice.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
