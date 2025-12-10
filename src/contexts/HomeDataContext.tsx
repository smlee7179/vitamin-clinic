'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  aspectRatio: string | null;
  order: number;
  active: boolean;
}

interface Notice {
  id: string;
  title: string;
  category: string;
  important: boolean;
  createdAt: string;
}

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

interface HomeDataContextType {
  heroSlides: HeroSlide[];
  notices: Notice[];
  popup: Popup | null;
  loading: boolean;
}

const HomeDataContext = createContext<HomeDataContextType>({
  heroSlides: [],
  notices: [],
  popup: null,
  loading: true,
});

export function HomeDataProvider({ children }: { children: ReactNode }) {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 모든 API를 병렬로 호출
    Promise.all([
      fetch('/api/hero-slides').then(res => res.json()),
      fetch('/api/notices?limit=5').then(res => res.json()),
      fetch('/api/popups').then(res => res.json()),
    ])
      .then(([slidesData, noticesData, popupData]) => {
        // Validate and set data with fallbacks
        setHeroSlides(Array.isArray(slidesData) ? slidesData : []);
        setNotices(Array.isArray(noticesData) ? noticesData : []);
        // popupData can be null or an object (not an array)
        setPopup(popupData && !popupData.error ? popupData : null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load home data:', err);
        // Set safe defaults on error
        setHeroSlides([]);
        setNotices([]);
        setPopup(null);
        setLoading(false);
      });
  }, []);

  return (
    <HomeDataContext.Provider value={{ heroSlides, notices, popup, loading }}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  return useContext(HomeDataContext);
}
