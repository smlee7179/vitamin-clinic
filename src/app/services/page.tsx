'use client';

import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function ServicesPage() {
  return (
    <div className="bg-[#f6f7f8] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4">
          {/* Hero Section */}
          <section className="w-full relative">
            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden rounded-xl bg-gray-900">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCctkdsx-2ft96oX0VlBgkrSjcuYwu5_OLLt9KpkVBeFer2E_5v2-bpdc7MpJnuR4jOJDdU6jGJqROuke_ce8c8HesvMzz8A44nredn2PuIaw94ZLY_KlhpxLYmpTxIRCAYL8EFsakCAXR5QEjdpdO-veF5vEXI6CwcjiGRMtrqjKqMg7nWHrVh2a4kfEB2yh_Z-1PUfPh4s6XZDwEhtE4PrNZJLWFdL7ev64oGVrIYOno1RxN1euAMkn2WBZ59WxhhPu-Z3subjZzE"
                alt="비타민마취통증의학과 진료안내"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 pointer-events-none" />
            </div>
            <div className="absolute inset-0 flex flex-col gap-6 items-start justify-end p-6 md:p-12">
              <div className="flex flex-col gap-3 text-left max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  비타민마취통증의학과<br />진료 과목 안내
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg">
                  최첨단 비수술 치료로 통증을 관리하고 건강한 일상을 되찾아 드립니다.
                </h2>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-10 text-center">
            <h2 className="text-black text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">
              진료 과목 안내
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              비타민마취통증의학과는 척추와 관절 통증에 대한 비수술적 치료를 중심으로 다양한 통증 질환을 전문적으로 다룹니다.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 척추 클리닉 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#f97316]/10 rounded-full mb-4">
                    <span className="material-symbols-outlined text-4xl text-[#f97316]">personal_injury</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">척추 클리닉</h3>
                  <p className="text-gray-600 mb-4">
                    허리디스크, 목디스크, 척추관협착증 등 다양한 척추 질환에 대한 정밀 진단과 비수술 치료를 제공합니다.
                  </p>
                  <ul className="text-left mt-4 space-y-2 text-gray-600 w-full">
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>신경차단술</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>신경성형술</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>도수치료 및 재활</span>
                    </li>
                  </ul>
                </div>

                {/* 관절 클리닉 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200">
                  <div className="p-3 bg-[#f97316]/10 rounded-full mb-4">
                    <span className="material-symbols-outlined text-4xl text-[#f97316]">personal_injury</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">관절 클리닉</h3>
                  <p className="text-gray-600 mb-4">
                    오십견, 퇴행성관절염, 스포츠 손상 등 어깨, 무릎, 팔꿈치 관절 통증을 효과적으로 치료합니다.
                  </p>
                  <ul className="text-left mt-4 space-y-2 text-gray-600 w-full">
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>관절강내 주사</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>체외충격파(ESWT)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                      <span>프롤로테라피</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
