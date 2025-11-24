'use client';

import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

export default function ServicesPage() {
  return (
    <div className="bg-[#f6f7f8] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4">
          {/* Hero Section */}
          <div className="@container">
            <div className="p-0 @[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCctkdsx-2ft96oX0VlBgkrSjcuYwu5_OLLt9KpkVBeFer2E_5v2-bpdc7MpJnuR4jOJDdU6jGJqROuke_ce8c8HesvMzz8A44nredn2PuIaw94ZLY_KlhpxLYmpTxIRCAYL8EFsakCAXR5QEjdpdO-veF5vEXI6CwcjiGRMtrqjKqMg7nWHrVh2a4kfEB2yh_Z-1PUfPh4s6XZDwEhtE4PrNZJLWFdL7ev64oGVrIYOno1RxN1euAMkn2WBZ59WxhhPu-Z3subjZzE")'
                }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    비타민마취통증의학과
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    최첨단 비수술 치료로 통증을 관리하고 건강한 일상을 되찾아 드립니다.
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f97316] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">진료 예약</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-white/90 text-black text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">문의하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

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
