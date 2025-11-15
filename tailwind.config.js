/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      'xs': '375px',    // 아이폰 SE, 작은 안드로이드
      'sm': '640px',    // 태블릿 세로
      'md': '768px',    // 태블릿 가로
      'lg': '1024px',   // 노트북
      'xl': '1280px',   // 데스크톱
      '2xl': '1536px',  // 대형 데스크톱
    },
    extend: {
      colors: {
        // 비타민 오렌지 - CTA에만 사용 (토스 스타일)
        vitamin: {
          50:  '#FFF8F3',  // 배경용 (아주 연한 톤)
          100: '#FFE8D8',  // 카드 배경 호버
          200: '#FFD4B8',
          300: '#FFC098',
          400: '#FFAB78',
          500: '#FF6B35',  // 메인 CTA
          600: '#EA580C',  // CTA 호버
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // 기존 primary도 유지 (하위 호환성)
        primary: {
          50:  '#FFF8F3',
          100: '#FFE8D8',
          200: '#FFD4B8',
          300: '#FFC098',
          400: '#FFAB78',
          500: '#FF6B35',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
        },
        // 그레이스케일 - 주요 사용 (토스 스타일)
        neutral: {
          0:   '#FFFFFF',  // 카드, 모달 배경
          50:  '#FAFAFA',  // 페이지 배경
          100: '#F5F5F5',  // 섹션 구분 배경
          200: '#E5E5E5',  // Border
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',  // 본문
          800: '#262626',  // Footer 배경
          900: '#171717',  // 제목
        },
        // Semantic Colors
        success: '#10B981',
        error:   '#EF4444',
        info:    '#0EA5E9',
        warning: '#F59E0B',
      },
      // 그림자 시스템 - 절제된 사용 (토스 스타일)
      boxShadow: {
        'sm':  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',      // 카드 기본
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',   // 기본
        'md':  '0 2px 8px 0 rgba(0, 0, 0, 0.08)',      // 카드 호버
        'lg':  '0 4px 16px 0 rgba(0, 0, 0, 0.12)',     // 모달, 드롭다운
        'xl':  '0 8px 24px 0 rgba(0, 0, 0, 0.15)',     // 큰 모달
        'none': 'none',
      },
      // 타이포그래피 시스템 - 모바일 우선 (토스 스타일)
      fontSize: {
        // display-1: 섹션 타이틀
        'display-1': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        // display-2: 카드 제목
        'display-2': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        // body-1: 본문
        'body-1': ['15px', { lineHeight: '24px', fontWeight: '400' }],
        // body-2: 설명, 캡션
        'body-2': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        // label: 라벨, 버튼
        'label': ['13px', { lineHeight: '20px', fontWeight: '500' }],

        // 태블릿+ 사이즈 (기존 호환)
        'xs': '13px',
        'sm': '14px',
        'base': '15px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '36px',
        '6xl': '44px',
      },
      // 스페이싱 시스템 - 8pt Grid (토스 스타일)
      spacing: {
        'xs': '4px',    // 0.5rem
        'sm': '8px',    // 1rem
        'md': '16px',   // 2rem
        'lg': '24px',   // 3rem
        'xl': '32px',   // 4rem
        '2xl': '48px',  // 6rem
        '3xl': '64px',  // 8rem
        '4xl': '96px',  // 12rem
      },
      // 모서리 반경
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      // 애니메이션 시스템 (토스 스타일)
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'enter': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'exit': 'cubic-bezier(0.4, 0.0, 1, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'slide-up': 'slideUp 250ms ease-out',
        'slide-down': 'slideDown 250ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
