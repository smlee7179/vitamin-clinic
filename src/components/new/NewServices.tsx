'use client';

import { useState, useEffect } from 'react';

interface Treatment {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function NewServices() {
  const [services, setServices] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-[#111418] text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-8 text-center">
          주요 진료 과목
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm animate-pulse"
            >
              <div className="w-full aspect-video bg-gray-200 rounded-lg" />
              <div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <h2 className="text-[#111418] text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-8 text-center">
        주요 진료 과목
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-full aspect-video bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-lg">
              <span className="text-6xl">{service.icon}</span>
            </div>
            <div>
              <p className="text-[#111418] text-lg font-bold leading-normal">
                {service.title}
              </p>
              <p className="text-[#617289] text-sm font-normal leading-normal mt-1">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
