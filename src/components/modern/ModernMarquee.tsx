'use client';

import { useState, useEffect } from 'react';

export default function ModernMarquee() {
  const [marqueeItems, setMarqueeItems] = useState([
    { icon: 'ri-time-line', text: '평일 09:00 - 18:00 | 토요일 09:00 - 13:00' },
    { icon: 'ri-phone-line', text: '전화: 051-469-7581' },
    { icon: 'ri-map-pin-line', text: '부산 동구 중앙대로 375' },
  ]);

  useEffect(() => {
    const loadMarqueeData = async () => {
      try {
        const response = await fetch('/api/content?section=marquee');
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            setMarqueeItems(data);
          }
        }
      } catch (error) {
        console.error('Failed to load marquee data:', error);
      }
    };
    loadMarqueeData();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <i className={`${item.icon} text-2xl text-white mr-3`}></i>
            <span className="text-white font-semibold">{item.text}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
