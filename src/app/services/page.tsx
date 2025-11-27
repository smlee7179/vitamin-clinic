'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  details: string;
  order: number;
  active: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        // Filter active services and sort by order
        const activeServices = data
          .filter((service: Service) => service.active)
          .sort((a: Service, b: Service) => a.order - b.order);
        setServices(activeServices);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Parse details JSON string to array
  const parseDetails = (details: string): string[] => {
    try {
      return JSON.parse(details);
    } catch {
      return [];
    }
  };

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

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="max-w-md mx-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">medical_services</span>
                <p className="text-gray-500">등록된 진료 과목이 없습니다.</p>
                <p className="text-sm text-gray-400 mt-2">관리자 페이지에서 진료 과목을 추가해주세요.</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="p-3 bg-[#f97316]/10 rounded-full mb-4">
                        <span className="material-symbols-outlined text-4xl text-[#f97316]">
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      {parseDetails(service.details).length > 0 && (
                        <ul className="text-left mt-4 space-y-2 text-gray-600 w-full">
                          {parseDetails(service.details).map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="material-symbols-outlined text-sm text-[#f97316] mr-2 mt-1">check_circle</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
