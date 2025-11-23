'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function NewServices() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: '통증클리닉',
      description: '급성 및 만성 통증에 대한 전문적인 진단과 치료를 제공합니다.',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=600&fit=crop',
    },
    {
      id: '2',
      title: '마취과',
      description: '안전하고 편안한 수술을 위한 마취 서비스를 제공합니다.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
    },
    {
      id: '3',
      title: '재활치료',
      description: '수술 후 회복 및 기능 개선을 위한 맞춤형 재활 프로그램을 제공합니다.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    },
  ]);

  useEffect(() => {
    // 나중에 API에서 데이터 가져오기
    // fetch('/api/treatments')
    //   .then(res => res.json())
    //   .then(data => setServices(data));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <h2 className="text-gray-900 dark:text-gray-200 text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-8 text-center">
        주요 진료 과목
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 p-6 bg-white dark:bg-[#101822] rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{ backgroundImage: `url("${service.image}")` }}
            />
            <div>
              <p className="text-gray-900 dark:text-white text-lg font-bold leading-normal">
                {service.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal mt-1">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
