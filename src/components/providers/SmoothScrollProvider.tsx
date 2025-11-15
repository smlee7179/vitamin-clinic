'use client';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // 임시로 lenis를 비활성화하고 CSS smooth scroll만 사용
  // 나중에 다른 smooth scroll 라이브러리로 대체 가능
  return <>{children}</>;
}
