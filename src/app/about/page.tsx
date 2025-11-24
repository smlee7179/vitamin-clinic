'use client';

import { useState, useEffect } from 'react';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  photoUrl: string | null;
  education: string;
  career: string;
  order: number;
}

export default function AboutPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main>
        {/* Hero Section */}
        <section
          className="min-h-[480px] flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEvT0RCsOOUU4RQkVcUJOlQoCxEc7RFWZ7CRkAvr5eUigZKCdBugReAIFNL-1IVahADzOYLbxzkm7_sxcCFOVVrXUu64h0mweifH7xCsKS3MkjhsYqZnWdSOjOgpaHRgAc-kYzPoxCqU5Akjdr775rljufqNCSOeSgbLTnCXTO7_E4KlRHcU34T8bg1ePxkomRqqTve53qko_PoE96KX0sR6K4cJmUp74AlKq7StbBUV5R8ywM0oCH5tUcN5qtsHWP0m1WXZ0WCSnZ")'
          }}
        >
          <div className="flex flex-col gap-2 text-center max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
              통증 없는 건강한 삶, 비타민이 함께합니다
            </h1>
            <h2 className="text-white/90 text-base md:text-lg font-normal leading-normal">
              환자 중심의 따뜻하고 전문적인 통증 치료를 약속합니다.
            </h2>
          </div>
        </section>

        {/* Greeting Section */}
        <section className="bg-[#f8f7f5] px-4 md:px-10 py-16 md:py-20">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="w-full md:w-1/3">
                <img
                  alt="병원 내부 사진"
                  className="w-full h-auto object-cover rounded-lg aspect-square"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACJ6rVG0bW9U7VfgrNWfNJw4pgjTorthRESmONfucJg_tNnp8u9LG2896HF3jDrnCSPDRoQWxHT0sV19CWzIjVca7q8PqvhadeoP4vOUfXaTcMTXzjA8dWM0MhigfqTnkb5Fkv9Ee3_forM-MTaPkeO9ZOIH0HDCpXgHD3882pwHIpfJkHh988d8SaBVdlnyy4FYBX4HF7ZhUQKM4kUZ9T8ch8J8SZ7aQnRELMXTRN5m3UlOM3_h_4XW84N4GKFZl2D6MVntjcUNto"
                />
              </div>
              <div className="flex flex-col gap-4 w-full md:w-2/3">
                <h2 className="text-[#343A40] tracking-tight text-2xl md:text-3xl font-bold leading-tight">
                  인사말
                </h2>
                <p className="text-gray-600 text-base font-normal leading-relaxed">
                  안녕하십니까? 비타민마취통증의학과에 오신 것을 진심으로 환영합니다.<br />
                  저희 병원은 환자 한 분 한 분의 목소리에 귀 기울이고, 최신 의료 지식과 기술을 바탕으로 정확한 진단과 효과적인 치료를 제공하기 위해 최선을 다하고 있습니다. 통증으로 고통받는 모든 분들이 건강한 일상을 되찾을 수 있도록 따뜻한 마음으로 함께하겠습니다. 감사합니다.
                </p>
                <p className="text-right font-bold text-lg text-[#343A40] mt-4">
                  원장 홍길동
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Staff Section */}
        {doctors.length > 0 && (
          <section className="px-4 md:px-10 py-16 md:py-20 bg-[#f8f7f5]">
            <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
              의료진 소개
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              비타민마취통증의학과의 분야별 전문 의료진이 환자 여러분의 건강한 삶을 위해 최선을 다하고 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1140px] mx-auto">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB]"
                >
                  {doctor.photoUrl && (
                    <img
                      className="w-32 h-32 rounded-full object-cover mb-4"
                      src={doctor.photoUrl}
                      alt={doctor.name}
                    />
                  )}
                  <h3 className="font-bold text-lg text-[#343A40]">
                    {doctor.name}
                  </h3>
                  <p className="text-[#F97316] font-medium text-sm">
                    {doctor.specialty}
                  </p>
                  {(doctor.education || doctor.career) && (
                    <ul className="text-gray-500 text-sm mt-3 text-left list-disc list-inside space-y-1">
                      {doctor.education && doctor.education.split('\n').map((line, idx) => (
                        line.trim() && <li key={`edu-${idx}`}>{line.trim()}</li>
                      ))}
                      {doctor.career && doctor.career.split('\n').map((line, idx) => (
                        line.trim() && <li key={`career-${idx}`}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hospital Staff Section */}
        <section className="bg-white px-4 md:px-10 py-16 md:py-20">
          <h2 className="text-[#343A40] text-[28px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 text-center">
            병원을 만드는 사람들
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            의료진 외에도 각자의 자리에서 병원의 원활한 운영을 위해 힘쓰는 주요 직원들을 소개합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANwTqgmRSLsfW9oCeice9cRX5IgX1Es_rFZTgmy4EoMS4HWdq_RYzVj3CGHTi6OIKWUjqLSjuSpcjeGWdkUOof39GeM6Wz_O-Iyv6VtJAhB6VLFgKrRbCpUZvFoKXAq9ntkc9JxFMXa9Hgp8f6DW1RzR8PxbRANglgGAfRtlgNqwDJ_5CO6OVv72lyXAt81bYax3Ay5CQWorAWkRapZ9mv1q6-TdpZysn6u7wIusb94tCFef6kSqcaS1wJI4LbI62SvCt_h7wYnAv_"
                alt="간호부장 홍길동"
              />
              <div>
                <h4 className="font-bold text-[#343A40]">홍길동</h4>
                <p className="text-sm text-gray-500">간호부장</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHlSzPnacAM_3Ngc6eDmTbuniFl193hk_0uN0arRT5an3KoowFz9br9uA6mqgV1NfkIWA5FvajRznGTpRRv4If9O1eJZxKVCpJhSUxcjPlhSSaFvix_fdFwxUw4MmUothvlVq30APl_O2dbeqDopl7ID7g3LJscm2eVJWhB0BTIjE0gab5M-lHNEb2s6a_QXkhvCY6tv-gkvdbKU0aO6Dpl0XraUkk3UmS4K3kQo-FC2tCYWsjOex2PZxd5wIx7YhjixIr0v0-f0Fy"
                alt="행정부장 임꺽정"
              />
              <div>
                <h4 className="font-bold text-[#343A40]">임꺽정</h4>
                <p className="text-sm text-gray-500">행정부장</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4u4KA7HIS99u2-BzL2zyROAHFAZcPU42mKQaKwpzLXLBSR0O6ot4kqVXuMYaSBS8phEyxvNHSmZVUOt0lT1q84sYD9A7T7tPi3Rb_nFnQrLYumxnl0sZiU-pbG4sIGxRagH7Ei3AwXhJUN6VF3sq7CNk19Zu6LPpTisRQrCKWVEKI0YWNwsPAov4F50zBtfGjogM7nK1nGDCiVwkYxE_pFO4q6OQP2Mg49RG9XKjO7GbAaC4WJrS45raLfMqQhFO4R9DLPLYdfECU"
                alt="약제부장 허준"
              />
              <div>
                <h4 className="font-bold text-[#343A40]">허준</h4>
                <p className="text-sm text-gray-500">약제부장</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJUt4-bE4qkFr74qEbEwPVdqO19sIvB1XGBn77YNHb_cNZkYqTxplZ5FUUt20EhhjnqEQ-bxvIbQtdRrnJYjrtcT-KD85zM7z3LmfTDc3B_cMj32AvbzScgpxMSJC2NUA-XG8QuFesHY-jBnwnv4P1B3X_dG-8EHg7kROok37yQqX7boFFpSCcrTHi3abrZ_YajEbatz8Czw_WpO867M7VqsEcHZSrn26IvaDa3jnqmjxnYdtwXO6O1ufpf59Z12SwSl-gQ4yphW1P"
                alt="홍보팀장 장금이"
              />
              <div>
                <h4 className="font-bold text-[#343A40]">장금이</h4>
                <p className="text-sm text-gray-500">홍보팀장</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
}
