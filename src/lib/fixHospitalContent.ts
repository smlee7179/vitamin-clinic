// hospitalContent 구조 자동 보정 함수 및 타입 정의
export interface HospitalContent {
  hero: {
    title: string;
    subtitle: string;
    mainButton: string;
    secondButton: string;
    backgroundImage: string;
    backgroundImageFile: string;
  };
  services: {
    title: string;
    subtitle: string;
    orthopedic: {
      title: string;
      description: string;
      items: string[];
      image: string;
      imageFile: string;
    };
    anesthesia: {
      title: string;
      description: string;
      items: string[];
      image: string;
      imageFile: string;
    };
    rehabilitation: {
      title: string;
      description: string;
      items: string[];
      image: string;
      imageFile: string;
    };
  };
  doctors: {
    title: string;
    subtitle: string;
    list: Array<{
      name: string;
      position: string;
      career: string[];
      image: string;
      imageFile: string;
    }>;
  };
  facilities: {
    title: string;
    subtitle: string;
    list: Array<{
      name: string;
      description: string;
      image: string;
      imageFile: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    hours: {
      weekday: string;
      saturday: string;
      sunday: string;
    };
    parking: string;
    subway: string;
    bus: string;
  };
  footer: {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    businessNumber: string;
    representative: string;
    copyright: string;
    links: {
      privacy: string;
      terms: string;
      sitemap: string;
    };
  };
}

const DEFAULT: HospitalContent = {
  hero: {
    title: '건강한 삶을 위한\n전문적인 치료',
    subtitle: '부산 정형외과 전문 비타민마취통증의학과의원에서\n정확한 진단과 효과적인 치료를 받으세요',
    mainButton: '진료 예약하기',
    secondButton: '진료과목 보기',
    backgroundImage: 'Modern medical facility interior with warm orange lighting, clean and professional orthopedic clinic waiting area, comfortable seating, large windows with natural light, elderly-friendly design, Korean hospital atmosphere, warm and welcoming environment, medical equipment visible in background, professional healthcare setting',
    backgroundImageFile: ''
  },
  services: {
    title: '주요 진료과목',
    subtitle: '전문적이고 체계적인 치료로 건강을 회복하세요',
    orthopedic: {
      title: '정형외과',
      description: '관절염, 골절, 척추질환 등 근골격계 질환의 전문적인 진단과 치료',
      items: ['관절염 치료', '척추질환 치료', '골절 치료', '스포츠 외상'],
      image: '',
      imageFile: ''
    },
    anesthesia: {
      title: '마취통증의학과',
      description: '다양한 통증 질환의 정확한 진단과 효과적인 치료',
      items: ['만성 통증 치료', '신경차단술', '근막동통증후군', '대상포진 후 신경통'],
      image: '',
      imageFile: ''
    },
    rehabilitation: {
      title: '재활의학과',
      description: '기능 회복과 삶의 질 향상을 위한 전문적인 재활치료',
      items: ['물리치료', '작업치료', '운동치료', '전기치료'],
      image: '',
      imageFile: ''
    }
  },
  doctors: {
    title: '의료진 소개',
    subtitle: '풍부한 경험과 전문성을 갖춘 의료진이 함께합니다',
    list: [
      { name: '', position: '', career: [], image: '', imageFile: '' },
      { name: '', position: '', career: [], image: '', imageFile: '' },
      { name: '', position: '', career: [], image: '', imageFile: '' }
    ]
  },
  facilities: {
    title: '시설 안내',
    subtitle: '최신 의료장비와 편리한 시설로 최상의 진료를 제공합니다',
    list: [
      { name: '', description: '', image: '', imageFile: '' },
      { name: '', description: '', image: '', imageFile: '' },
      { name: '', description: '', image: '', imageFile: '' },
      { name: '', description: '', image: '', imageFile: '' }
    ]
  },
  contact: {
    title: '오시는 길',
    subtitle: '지하철역과 가깝습니다.',
    address: '부산 동구 중앙대로 375 (수정동) 강남빌딩 3층',
    phone: '051-469-7581',
    hours: {
      weekday: '평일: 09:00 - 18:00',
      saturday: '토요일: 09:00 - 13:00',
      sunday: '일요일 및 공휴일: 휴진'
    },
    parking: '주차장 1시간 지원',
    subway: '1호선 부산진역 7번 출구 도보 5분',
    bus: '해운대역 정류장 하차 후 도보 3분'
  },
  footer: {
    companyName: '비타민마취통증의학과의원',
    address: '부산 동구 중앙대로 375 (수정동) 강남빌딩 3층',
    phone: '051-469-7581',
    email: 'info@vitamin-clinic.co.kr',
    businessNumber: '123-45-67890',
    representative: '김철수',
    copyright: '© 2024 비타민마취통증의학과의원. All rights reserved.',
    links: {
      privacy: '/privacy',
      terms: '/terms',
      sitemap: '/sitemap'
    }
  }
};

export function fixHospitalContent(content: any): HospitalContent {
  return {
    hero: { ...DEFAULT.hero, ...(content.hero || {}) },
    services: {
      ...DEFAULT.services,
      ...(content.services || {}),
      orthopedic: { ...DEFAULT.services.orthopedic, ...((content.services && content.services.orthopedic) || {}) },
      anesthesia: { ...DEFAULT.services.anesthesia, ...((content.services && content.services.anesthesia) || {}) },
      rehabilitation: { ...DEFAULT.services.rehabilitation, ...((content.services && content.services.rehabilitation) || {}) },
    },
    doctors: {
      ...DEFAULT.doctors,
      ...(content.doctors || {}),
      list: (content.doctors && content.doctors.list) ? content.doctors.list.map((d: any) => ({ ...DEFAULT.doctors.list[0], ...d })) : DEFAULT.doctors.list
    },
    facilities: {
      ...DEFAULT.facilities,
      ...(content.facilities || {}),
      list: (content.facilities && content.facilities.list) ? content.facilities.list.map((f: any) => ({ ...DEFAULT.facilities.list[0], ...f })) : DEFAULT.facilities.list
    },
    contact: {
      ...DEFAULT.contact,
      ...(content.contact || {}),
      hours: { ...DEFAULT.contact.hours, ...((content.contact && content.contact.hours) || {}) }
    },
    footer: {
      ...DEFAULT.footer,
      ...(content.footer || {}),
      links: { ...DEFAULT.footer.links, ...((content.footer && content.footer.links) || {}) }
    }
  };
} 