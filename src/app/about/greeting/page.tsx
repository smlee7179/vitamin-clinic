'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface PageHero {
  id: string;
  page: string;
  imageUrl: string;
  title: string;
  subtitle: string | null;
}

interface Greeting {
  id: string;
  imageUrl: string;
  content: string;
  signature: string;
}

export default function GreetingPage() {
  const [hero, setHero] = useState<PageHero | null>(null);
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    fetchHero();
    fetchGreeting();
  }, []);

  const fetchHero = async () => {
    try {
      const response = await fetch('/api/page-hero?page=doctors');
      if (response.ok) {
        const data = await response.json();
        setHero(data);
      }
    } catch (error) {
      console.error('Failed to fetch page hero:', error);
    }
  };

  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/greeting');
      if (response.ok) {
        const data = await response.json();
        setGreeting(data);
      }
    } catch (error) {
      console.error('Failed to fetch greeting:', error);
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {greeting && (
          <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex flex-col bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                {hero?.imageUrl && (
                  <div className="w-full bg-gray-50 flex items-center justify-center p-6 md:p-8">
                    <div className="w-full max-w-2xl">
                      <Image
                        src={hero.imageUrl}
                        alt="인사말"
                        width={800}
                        height={800}
                        priority
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-4 w-full p-8 md:p-12">
                  <h2 className="text-[#343A40] tracking-tight text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    인사말
                  </h2>
                  <div
                    className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap [&_p]:mb-[1em] [&_p]:min-h-[1.5em] [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: greeting.content }}
                  />
                  {greeting.signature && (
                    <p className="text-right font-bold text-lg md:text-xl text-[#343A40] mt-4">
                      {greeting.signature}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <NewFooter />
    </div>
  );
}
