'use client';

import NewHeader from '@/components/new/NewHeader';
import NewHeroCarousel from '@/components/new/NewHeroCarousel';
import NewInfoCards from '@/components/new/NewInfoCards';
import NewNotices from '@/components/new/NewNotices';
import NewFooter from '@/components/new/NewFooter';
import PopupModal from '@/components/PopupModal';
import FloatingCallButton from '@/components/new/FloatingCallButton';

export default function Home() {
  return (
    <div className="bg-[#f8f7f5]">
      <NewHeader />

      {/* Hero Carousel - Full Width */}
      <main className="w-full py-5">
        <NewHeroCarousel />
      </main>

      <NewInfoCards />
      <NewNotices />

      <NewFooter />

      {/* Popup Modal */}
      <PopupModal />

      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}
