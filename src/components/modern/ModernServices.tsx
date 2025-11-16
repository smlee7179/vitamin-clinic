'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ModernServices() {
  const [servicesData, setServicesData] = useState({
    services: [
      {
        id: '1',
        title: '통증 치료',
        description: '만성 통증을 효과적으로 치료합니다.',
        icon: 'ri-heart-pulse-line',
        image: '',
      },
      {
        id: '2',
        title: '신경 차단술',
        description: '신경 차단을 통한 통증 완화',
        icon: 'ri-syringe-line',
        image: '',
      },
      {
        id: '3',
        title: '물리치료',
        description: '재활 및 물리치료 프로그램',
        icon: 'ri-pulse-line',
        image: '',
      },
    ],
  });

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const response = await fetch('/api/content?section=services');
        if (response.ok) {
          const data = await response.json();
          if (data && data.services && Array.isArray(data.services) && data.services.length > 0) {
            setServicesData(data);
          }
        }
      } catch (error) {
        console.error('Failed to load services data:', error);
      }
    };
    loadServicesData();
  }, []);

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-orange-50/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">주요 진료 서비스</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            환자 맞춤형 진료 서비스로 통증 없는 일상을 만들어드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                {service.image ? (
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className={`${service.icon} text-7xl text-orange-400`}></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                    <i className={`${service.icon} text-2xl text-orange-600 group-hover:text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
