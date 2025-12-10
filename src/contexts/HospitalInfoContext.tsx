'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HospitalInfo {
  id: string;
  logoUrl: string | null;
  logoAlt: string;
  hospitalName: string;
  address: string;
  phone: string;
  fax: string | null;
  email: string | null;
  representative: string | null;
  businessNumber: string | null;
  copyrightText: string;
}

interface HospitalInfoContextType {
  hospitalInfo: HospitalInfo | null;
  loading: boolean;
}

const HospitalInfoContext = createContext<HospitalInfoContextType>({
  hospitalInfo: null,
  loading: true,
});

export function HospitalInfoProvider({ children }: { children: ReactNode }) {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 한 번만 호출
    fetch('/api/hospital-info')
      .then(res => res.json())
      .then(data => {
        setHospitalInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load hospital info:', err);
        setLoading(false);
      });
  }, []);

  return (
    <HospitalInfoContext.Provider value={{ hospitalInfo, loading }}>
      {children}
    </HospitalInfoContext.Provider>
  );
}

export function useHospitalInfo() {
  return useContext(HospitalInfoContext);
}
