'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-vitamin-500 to-vitamin-600 origin-left z-50 transition-all duration-150"
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
        boxShadow: '0 2px 10px rgba(255, 107, 53, 0.5)',
      }}
    />
  );
}
