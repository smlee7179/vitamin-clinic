'use client';

import { useState, useEffect } from 'react';

interface Popup {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  active: boolean;
  showDoNotShow: boolean;
  startDate: string | null;
  endDate: string | null;
}

export default function PopupModal() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  useEffect(() => {
    fetchPopup();
  }, []);

  const fetchPopup = async () => {
    try {
      // Check if popup was hidden today
      const hiddenPopups = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
      const today = new Date().toDateString();

      const response = await fetch('/api/popups');
      if (response.ok) {
        const data = await response.json();

        // Only show if popup exists and wasn't hidden today
        if (data && data.id && hiddenPopups[data.id] !== today) {
          setPopup(data);
          setIsVisible(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch popup:', error);
    }
  };

  const handleClose = () => {
    if (doNotShowToday && popup) {
      // Save to localStorage
      const hiddenPopups = JSON.parse(localStorage.getItem('hiddenPopups') || '{}');
      const today = new Date().toDateString();
      hiddenPopups[popup.id] = today;
      localStorage.setItem('hiddenPopups', JSON.stringify(hiddenPopups));
    }
    setIsVisible(false);
  };

  if (!isVisible || !popup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        {popup.imageUrl && (
          <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ maxHeight: '400px' }}>
            <img
              alt={popup.title}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '400px' }}
              src={popup.imageUrl}
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col p-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#333333] sm:text-2xl">
            {popup.title}
          </h1>
          <div
            className="mt-3 text-center text-sm font-normal leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: popup.content }}
          />
        </div>

        {/* Footer with checkbox and close button */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
          {popup.showDoNotShow && (
            <label className="flex cursor-pointer items-center gap-x-2">
              <input
                type="checkbox"
                checked={doNotShowToday}
                onChange={(e) => setDoNotShowToday(e.target.checked)}
                className="h-4 w-4 appearance-none rounded-sm border-2 border-[#e6e1db] bg-transparent text-[#f97316] checked:border-[#f97316] checked:bg-[#f97316] checked:bg-[image:--checkbox-tick-svg] focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 focus:ring-offset-2 focus:ring-offset-gray-50"
              />
              <p className="text-xs font-normal leading-normal text-[#757575]">
                오늘 하루 보지 않기
              </p>
            </label>
          )}
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-md px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-200"
          >
            닫기
          </button>
        </div>
      </div>

      <style jsx>{`
        :root {
          --checkbox-tick-svg: url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e');
        }
      `}</style>
    </div>
  );
}
