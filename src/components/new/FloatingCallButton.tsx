'use client';

import { useState, useEffect } from 'react';

export default function FloatingCallButton() {
  const [phoneNumber, setPhoneNumber] = useState<string>('051-469-7581');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch phone number from hospital info
    fetch('/api/hospital-info')
      .then(res => res.json())
      .then(data => {
        if (data.phone) {
          setPhoneNumber(data.phone);
        }
      })
      .catch(err => console.error('Failed to load phone number:', err));

    // Show button after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    // Remove spaces and hyphens for tel: link
    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  };

  return (
    <button
      onClick={handleCall}
      className={`md:hidden fixed bottom-6 right-6 z-[9999] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="전화 걸기"
    >
      <div className="relative group">
        {/* Main button */}
        <div className="bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 group-hover:scale-110">
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#f97316] opacity-50 animate-ping"></div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
            전화하기: {phoneNumber}
          </div>
        </div>
      </div>
    </button>
  );
}
