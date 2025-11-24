'use client';

import NewHeader from '@/components/new/NewHeader';
import NewHeroCarousel from '@/components/new/NewHeroCarousel';
import NewNotices from '@/components/new/NewNotices';
import NewLocation from '@/components/new/NewLocation';
import NewFooter from '@/components/new/NewFooter';
import PopupModal from '@/components/PopupModal';

export default function Home() {
  return (
    <div className="bg-[#f8f7f5]">
      <NewHeader />

      <main>
        <NewHeroCarousel />
        <NewNotices />
        <NewLocation />
      </main>

      <NewFooter />

      {/* Popup Modal */}
      <PopupModal />
    </div>
  );
}
