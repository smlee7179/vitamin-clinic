'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import StructuredData from "../components/seo/StructuredData";
import { fixHospitalContent } from '../lib/fixHospitalContent';
import MarqueeSlider from '../components/MarqueeSlider';
import TreatmentSection from '../components/TreatmentSection';
import FAQSection from '../components/FAQSection';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contentData, setContentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // 클라이언트 사이드 하이드레이션 확인
  useEffect(() => {
    setHydrated(true);
  }, []);

  // 초기 로딩
  useEffect(() => {
    if (!hydrated) return;
    
    try {
      const saved = localStorage.getItem('hospitalContent');
      if (saved) {
        setContentData(fixHospitalContent(JSON.parse(saved)));
      } else {
        // localStorage에 데이터가 없으면 기본 데이터 사용
        const defaultData = fixHospitalContent({
                      hero: {
              title: '건강한 삶을 위한\n전문적인 치료',
              subtitle: '부산 정형외과 전문 비타민마취통증의학과의원에서\n정확한 진단과 효과적인 치료를 받으세요',
              mainButton: '전화 연결하기',
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
            address: '부산 동구 중앙대로 375 (수정동) 강남빌딩 3층',
            phone: '051-469-7581',
            hours: {
              weekday: '평일: 09:00 - 18:00',
              saturday: '토요일: 09:00 - 13:00',
              sunday: '일요일 및 공휴일: 휴진'
            },
            parking: '건물 지하 주차장 이용 가능',
            subway: '2호선 해운대역 3번 출구 도보 5분',
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
        });
        setContentData(defaultData);
      }
    } catch (e) {
      setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
    }
  }, [hydrated]);

  // 여러 탭 동기화
  useEffect(() => {
    if (!hydrated) return;
    
    const loadData = () => {
      try {
        const saved = localStorage.getItem('hospitalContent');
        if (saved) {
          setContentData(fixHospitalContent(JSON.parse(saved)));
        } else {
          // localStorage에 데이터가 없으면 기본 데이터 사용
          const defaultData = fixHospitalContent({
            hero: {
              title: '건강한 삶을 위한\n전문적인 치료',
              subtitle: '부산 정형외과 전문 비타민마취통증의학과의원에서\n정확한 진단과 효과적인 치료를 받으세요',
              mainButton: '전화 연결하기',
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
                {
                  name: '김철수 원장',
                  position: '정형외과 전문의',
                  career: ['부산대학교 의과대학 졸업', '부산대학교병원 정형외과 전공의', '대한정형외과학회 정회원', '20년 이상의 임상경험'],
                  image: '',
                  imageFile: ''
                }
              ]
            },
            facilities: {
              title: '시설 안내',
              subtitle: '최신 의료장비와 편리한 시설로 최상의 진료를 제공합니다',
              list: [
                {
                  name: '접수 및 대기실',
                  description: '편안하고 깨끗한 환경에서 진료를 기다리실 수 있습니다.',
                  image: '',
                  imageFile: ''
                }
              ]
            },
            contact: {
              title: '오시는 길',
              subtitle: '편리한 교통과 주차시설을 제공합니다',
              address: '부산 동구 중앙대로 375 (수정동) 강남빌딩 3층',
              phone: '051-469-7581',
              hours: {
                weekday: '평일: 09:00 - 18:00',
                saturday: '토요일: 09:00 - 13:00',
                sunday: '일요일 및 공휴일: 휴진'
              },
                          parking: '건물 지하 주차장 이용 가능',
            subway: '2호선 해운대역 3번 출구 도보 5분',
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
        });
          setContentData(defaultData);
        }
      } catch (e) {
        setError('로컬 저장소에서 데이터를 불러오지 못했습니다.');
      }
    };
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [hydrated]);

  // 이미지 렌더링 함수
  const getImageSrc = (key: string | undefined, fallback: string) => {
    // 하이드레이션 전이거나 key가 없으면 fallback 반환
    if (!hydrated) return fallback;
    if (!key || key.trim() === '') return fallback;

    // 절대 경로 URL인 경우 (Blob Storage에서 온 URL)
    if (key.startsWith('http://') || key.startsWith('https://')) {
      console.log('✅ Using Blob Storage URL:', key);
      return key;
    }

    // 상대 경로인 경우 (예: /images/...)
    if (key.startsWith('/')) {
      console.log('✅ Using relative path:', key);
      return key;
    }

    // localStorage key로 취급
    try {
      const img = localStorage.getItem(key);
      if (img) {
        console.log('📦 Retrieved from localStorage:', key, '→', img);
        return img;
      }
      console.log('⚠️ No image found in localStorage for key:', key, ', using fallback');
      return fallback;
    } catch (error) {
      console.error('❌ localStorage error:', error);
      return fallback;
    }
  };

  // 하이드레이션 전에는 기본 UI 표시
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-hospital-line text-white text-base sm:text-2xl"></i>
            </div>
            <h1 className="text-sm sm:text-2xl font-bold text-orange-600 mb-2" style={{fontFamily: 'Pacifico, serif'}}>
              비타민마취통증의학과
            </h1>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 데이터 로딩 중
  if (!contentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-hospital-line text-white text-base sm:text-2xl"></i>
            </div>
            <h1 className="text-sm sm:text-2xl font-bold text-orange-600 mb-2" style={{fontFamily: 'Pacifico, serif'}}>
              비타민마취통증의학과
            </h1>
            {error ? (
              <div className="text-red-500 font-bold">{error}</div>
            ) : (
              <p className="text-gray-600">콘텐츠를 불러오는 중...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 이미지 변경 핸들러
  // handleImageChange, handleImageDelete 함수 전체 삭제

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <StructuredData
        type="organization"
        data={{}}
      />
      <StructuredData
        type="medical-clinic"
        data={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Marquee Slider */}
        <MarqueeSlider />

        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-6">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-hospital-line text-white text-base sm:text-2xl"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-2xl font-bold text-orange-600 leading-tight truncate" style={{fontFamily: 'Pacifico, serif'}}>
                    비타민마취통증의학과
                  </h1>
                  <p className="text-xs sm:text-base text-gray-600 leading-tight whitespace-nowrap hidden sm:block">부산 정형외과 전문</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden sm:flex space-x-8 flex-shrink-0">
                <Link href="#home" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  홈
                </Link>
                <Link href="#about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  의료진
                </Link>
                <Link href="#services" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  진료과목
                </Link>
                <Link href="#treatments" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  치료방법
                </Link>
                <Link href="#facilities" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  시설안내
                </Link>
                <Link href="#faq" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  FAQ
                </Link>
                <Link href="#contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer text-base whitespace-nowrap">
                  위치
                </Link>
              </nav>

              {/* Mobile Menu Button - 개선된 디자인 */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-orange-600 transition-all duration-300 cursor-pointer bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-orange-300 z-50"
                aria-label="메뉴 열기"
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute top-0 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}></span>
                  <span className={`absolute top-2 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute top-4 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}`}></span>
                </div>
              </button>
            </div>

            {/* Mobile Menu - 개선된 디자인 */}
            <div className={`sm:hidden fixed inset-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={closeMobileMenu}
              ></div>
              
              {/* Menu Panel */}
              <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-gray-900">메뉴</h2>
                    <button
                      onClick={closeMobileMenu}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>
                  
                  <nav className="space-y-2">
                    <Link 
                      href="#home" 
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-home-line mr-3 text-lg"></i>
                      홈
                    </Link>
                    <Link 
                      href="#about" 
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-user-line mr-3 text-lg"></i>
                      의료진
                    </Link>
                    <Link
                      href="#services"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-hospital-line mr-3 text-lg"></i>
                      진료과목
                    </Link>
                    <Link
                      href="#treatments"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-syringe-line mr-3 text-lg"></i>
                      치료방법
                    </Link>
                    <Link
                      href="#facilities"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-building-line mr-3 text-lg"></i>
                      시설안내
                    </Link>
                    <Link
                      href="#faq"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-question-line mr-3 text-lg"></i>
                      FAQ
                    </Link>
                    <Link 
                      href="#contact" 
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <i className="ri-map-pin-line mr-3 text-lg"></i>
                      위치
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: (() => {
                // 기본 fallback 이미지
                const defaultFallback = contentData?.hero?.backgroundImage
                  ? `https://readdy.ai/api/search-image?query=${encodeURIComponent(contentData.hero.backgroundImage)}&width=1920&height=1080&seq=hero-bg-1&orientation=landscape`
                  : 'https://readdy.ai/api/search-image?query=Modern%20medical%20facility%20interior%20with%20warm%20orange%20lighting&width=1920&height=1080&seq=hero-bg-1&orientation=landscape';

                const imageFile = contentData?.hero?.backgroundImageFile;
                const imageSrc = getImageSrc(imageFile, defaultFallback);

                console.log('🖼️ Hero background image:', {
                  imageFile,
                  imageSrc,
                  isUrl: imageSrc.startsWith('http')
                });

                return `url('${imageSrc}')`;
              })(),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* 이미지 변경/삭제 UI 제거 */}
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {(contentData?.hero?.title || '건강한 삶을 위한\n전문적인 치료').split('\n').map((line: string, idx: number) => (
                <span key={idx} className={idx === 1 ? 'text-orange-400' : ''}>{line}<br /></span>
              ))}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 font-light leading-relaxed">
              {(contentData?.hero?.subtitle || '부산 정형외과 전문 비타민마취통증의학과의원에서\n정확한 진단과 효과적인 치료를 받으세요').split('\n').map((line: string, idx: number) => (
                <span key={idx}>{line}<br className="hidden sm:block" /></span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="tel:051-469-7581" className="bg-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                <i className="ri-phone-line text-lg"></i>
                {contentData?.hero?.mainButton || '전화 연결하기'}
              </a>
              <button 
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-arrow-down-line text-lg"></i>
                {contentData?.hero?.secondButton || '진료과목 보기'}
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {contentData?.services?.title || '주요 진료과목'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                {contentData?.services?.subtitle || '전문적이고 체계적인 치료로 건강을 회복하세요'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-bone-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">정형외과</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">관절염, 골절, 척추질환 등 근골격계 질환의 전문적인 진단과 치료</p>
                <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>• 관절염 치료</li>
                  <li>• 척추질환 치료</li>
                  <li>• 골절 치료</li>
                  <li>• 스포츠 외상</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-capsule-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">마취통증의학과</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">다양한 통증 질환의 정확한 진단과 효과적인 치료</p>
                <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>• 만성 통증 치료</li>
                  <li>• 신경차단술</li>
                  <li>• 근막동통증후군</li>
                  <li>• 대상포진 후 신경통</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-heart-pulse-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">재활의학과</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">기능 회복과 삶의 질 향상을 위한 전문적인 재활치료</p>
                <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>• 물리치료</li>
                  <li>• 작업치료</li>
                  <li>• 운동치료</li>
                  <li>• 전기치료</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Section */}
        <TreatmentSection />

        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">의료진 소개</h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">풍부한 경험과 전문성을 갖춘 의료진이 함께합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {contentData?.doctors?.list?.length > 0 &&
                contentData.doctors.list.map((doctor: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-orange-100 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden">
                      <img
                        src={getImageSrc(
                          doctor?.imageFile,
                          `https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20doctor%20in%20white%20coat%2C%20middle-aged%20orthopedic%20specialist%2C%20friendly%20smile%2C%20clean%20medical%20background%2C%20hospital%20setting%2C%20professional%20medical%20portrait%2C%20trustworthy%20appearance%2C%20warm%20lighting&width=320&height=320&seq=doctor-${idx+1}`
                        )}
                        alt={doctor?.name || `의료진 ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          console.error('❌ Doctor image load error:', doctor?.imageFile);
                          const target = e.target as HTMLImageElement;
                          // 에러 발생 시 기본 이미지로 대체
                          target.src = `https://readdy.ai/api/search-image?query=Professional%20Korean%20male%20doctor%20in%20white%20coat&width=320&height=320&seq=doctor-fallback-${idx+1}`;
                        }}
                      />
                      {/* 이미지 변경/삭제 UI 제거 */}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">김철수 원장</h3>
                    <p className="text-orange-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">정형외과 전문의</p>
                    <ul className="text-gray-700 space-y-1 text-left text-sm sm:text-base">
                      <li>• 부산대학교 의과대학 졸업</li>
                      <li>• 부산대학교병원 정형외과 전공의</li>
                      <li>• 대한정형외과학회 정회원</li>
                      <li>• 20년 이상의 임상경험</li>
                    </ul>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">시설 안내</h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">최신 의료장비와 편리한 시설로 최상의 진료를 제공합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {contentData?.facilities?.list?.length > 0 &&
                contentData.facilities.list.map((facility: any, idx: number) => (
                  <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="relative mb-4 sm:mb-6">
                      <img
                        src={getImageSrc(
                          facility?.imageFile,
                          `https://readdy.ai/api/search-image?query=Modern%20hospital%20reception%20area%20with%20orange%20accents%2C%20clean%20and%20bright%20interior%2C%20comfortable%20seating%20for%20elderly%20patients%2C%20Korean%20hospital%20setting%2C%20professional%20medical%20facility%2C%20warm%20lighting%2C%20accessible%20design%2C%20friendly%20atmosphere&width=600&height=400&seq=facility-${idx+1}`
                        )}
                        alt={facility?.name || `시설 ${idx + 1}`}
                        className="w-full h-48 sm:h-64 object-cover object-top rounded-lg"
                        onError={(e) => {
                          console.error('❌ Facility image load error:', facility?.imageFile);
                          const target = e.target as HTMLImageElement;
                          // 에러 발생 시 기본 이미지로 대체
                          target.src = `https://readdy.ai/api/search-image?query=Modern%20hospital%20interior%20with%20orange%20accents&width=600&height=400&seq=facility-fallback-${idx+1}`;
                        }}
                      />
                      {/* 이미지 변경/삭제 UI 제거 */}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">접수 및 대기실</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">편안하고 깨끗한 환경에서 진료를 기다리실 수 있습니다.</p>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">오시는 길</h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">편리한 교통과 주차시설을 제공합니다</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">병원 정보</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-map-pin-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">주소</p>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">부산 동구 중앙대로 375 (수정동) 강남빌딩 3층</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-phone-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">전화번호</p>
                        <p className="text-gray-600 text-sm sm:text-base">051-469-7581</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-time-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">진료시간</p>
                        <div className="text-gray-600 text-sm sm:text-base space-y-1">
                          <p>평일: 09:00 - 18:00</p>
                          <p>토요일: 09:00 - 13:00</p>
                          <p>일요일 및 공휴일: 휴진</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-car-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">주차안내</p>
                        <p className="text-gray-600 text-sm sm:text-base">건물 지하 주차장 이용 가능</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">대중교통</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-subway-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">지하철</p>
                        <p className="text-gray-600 text-sm sm:text-base">2호선 해운대역 3번 출구 도보 5분</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className="ri-bus-line text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">버스</p>
                        <p className="text-gray-600 text-sm sm:text-base">해운대역 정류장 하차 후 도보 3분</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">위치</h3>
                  <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.8539876234756!2d129.15934631523!3d35.16278728030!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356892b9be8b3c1f%3A0x2b2a8b7b8b8b8b8b!2z67aA7IKw6rSR7Ret7IscIOq1rOyatOyVhOq1rCDqjbXrj5kg67aA7IKw7LKt!5e0!3m2!1sko!2skr!4v1623456789012!5m2!1sko!2skr"
                      width="100%" 
                      height="100%" 
                      style={{border: 0}}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="ri-hospital-line text-white text-lg sm:text-xl"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold" style={{fontFamily: 'Pacifico, serif'}}>
                    {contentData?.footer?.companyName || '비타민마취통증의학과의원'}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                  부산 정형외과 전문 병원으로 환자분들의 건강한 삶을 위해 최선을 다하겠습니다.
                </p>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>대표자: {contentData?.footer?.representative || '김철수'}</p>
                  <p>사업자등록번호: {contentData?.footer?.businessNumber || '123-45-67890'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-4">빠른 링크</h4>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li><Link href="#about" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">의료진 소개</Link></li>
                  <li><Link href="#services" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">진료과목</Link></li>
                  <li><Link href="#facilities" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">시설안내</Link></li>
                  <li><Link href="#contact" className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">오시는 길</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-4">연락처</h4>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-400">
                    <i className="ri-phone-line mr-2"></i>
                    {contentData?.footer?.phone || '051-469-7581'}
                  </p>
                  <p className="text-gray-400">
                    <i className="ri-map-pin-line mr-2"></i>
                    {contentData?.footer?.address || '부산광역시 해운대구 중동 1394-65'}
                  </p>
                  <p className="text-gray-400">
                    <i className="ri-mail-line mr-2"></i>
                    {contentData?.footer?.email || 'info@vitamin-clinic.co.kr'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm sm:text-base">
                  {contentData?.footer?.copyright || '© 2024 비타민마취통증의학과의원. All rights reserved.'}
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Link href={contentData?.footer?.links?.privacy || '/privacy'} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    개인정보처리방침
                  </Link>
                  <Link href={contentData?.footer?.links?.terms || '/terms'} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    이용약관
                  </Link>
                  <Link href={contentData?.footer?.links?.sitemap || '/sitemap'} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    사이트맵
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
