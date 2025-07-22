'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function ImageOptimizer({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL
}: ImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-neutral-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-neutral-500 text-sm">이미지를 불러올 수 없습니다</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-neutral-200 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

// WebP 지원 확인 및 폴백 이미지 제공
export function getOptimizedImageSrc(src: string, format: 'webp' | 'avif' | 'original' = 'webp'): string {
  if (typeof window === 'undefined') return src;
  
  // WebP 지원 확인
  const canvas = document.createElement('canvas');
  const isWebPSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (format === 'webp' && isWebPSupported) {
    // WebP 형식으로 변환된 이미지 URL 반환
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return src;
}

// 이미지 지연 로딩을 위한 Intersection Observer 훅
export function useImageLazyLoading() {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useState(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  });

  return { ref: setRef, isInView };
} 