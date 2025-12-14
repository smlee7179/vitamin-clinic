'use client';

import { useEffect, useState } from 'react';
import { useHospitalInfo } from '@/contexts/HospitalInfoContext';

interface StructuredDataProps {
  type: 'organization' | 'medical-clinic' | 'breadcrumb' | 'faq';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const { hospitalInfo } = useHospitalInfo();

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "@id": "https://vitaminpain.com/#organization",
          "name": hospitalInfo?.hospitalName || "비타민 마취통증의학과",
          "alternateName": "Vitamin Pain Clinic",
          "description": "부산 해운대구 노인 친화적 정형외과 및 통증의학과 전문병원",
          "url": "https://vitaminpain.com",
          "logo": hospitalInfo?.logoUrl || "https://vitaminpain.com/icon-192x192.png",
          "image": "https://vitaminpain.com/icon-512x512.png",
          "telephone": hospitalInfo?.phone || "051-469-7581",
          "email": hospitalInfo?.email || "info@vitaminpain.com",
          "faxNumber": hospitalInfo?.fax || undefined,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": hospitalInfo?.address || "부산광역시 해운대구",
            "addressLocality": "해운대구",
            "addressRegion": "부산광역시",
            "postalCode": "",
            "addressCountry": "KR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.1586,
            "longitude": 129.1603
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "13:00"
            }
          ],
          "sameAs": [
            // SNS 링크 추가 가능
          ],
          "medicalSpecialty": [
            "Pain Medicine",
            "Orthopedics",
            "Rheumatology",
            "Physical Medicine and Rehabilitation"
          ],
          "availableService": [
            {
              "@type": "MedicalTherapy",
              "name": "척추 통증 치료"
            },
            {
              "@type": "MedicalTherapy",
              "name": "관절 통증 치료"
            },
            {
              "@type": "MedicalTherapy",
              "name": "신경통 치료"
            },
            {
              "@type": "MedicalTherapy",
              "name": "골다공증 치료"
            },
            {
              "@type": "MedicalTherapy",
              "name": "도수치료 및 물리치료"
            }
          ],
          "priceRange": "$$",
          "hasMap": "https://www.google.com/maps/search/?api=1&query=35.1586,129.1603"
        };

      case 'medical-clinic':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "@id": "https://vitaminpain.com/#clinic",
          "name": hospitalInfo?.hospitalName || "비타민 마취통증의학과",
          "description": "노인 친화적 정형외과 및 통증의학과 전문병원",
          "url": "https://vitaminpain.com",
          "telephone": hospitalInfo?.phone || "051-469-7581",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": hospitalInfo?.address || "부산광역시 해운대구",
            "addressLocality": "해운대구",
            "addressRegion": "부산광역시",
            "postalCode": "",
            "addressCountry": "KR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.1586,
            "longitude": 129.1603
          },
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 09:00-13:00"
          ],
          "medicalSpecialty": ["통증의학과", "정형외과"],
          "availableService": [
            "척추 통증 치료",
            "관절 통증 치료",
            "신경통 치료",
            "골다공증 치료",
            "도수치료 및 물리치료"
          ]
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  );
} 