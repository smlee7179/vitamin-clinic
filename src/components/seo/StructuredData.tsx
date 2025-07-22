'use client';

interface StructuredDataProps {
  type: 'organization' | 'medical-clinic' | 'breadcrumb' | 'faq';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "비타민 의원",
          "alternateName": "Vitamin Clinic",
          "description": "부산 해운대구 노인 친화적 정형외과 전문병원",
          "url": "https://vitamin-clinic.com",
          "logo": "https://vitamin-clinic.com/images/logo.png",
          "image": "https://vitamin-clinic.com/images/clinic-exterior.jpg",
          "telephone": "+82-51-123-4567",
          "email": "info@vitamin-clinic.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "해운대로 123",
            "addressLocality": "해운대구",
            "addressRegion": "부산광역시",
            "postalCode": "48000",
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
          "sameAs": [
            "https://www.instagram.com/vitamin_clinic",
            "https://blog.naver.com/vitamin_clinic"
          ],
          "medicalSpecialty": [
            "정형외과",
            "관절염 치료",
            "척추질환",
            "골다공증"
          ],
          "availableService": [
            {
              "@type": "MedicalProcedure",
              "name": "관절염 치료"
            },
            {
              "@type": "MedicalProcedure", 
              "name": "척추질환 치료"
            },
            {
              "@type": "MedicalProcedure",
              "name": "골다공증 치료"
            }
          ]
        };

      case 'medical-clinic':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "비타민 의원",
          "description": "노인 친화적 정형외과 전문병원",
          "url": "https://vitamin-clinic.com",
          "telephone": "+82-51-123-4567",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "해운대로 123",
            "addressLocality": "해운대구", 
            "addressRegion": "부산광역시",
            "postalCode": "48000",
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
          "medicalSpecialty": "정형외과",
          "availableService": [
            "관절염 치료",
            "척추질환 치료", 
            "골다공증 치료",
            "재활치료"
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