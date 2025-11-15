'use client';

import { useState, useEffect } from 'react';

interface Service {
  icon: string;
  title: string;
  desc: string;
  image?: string;
}

interface ServicesData {
  title?: string;
  subtitle?: string;
  orthopedic?: { title: string; description: string; icon: string; image?: string };
  anesthesia?: { title: string; description: string; icon: string; image?: string };
  rehabilitation?: { title: string; description: string; icon: string; image?: string };
}

const defaultServices: Service[] = [
  { icon: '🦴', title: '정형외과', desc: '무릎, 어깨, 손목 등 관절 질환 전문 치료' },
  { icon: '💉', title: '마취통증의학과', desc: '만성 통증 및 급성 통증 치료' },
  { icon: '🏃', title: '재활의학과', desc: '맞춤 재활 프로그램 및 운동 치료' },
];

export default function ServiceCards() {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/content?section=services');
        if (response.ok) {
          const data: ServicesData = await response.json();
          if (data && Object.keys(data).length > 0) {
            // ServicesData를 Service[] 형태로 변환
            const servicesArray: Service[] = [];

            if (data.orthopedic) {
              servicesArray.push({
                icon: data.orthopedic.icon || '🦴',
                title: data.orthopedic.title,
                desc: data.orthopedic.description,
                image: data.orthopedic.image,
              });
            }

            if (data.anesthesia) {
              servicesArray.push({
                icon: data.anesthesia.icon || '💉',
                title: data.anesthesia.title,
                desc: data.anesthesia.description,
                image: data.anesthesia.image,
              });
            }

            if (data.rehabilitation) {
              servicesArray.push({
                icon: data.rehabilitation.icon || '🏃',
                title: data.rehabilitation.title,
                desc: data.rehabilitation.description,
                image: data.rehabilitation.image,
              });
            }

            if (servicesArray.length > 0) {
              setServices(servicesArray);
            }
          }
        }
      } catch (error) {
        console.error('Error loading services:', error);
        // Keep default services on error
      }
    };

    loadServices();
  }, []);


  return (
    <section className="section bg-white">
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-display-1 md:text-4xl text-neutral-900 mb-3">진료과목</h2>
          <p className="text-body-1 text-neutral-600">환자분들께 최상의 진료 서비스를 제공합니다</p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="card hover:shadow-md transition-all duration-normal"
            >
              {/* 아이콘/이미지 */}
              {service.image ? (
                <div className="w-12 h-12 mb-4 rounded-md overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 mb-4 rounded-md bg-vitamin-50 flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              )}

              {/* 제목 */}
              <h3 className="text-display-2 text-neutral-900 mb-2">
                {service.title}
              </h3>

              {/* 설명 */}
              <p className="text-body-2 text-neutral-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
