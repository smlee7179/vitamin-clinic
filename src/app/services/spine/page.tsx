'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import NewHeader from '@/components/new/NewHeader';
import NewFooter from '@/components/new/NewFooter';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface TargetPatient {
  title: string;
  description: string;
}

interface TreatmentMethod {
  title: string;
  description: string;
}

interface ClinicPage {
  id: string;
  clinicType: string;
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features?: string; // JSON string
  targetPatients?: string; // JSON string
  symptoms?: string; // JSON array of strings
  treatmentMethods?: string; // JSON array
}

export default function SpineClinicPage() {
  const [clinicData, setClinicData] = useState<ClinicPage | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [targetPatients, setTargetPatients] = useState<TargetPatient[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [treatmentMethods, setTreatmentMethods] = useState<TreatmentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clinic page data
        const clinicResponse = await fetch('/api/clinic-pages?clinicType=spine');
        if (clinicResponse.ok) {
          const clinicPageData = await clinicResponse.json();
          if (clinicPageData) {
            setClinicData(clinicPageData);
            setFeatures(JSON.parse(clinicPageData.features || '[]'));
            setTargetPatients(JSON.parse(clinicPageData.targetPatients || '[]'));
            setSymptoms(JSON.parse(clinicPageData.symptoms || '[]'));
            setTreatmentMethods(JSON.parse(clinicPageData.treatmentMethods || '[]'));
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default fallback data
  const defaultData = {
    heroImageUrl: '',
    heroTitle: '',
    heroSubtitle: '',
    description: ''
  };

  const displayData = clinicData || defaultData;

  // 아이콘 이름을 SVG 컴포넌트로 변환하는 함수
  const getIconSvg = (iconName: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      shield: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      flask: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      ),
      heart: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      star: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      ),
      check: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    };

    return icons[iconName] || icons.shield;
  };

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <NewHeader />

      <main className="flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4">
          {/* Hero Section */}
          <section className="w-full relative">
            <div className="w-full h-[400px] md:h-[480px] relative overflow-hidden rounded-xl bg-gray-900">
              <Image
                src={displayData.heroImageUrl}
                alt={displayData.heroTitle}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none" />
            </div>
            <div className="absolute inset-0 flex flex-col gap-6 items-center justify-end p-6 md:p-12">
              <div className="flex flex-col gap-3 text-center max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-5xl whitespace-pre-wrap">
                  {displayData.heroTitle}
                </h1>
                <h2 className="text-white text-base font-normal leading-normal md:text-lg whitespace-pre-wrap">
                  {displayData.heroSubtitle}
                </h2>
              </div>
            </div>
          </section>

          {/* Clinic Introduction */}
          <section className="w-full py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[#343A40] text-2xl md:text-3xl font-bold text-center mb-8">
                척추클리닉이란?
              </h2>

              {/* Main Description */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
                <p className="text-gray-700 leading-relaxed text-base mb-6 whitespace-pre-wrap">
                  {displayData.description}
                </p>

                {/* Key Features Cards (inside text box) */}
                {features.length > 0 && (
                  <div className={`grid gap-4 mt-8 pt-6 border-t border-gray-200 ${
                    features.length === 1
                      ? 'grid-cols-1 max-w-2xl mx-auto'
                      : features.length === 2
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 md:grid-cols-3'
                  }`}>
                    {features.map((feature, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-6">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {getIconSvg(feature.icon)}
                          </svg>
                        </div>
                        <h3 className="font-bold text-lg text-[#343A40] mb-3">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Target Patients */}
          {targetPatients.length > 0 && (
            <section className="w-full pb-8 md:pb-12">
              <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
                주요 진료
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {targetPatients.map((patient, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-lg text-[#D4AF37] mb-2">
                      {patient.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {patient.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Symptoms Checklist */}
          {symptoms.length > 0 && (
            <section className="w-full pb-8 md:pb-12">
              <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
                이런 증상이 있다면 방문하세요
              </h3>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#f97316]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {symptom}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Treatment Methods */}
          {treatmentMethods.length > 0 && (
            <section className="w-full pb-12 md:pb-16">
              <h3 className="text-[#343A40] text-xl md:text-2xl font-bold text-center mb-8">
                비타민 마취통증의학과 치료 방법
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {treatmentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-lg text-[#343A40] mb-3">
                      {method.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
