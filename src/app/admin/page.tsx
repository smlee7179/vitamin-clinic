
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Doctor {
  name: string;
  position: string;
  career: string[];
  image: string;
  imageFile: string;
}
interface Facility {
  name: string;
  description: string;
  image: string;
  imageFile: string;
}
interface ContentData {
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
    list: Doctor[];
  };
  facilities: {
    title: string;
    subtitle: string;
    list: Facility[];
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
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  const DEFAULT_CONTENT_DATA: ContentData = {
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
      subtitle: '편리한 교통과 주차시설을 제공합니다',
      address: '부산광역시 해운대구 중동 1394-65 비타민빌딩 3층',
      phone: '051-746-7582',
      hours: {
        weekday: '평일: 09:00 - 18:00',
        saturday: '토요일: 09:00 - 13:00',
        sunday: '일요일 및 공휴일: 휴진'
      },
      parking: '건물 지하 주차장 이용 가능',
      subway: '2호선 해운대역 3번 출구 도보 5분',
      bus: '해운대역 정류장 하차 후 도보 3분'
    }
  };
  // 1. 상태 선언
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 2. 초기 로딩
  useEffect(() => {
    if (!hydrated) return;
    
    try {
      const saved = localStorage.getItem('hospitalContent');
      console.log('hospitalContent(localStorage):', saved);
      if (saved) {
        setContentData(JSON.parse(saved));
        console.log('setContentData: loaded from localStorage');
      } else {
        setContentData(DEFAULT_CONTENT_DATA);
        console.log('setContentData: DEFAULT_CONTENT_DATA');
      }
    } catch (e) {
      setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
      console.log('setError:', e);
    }
  }, [hydrated]);

  // 3. 저장
  useEffect(() => {
    if (contentData) {
      try {
        localStorage.setItem('hospitalContent', JSON.stringify(contentData));
      } catch (e) {
        setError('로컬 저장소 용량이 초과되었습니다. 이미지를 줄여주세요.');
      }
    }
  }, [contentData]);

  // 4. 여러 탭 동기화
  useEffect(() => {
    if (!hydrated) return;
    
    const loadData = () => {
      try {
        const saved = localStorage.getItem('hospitalContent');
        if (saved) setContentData(JSON.parse(saved));
      } catch (e) {
        setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
      }
    };
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [hydrated]);

  // 5. 이미지 업로드/변경/삭제
  const handleImageUpload = (key: string, fileOrUrl: File | string, updateField: (imgKey: string) => void) => {
    if (typeof fileOrUrl === 'string') {
      try {
        localStorage.setItem(key, fileOrUrl);
        updateField(key);
      } catch (e) {
        setError('로컬 저장소 용량이 초과되었습니다. 이미지를 줄여주세요.');
      }
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        localStorage.setItem(key, e.target?.result as string);
        updateField(key);
      } catch (err) {
        setError('로컬 저장소 용량이 초과되었습니다. 이미지를 줄여주세요.');
      }
    };
    reader.readAsDataURL(fileOrUrl);
  };
  const handleImageDelete = (key: string, updateField: () => void) => {
    try {
      localStorage.removeItem(key);
      updateField();
    } catch (e) {
      setError('이미지 삭제 중 오류가 발생했습니다.');
    }
  };

  // 6. 이미지 렌더링 함수
  const getImageSrc = (key: string | undefined, fallback: string) => {
    if (!key || !hydrated) return fallback;
    try {
      const img = localStorage.getItem(key);
      return img || fallback;
    } catch {
      return fallback;
    }
  };

  const handleLogin = () => {
    if (password === 'vitamin2024') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSave = () => {
    localStorage.setItem('hospitalContent', JSON.stringify(contentData));
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const updateContent = (section: string, field: string, value: string | string[]) => {
    setContentData(prev => {
      const base = prev ?? DEFAULT_CONTENT_DATA;
      if (section === 'hero') {
        return {
          hero: { ...base.hero, [field]: value },
          services: { ...base.services },
          doctors: { ...base.doctors },
          facilities: { ...base.facilities },
          contact: { ...base.contact }
        };
      }
      if (section === 'services') {
        return {
          hero: { ...base.hero },
          services: { ...base.services, [field]: value },
          doctors: { ...base.doctors },
          facilities: { ...base.facilities },
          contact: { ...base.contact }
        };
      }
      if (section === 'doctors') {
        return {
          hero: { ...base.hero },
          services: { ...base.services },
          doctors: { ...base.doctors, [field]: value },
          facilities: { ...base.facilities },
          contact: { ...base.contact }
        };
      }
      if (section === 'facilities') {
        return {
          hero: { ...base.hero },
          services: { ...base.services },
          doctors: { ...base.doctors },
          facilities: { ...base.facilities, [field]: value },
          contact: { ...base.contact }
        };
      }
      if (section === 'contact') {
        return {
          hero: { ...base.hero },
          services: { ...base.services },
          doctors: { ...base.doctors },
          facilities: { ...base.facilities },
          contact: { ...base.contact, [field]: value }
        };
      }
      return base;
    });
  };

  // updateNestedContent 함수 시그니처를 (section, subsection, field, value)로 유지하되, 배열 접근이 필요한 경우 field에 인덱스와 실제 필드명을 객체로 넘김
  const updateNestedContent = (section: string, subsection: string, field: any, value: string | string[]) => {
    setContentData(prev => {
      const base = prev ?? DEFAULT_CONTENT_DATA;
      // 깊은 복사
      let hero = { ...base.hero };
      let services = { ...base.services };
      let doctors = { ...base.doctors };
      let facilities = { ...base.facilities };
      let contact = { ...base.contact };

      if (section === 'doctors' && subsection === 'list' && typeof field === 'object' && field !== null && 'index' in field && 'key' in field) {
        const newList = [...doctors.list];
        newList[field.index] = { ...newList[field.index], [field.key]: value };
        doctors = { ...doctors, list: newList };
      } else if (section === 'facilities' && subsection === 'list' && typeof field === 'object' && field !== null && 'index' in field && 'key' in field) {
        const newList = [...facilities.list];
        newList[field.index] = { ...newList[field.index], [field.key]: value };
        facilities = { ...facilities, list: newList };
      } else {
        // 기타 일반 필드
        if (section === 'hero') hero = { ...hero, [subsection]: { ...hero[subsection], [field]: value } };
        if (section === 'services') services = { ...services, [subsection]: { ...services[subsection], [field]: value } };
        if (section === 'doctors') doctors = { ...doctors, [subsection]: { ...doctors[subsection], [field]: value } };
        if (section === 'facilities') facilities = { ...facilities, [subsection]: { ...facilities[subsection], [field]: value } };
        if (section === 'contact') contact = { ...contact, [subsection]: { ...contact[subsection], [field]: value } };
      }
      return { hero, services, doctors, facilities, contact };
    });
  };

  // 7. 렌더링 조건
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">관리자 페이지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
          <h2 className="text-2xl font-bold mb-4 text-center">관리자 로그인</h2>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
          />
          <button
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <i className="ri-settings-3-line text-white text-xl"></i>
              </div>
              <h1 className="text-xl font-bold text-gray-900">홈페이지 관리자</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors cursor-pointer">
                <i className="ri-home-line mr-2"></i>
                홈페이지 보기
              </Link>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line mr-2"></i>
                저장하기
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <i className="ri-check-line mr-2"></i>
          변경사항이 저장되었습니다!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">페이지 섹션</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('hero')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'hero' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-home-line mr-2"></i>
                  메인 화면
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'services' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-hospital-line mr-2"></i>
                  진료과목
                </button>
                <button
                  onClick={() => setActiveTab('doctors')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'doctors' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-user-line mr-2"></i>
                  의료진 소개
                </button>
                <button
                  onClick={() => setActiveTab('facilities')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'facilities' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-building-line mr-2"></i>
                  시설 안내
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'contact' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className="ri-map-pin-line mr-2"></i>
                  오시는 길
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'hero' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">메인 화면 설정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">메인 제목</label>
                    <textarea
                      value={contentData.hero.title}
                      onChange={(e) => updateContent('hero', 'title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">부제목</label>
                    <textarea
                      value={contentData.hero.subtitle}
                      onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">첫 번째 버튼 텍스트</label>
                      <input
                        type="text"
                        value={contentData.hero.mainButton}
                        onChange={(e) => updateContent('hero', 'mainButton', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">두 번째 버튼 텍스트</label>
                      <input
                        type="text"
                        value={contentData.hero.secondButton}
                        onChange={(e) => updateContent('hero', 'secondButton', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  {/* hero 섹션 내 ImageUploadComponent 대신 아래 UI로 대체 */}
                  <div className="relative w-64 h-40 mb-4 flex flex-col items-center">
                    <img
                      src={getImageSrc(contentData.hero.backgroundImageFile, 'https://readdy.ai/api/search-image?query=Modern%20medical%20facility%20interior&width=640&height=400&seq=hero-bg-1&orientation=landscape')}
                      alt="배경 이미지"
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <div className="flex flex-col gap-1 mt-2 w-full">
                      <input
                        id="hero-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => e.target.files && handleImageUpload('image_hero_bg', e.target.files[0], (key) => setContentData(prev => {
                          const base = prev ?? DEFAULT_CONTENT_DATA;
                          return {
                            hero: { ...base.hero, backgroundImageFile: key },
                            services: { ...base.services },
                            doctors: { ...base.doctors },
                            facilities: { ...base.facilities },
                            contact: { ...base.contact }
                          };
                        }))}
                      />
                      <label htmlFor="hero-image-upload" className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                        이미지 업로드/변경
                      </label>
                      <input
                        type="text"
                        placeholder="이미지 URL 입력(선택)"
                        value={(() => {
                          const key = contentData.hero.backgroundImageFile;
                          if (key) {
                            const img = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
                            if (img) return img;
                          }
                          return '';
                        })()}
                        onChange={e => handleImageUpload(e.target.value, '', () => {})}
                        className="w-full px-2 py-1 border rounded text-xs"
                      />
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                        onClick={() => handleImageDelete(contentData.hero.backgroundImageFile, () => setContentData(prev => {
                          const base = prev ?? DEFAULT_CONTENT_DATA;
                          return {
                            hero: { ...base.hero, backgroundImageFile: '' },
                            services: { ...base.services },
                            doctors: { ...base.doctors },
                            facilities: { ...base.facilities },
                            contact: { ...base.contact }
                          };
                        }))}
                        disabled={!contentData.hero.backgroundImageFile}
                      >
                        이미지 삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">진료과목 설정</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 제목</label>
                      <input
                        type="text"
                        value={contentData.services.title}
                        onChange={(e) => updateContent('services', 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 부제목</label>
                      <input
                        type="text"
                        value={contentData.services.subtitle}
                        onChange={(e) => updateContent('services', 'subtitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* 정형외과 */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">정형외과</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">과목명</label>
                        <input
                          type="text"
                          value={contentData.services.orthopedic.title}
                          onChange={(e) => updateNestedContent('services', 'orthopedic', 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                        <textarea
                          value={contentData.services.orthopedic.description}
                          onChange={(e) => updateNestedContent('services', 'orthopedic', 'description', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">치료 항목 (줄바꿈으로 구분)</label>
                        <textarea
                          value={contentData.services.orthopedic.items.join('\n')}
                          onChange={(e) => updateNestedContent('services', 'orthopedic', 'items', e.target.value.split('\n'))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={4}
                        />
                      </div>
                      {/* ImageUploadComponent 대신 아래 UI로 대체 */}
                      <div className="relative w-32 h-32 mb-4 flex flex-col items-center">
                        <img
                          src={getImageSrc(contentData.services.orthopedic.imageFile, 'https://readdy.ai/api/search-image?query=orthopedic&width=320&height=320&seq=orthopedic-1')}
                          alt="정형외과 이미지"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <div className="flex flex-col gap-1 mt-2 w-full">
                          <input
                            id={`orthopedic-image-upload`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && handleImageUpload(`image_services_orthopedic`, e.target.files[0], (key) => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, orthopedic: { ...base.services.orthopedic, imageFile: key } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                          />
                          <label htmlFor={`orthopedic-image-upload`} className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                            이미지 업로드/변경
                          </label>
                          <input
                            type="text"
                            placeholder="이미지 URL 입력(선택)"
                            value={(() => {
                              const key = contentData.services.orthopedic.imageFile;
                              if (key) {
                                const img = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
                                if (img) return img;
                              }
                              return '';
                            })()}
                            onChange={e => handleImageUpload(e.target.value, '', () => {})}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                            onClick={() => handleImageDelete(contentData.services.orthopedic.imageFile, () => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, orthopedic: { ...base.services.orthopedic, imageFile: '' } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                            disabled={!contentData.services.orthopedic.imageFile}
                          >
                            이미지 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 마취통증의학과 */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">마취통증의학과</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">과목명</label>
                        <input
                          type="text"
                          value={contentData.services.anesthesia.title}
                          onChange={(e) => updateNestedContent('services', 'anesthesia', 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                        <textarea
                          value={contentData.services.anesthesia.description}
                          onChange={(e) => updateNestedContent('services', 'anesthesia', 'description', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">치료 항목 (줄바꿈으로 구분)</label>
                        <textarea
                          value={contentData.services.anesthesia.items.join('\n')}
                          onChange={(e) => updateNestedContent('services', 'anesthesia', 'items', e.target.value.split('\n'))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={4}
                        />
                      </div>
                      {/* ImageUploadComponent 대신 아래 UI로 대체 */}
                      <div className="relative w-32 h-32 mb-4 flex flex-col items-center">
                        <img
                          src={getImageSrc(contentData.services.anesthesia.imageFile, 'https://readdy.ai/api/search-image?query=anesthesia&width=320&height=320&seq=anesthesia-1')}
                          alt="마취통증의학과 이미지"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <div className="flex flex-col gap-1 mt-2 w-full">
                          <input
                            id={`anesthesia-image-upload`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && handleImageUpload(`image_services_anesthesia`, e.target.files[0], (key) => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, anesthesia: { ...base.services.anesthesia, imageFile: key } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                          />
                          <label htmlFor={`anesthesia-image-upload`} className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                            이미지 업로드/변경
                          </label>
                          <input
                            type="text"
                            placeholder="이미지 URL 입력(선택)"
                            value={(() => {
                              const key = contentData.services.anesthesia.imageFile;
                              if (key) {
                                const img = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
                                if (img) return img;
                              }
                              return '';
                            })()}
                            onChange={e => handleImageUpload(e.target.value, '', () => {})}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                            onClick={() => handleImageDelete(contentData.services.anesthesia.imageFile, () => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, anesthesia: { ...base.services.anesthesia, imageFile: '' } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                            disabled={!contentData.services.anesthesia.imageFile}
                          >
                            이미지 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 재활의학과 */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">재활의학과</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">과목명</label>
                        <input
                          type="text"
                          value={contentData.services.rehabilitation.title}
                          onChange={(e) => updateNestedContent('services', 'rehabilitation', 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                        <textarea
                          value={contentData.services.rehabilitation.description}
                          onChange={(e) => updateNestedContent('services', 'rehabilitation', 'description', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">치료 항목 (줄바꿈으로 구분)</label>
                        <textarea
                          value={contentData.services.rehabilitation.items.join('\n')}
                          onChange={(e) => updateNestedContent('services', 'rehabilitation', 'items', e.target.value.split('\n'))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          rows={4}
                        />
                      </div>
                      {/* ImageUploadComponent 대신 아래 UI로 대체 */}
                      <div className="relative w-32 h-32 mb-4 flex flex-col items-center">
                        <img
                          src={getImageSrc(contentData.services.rehabilitation.imageFile, 'https://readdy.ai/api/search-image?query=rehabilitation&width=320&height=320&seq=rehabilitation-1')}
                          alt="재활의학과 이미지"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <div className="flex flex-col gap-1 mt-2 w-full">
                          <input
                            id={`rehabilitation-image-upload`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => e.target.files && handleImageUpload(`image_services_rehabilitation`, e.target.files[0], (key) => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, rehabilitation: { ...base.services.rehabilitation, imageFile: key } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                          />
                          <label htmlFor={`rehabilitation-image-upload`} className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                            이미지 업로드/변경
                          </label>
                          <input
                            type="text"
                            placeholder="이미지 URL 입력(선택)"
                            value={(() => {
                              const key = contentData.services.rehabilitation.imageFile;
                              if (key) {
                                const img = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
                                if (img) return img;
                              }
                              return '';
                            })()}
                            onChange={e => handleImageUpload(e.target.value, '', () => {})}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                            onClick={() => handleImageDelete(contentData.services.rehabilitation.imageFile, () => setContentData(prev => {
                              const base = prev ?? DEFAULT_CONTENT_DATA;
                              return {
                                hero: base.hero,
                                services: { ...base.services, rehabilitation: { ...base.services.rehabilitation, imageFile: '' } },
                                doctors: base.doctors,
                                facilities: base.facilities,
                                contact: base.contact
                              };
                            }))}
                            disabled={!contentData.services.rehabilitation.imageFile}
                          >
                            이미지 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">의료진 소개 설정</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 제목</label>
                      <input
                        type="text"
                        value={contentData.doctors.title}
                        onChange={(e) => updateContent('doctors', 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 부제목</label>
                      <input
                        type="text"
                        value={contentData.doctors.subtitle}
                        onChange={(e) => updateContent('doctors', 'subtitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* 의사 반복문 내 */}
                  {contentData.doctors.list.map((doctor, idx) => (
                    <div key={idx} className="border-t pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{idx + 1}번째 의사</h3>
                      <div className="space-y-4">
                        <div className="relative w-32 h-32 mb-4 flex flex-col items-center">
                          <img
                            src={doctor.imageFile?.trim() ? doctor.imageFile : 'https://readdy.ai/api/search-image?query=doctor&width=320&height=320&seq=doctor-' + (idx+1)}
                            alt={doctor.name || '의사 사진'}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <div className="flex flex-col gap-1 mt-2 w-full">
                            <input
                              id={`doctor-image-upload-${idx}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => e.target.files && handleImageUpload(`image_doctor_${idx}`, e.target.files[0], (key) => setContentData(prev => {
                                const base = prev ?? DEFAULT_CONTENT_DATA;
                                const updatedDoctors = { ...base.doctors, list: [...base.doctors.list] };
                                updatedDoctors.list[idx] = { ...updatedDoctors.list[idx], imageFile: key };
                                return {
                                  hero: { ...base.hero },
                                  services: { ...base.services },
                                  doctors: updatedDoctors,
                                  facilities: { ...base.facilities },
                                  contact: { ...base.contact }
                                };
                              }))}
                            />
                            <label htmlFor={`doctor-image-upload-${idx}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                              이미지 업로드/변경
                            </label>
                            <input
                              type="text"
                              placeholder="이미지 URL 입력(선택)"
                              value={doctor.imageFile}
                              onChange={e => handleImageUpload(e.target.value, '', () => {})}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                              onClick={() => handleImageDelete(doctor.imageFile, () => setContentData(prev => {
                                const base = prev ?? DEFAULT_CONTENT_DATA;
                                const updatedDoctors = { ...base.doctors, list: [...base.doctors.list] };
                                updatedDoctors.list[idx] = {
                                  ...updatedDoctors.list[idx],
                                  imageFile: ''
                                };
                                return {
                                  hero: { ...base.hero },
                                  services: { ...base.services },
                                  doctors: updatedDoctors,
                                  facilities: { ...base.facilities },
                                  contact: { ...base.contact }
                                };
                              }))}
                              disabled={!doctor.imageFile}
                            >
                              이미지 삭제
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                            <input
                              type="text"
                              value={doctor.name}
                              onChange={e => updateNestedContent('doctors', 'list', {index: idx, key: 'name'}, e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">직책</label>
                            <input
                              type="text"
                              value={doctor.position}
                              onChange={e => updateNestedContent('doctors', 'list', {index: idx, key: 'position'}, e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">경력 (줄바꿈으로 구분)</label>
                          <textarea
                            value={doctor.career.join('\n')}
                            onChange={e => updateNestedContent('doctors', 'list', {index: idx, key: 'career'}, e.target.value.split('\n'))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">시설 안내 설정</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 제목</label>
                      <input
                        type="text"
                        value={contentData.facilities.title}
                        onChange={(e) => updateContent('facilities', 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 부제목</label>
                      <input
                        type="text"
                        value={contentData.facilities.subtitle}
                        onChange={(e) => updateContent('facilities', 'subtitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* 시설 반복문 내에도 동일하게 적용 */}
                  {contentData.facilities.list.map((facility, idx) => (
                    <div key={idx} className="border-t pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{idx + 1}번째 시설</h3>
                      <div className="space-y-4">
                        <div className="relative w-32 h-32 mb-4 flex flex-col items-center">
                          <img
                            src={facility.imageFile?.trim() ? facility.imageFile : 'https://readdy.ai/api/search-image?query=facility&width=320&height=320&seq=facility-' + (idx+1)}
                            alt={facility.name || '시설 사진'}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <div className="flex flex-col gap-1 mt-2 w-full">
                            <input
                              id={`facility-image-upload-${idx}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => e.target.files && handleImageUpload(`image_facility_${idx}`, e.target.files[0], (key) => setContentData(prev => {
                                const base = prev ?? DEFAULT_CONTENT_DATA;
                                const updatedFacilities = { ...base.facilities, list: [...base.facilities.list] };
                                updatedFacilities.list[idx] = { ...updatedFacilities.list[idx], imageFile: key };
                                return {
                                  hero: { ...base.hero },
                                  services: { ...base.services },
                                  doctors: { ...base.doctors },
                                  facilities: updatedFacilities,
                                  contact: { ...base.contact }
                                };
                              }))}
                            />
                            <label htmlFor={`facility-image-upload-${idx}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer text-xs font-medium text-center hover:bg-blue-600">
                              이미지 업로드/변경
                            </label>
                            <input
                              type="text"
                              placeholder="이미지 URL 입력(선택)"
                              value={facility.imageFile}
                              onChange={e => handleImageUpload(e.target.value, '', () => {})}
                              className="w-full px-2 py-1 border rounded text-xs"
                            />
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 mt-1"
                              onClick={() => handleImageDelete(facility.imageFile, () => setContentData(prev => {
                                const base = prev ?? DEFAULT_CONTENT_DATA;
                                const updatedFacilities = { ...base.facilities, list: [...base.facilities.list] };
                                updatedFacilities.list[idx] = {
                                  ...updatedFacilities.list[idx],
                                  imageFile: ''
                                };
                                return {
                                  hero: { ...base.hero },
                                  services: { ...base.services },
                                  doctors: { ...base.doctors },
                                  facilities: updatedFacilities,
                                  contact: { ...base.contact }
                                };
                              }))}
                              disabled={!facility.imageFile}
                            >
                              이미지 삭제
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">시설명</label>
                          <input
                            type="text"
                            value={facility.name}
                            onChange={e => updateNestedContent('facilities', 'list', {index: idx, key: 'name'}, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">설명</label>
                          <textarea
                            value={facility.description}
                            onChange={e => updateNestedContent('facilities', 'list', {index: idx, key: 'description'}, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보 설정</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 제목</label>
                      <input
                        type="text"
                        value={contentData.contact.title}
                        onChange={(e) => updateContent('contact', 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">섹션 부제목</label>
                      <input
                        type="text"
                        value={contentData.contact.subtitle}
                        onChange={(e) => updateContent('contact', 'subtitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                      <input
                        type="text"
                        value={contentData.contact.address}
                        onChange={(e) => updateContent('contact', 'address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                      <input
                        type="text"
                        value={contentData.contact.phone}
                        onChange={(e) => updateContent('contact', 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">진료시간</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">평일</label>
                        <input
                          type="text"
                          value={contentData.contact.hours.weekday}
                          onChange={(e) => updateNestedContent('contact', 'hours', 'weekday', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">토요일</label>
                        <input
                          type="text"
                          value={contentData.contact.hours.saturday}
                          onChange={(e) => updateNestedContent('contact', 'hours', 'saturday', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">일요일/공휴일</label>
                        <input
                          type="text"
                          value={contentData.contact.hours.sunday}
                          onChange={(e) => updateNestedContent('contact', 'hours', 'sunday', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">교통정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">주차안내</label>
                        <input
                          type="text"
                          value={contentData.contact.parking}
                          onChange={(e) => updateContent('contact', 'parking', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">지하철</label>
                        <input
                          type="text"
                          value={contentData.contact.subway}
                          onChange={(e) => updateContent('contact', 'subway', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">버스</label>
                        <input
                          type="text"
                          value={contentData.contact.bus}
                          onChange={(e) => updateContent('contact', 'bus', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

