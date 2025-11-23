'use client';

import NewHeader from '@/components/new/NewHeader';
import NewHero from '@/components/new/NewHero';
import NewServices from '@/components/new/NewServices';
import NewNotices from '@/components/new/NewNotices';
import NewLocation from '@/components/new/NewLocation';
import NewFooter from '@/components/new/NewFooter';

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#101822]">
      <NewHeader />

      <main>
        <NewHero />
        <NewServices />
        <NewNotices />
        <NewLocation />
      </main>

      <NewFooter />
    </div>
  );
}
