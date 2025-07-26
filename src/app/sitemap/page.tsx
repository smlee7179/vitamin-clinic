import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">사이트맵</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">메인 페이지</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-orange-600 hover:text-orange-800 transition-colors">
                    홈페이지
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">진료 정보</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/#services" className="text-orange-600 hover:text-orange-800 transition-colors">
                    진료과목
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-orange-600 hover:text-orange-800 transition-colors">
                    의료진 소개
                  </Link>
                </li>
                <li>
                  <Link href="/#facilities" className="text-orange-600 hover:text-orange-800 transition-colors">
                    시설 안내
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">병원 정보</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/#contact" className="text-orange-600 hover:text-orange-800 transition-colors">
                    오시는 길
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-orange-600 hover:text-orange-800 transition-colors">
                    연락처
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">기타</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin" className="text-orange-600 hover:text-orange-800 transition-colors">
                    관리자 페이지
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-800 transition-colors">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-orange-600 hover:text-orange-800 transition-colors">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-4">병원 정보</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p><strong>병원명:</strong> 비타민마취통증의학과의원</p>
              <p><strong>주소:</strong> 부산 동구 중앙대로 375 (수정동) 강남빌딩 3층</p>
              <p><strong>전화:</strong> 051-469-7581</p>
              <p><strong>진료시간:</strong> 평일 09:00-18:00, 토요일 09:00-13:00</p>
              <p><strong>휴무일:</strong> 일요일 및 공휴일</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 