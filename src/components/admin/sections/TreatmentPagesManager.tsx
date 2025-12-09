'use client';

import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

interface ProgramItem {
  title: string;
  content: string;
}

interface TreatmentProgram {
  title: string;
  description: string;
  items: ProgramItem[];
}

interface Advantage {
  title: string;
  description: string;
  icon: string;
}

interface TreatmentPage {
  id?: string;
  treatmentType: 'non-surgical' | 'manual-therapy';
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  treatmentPrograms?: string; // JSON string
  advantages?: string; // JSON string
}

interface TreatmentPagesManagerProps {
  treatmentType: 'non-surgical' | 'manual-therapy';
}

const TREATMENT_NAMES = {
  'non-surgical': '비수술 치료',
  'manual-therapy': '도수 치료'
};

export default function TreatmentPagesManager({ treatmentType }: TreatmentPagesManagerProps) {
  const [treatmentPage, setTreatmentPage] = useState<TreatmentPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [treatmentPrograms, setTreatmentPrograms] = useState<TreatmentProgram[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);

  useEffect(() => {
    fetchTreatmentPage();
  }, [treatmentType]);

  const fetchTreatmentPage = async () => {
    try {
      const response = await fetch(`/api/treatment-pages?treatmentType=${treatmentType}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setTreatmentPage(data);
          setTreatmentPrograms(JSON.parse(data.treatmentPrograms || '[]'));
          setAdvantages(JSON.parse(data.advantages || '[]'));
        } else {
          // Initialize with default data if doesn't exist
          setTreatmentPage({
            treatmentType,
            heroImageUrl: '',
            heroTitle: TREATMENT_NAMES[treatmentType],
            heroSubtitle: '',
            description: '',
            treatmentPrograms: '[]',
            advantages: '[]'
          });
          setTreatmentPrograms([]);
          setAdvantages([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch treatment page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!treatmentPage) return;

    setSaving(true);
    setMessage('');

    try {
      const method = treatmentPage.id ? 'PUT' : 'POST';
      const dataToSave = {
        ...treatmentPage,
        treatmentPrograms: JSON.stringify(treatmentPrograms),
        advantages: JSON.stringify(advantages)
      };

      const response = await fetch('/api/treatment-pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        await fetchTreatmentPage();
        setMessage('✓ 저장되었습니다.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ 저장 실패');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('✗ 저장 중 오류 발생');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('이미지 압축 중...');

    try {
      const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg' as const,
      };

      const compressedFile = await imageCompression(file, options);
      setMessage('이미지 업로드 중...');

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('preset', 'clinicHero');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTreatmentPage({ ...treatmentPage!, heroImageUrl: data.url });
        setMessage('✓ 이미지 업로드 완료');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: '이미지 업로드 실패' }));
        setMessage(`✗ ${errorData.error || '이미지 업로드 실패'}`);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setMessage('✗ 이미지 업로드 중 오류 발생');
    } finally {
      setUploading(false);
    }
  };

  // Treatment Programs handlers
  const handleAddProgram = () => {
    setTreatmentPrograms([...treatmentPrograms, { title: '', description: '', items: [] }]);
  };

  const handleUpdateProgram = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...treatmentPrograms];
    updated[index][field] = value;
    setTreatmentPrograms(updated);
  };

  const handleDeleteProgram = (index: number) => {
    setTreatmentPrograms(treatmentPrograms.filter((_, i) => i !== index));
  };

  const handleAddProgramItem = (programIndex: number) => {
    const updated = [...treatmentPrograms];
    updated[programIndex].items.push({ title: '', content: '' });
    setTreatmentPrograms(updated);
  };

  const handleUpdateProgramItem = (programIndex: number, itemIndex: number, field: 'title' | 'content', value: string) => {
    const updated = [...treatmentPrograms];
    updated[programIndex].items[itemIndex][field] = value;
    setTreatmentPrograms(updated);
  };

  const handleDeleteProgramItem = (programIndex: number, itemIndex: number) => {
    const updated = [...treatmentPrograms];
    updated[programIndex].items = updated[programIndex].items.filter((_, i) => i !== itemIndex);
    setTreatmentPrograms(updated);
  };

  // Advantages handlers
  const handleAddAdvantage = () => {
    setAdvantages([...advantages, { title: '', description: '', icon: 'shield' }]);
  };

  const handleUpdateAdvantage = (index: number, field: keyof Advantage, value: string) => {
    const updated = [...advantages];
    updated[index][field] = value;
    setAdvantages(updated);
  };

  const handleDeleteAdvantage = (index: number) => {
    setAdvantages(advantages.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!treatmentPage) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{TREATMENT_NAMES[treatmentType]} 관리</h3>
          <p className="text-sm text-gray-600 mt-1">{TREATMENT_NAMES[treatmentType]} 페이지의 내용을 관리합니다</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900">상단 이미지 섹션</h4>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              상단 이미지 <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
            {uploading && <p className="mt-2 text-sm text-orange-500">업로드 중...</p>}
            {treatmentPage.heroImageUrl && (
              <div className="mt-4">
                <img
                  src={treatmentPage.heroImageUrl}
                  alt="상단 이미지 미리보기"
                  className="w-full h-64 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              상단 타이틀 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={treatmentPage.heroTitle}
              onChange={(e) => setTreatmentPage({ ...treatmentPage, heroTitle: e.target.value })}
              placeholder="비수술 치료"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              상단 서브타이틀 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={treatmentPage.heroSubtitle}
              onChange={(e) => setTreatmentPage({ ...treatmentPage, heroSubtitle: e.target.value })}
              placeholder="수술 없이 통증을 근본적으로 치료하는 다양한 비수술적 치료법을 제공합니다."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4 border-t pt-6">
          <h4 className="font-bold text-gray-900">소개글</h4>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={treatmentPage.description}
              onChange={(e) => setTreatmentPage({ ...treatmentPage, description: e.target.value })}
              placeholder="치료에 대한 설명을 입력하세요."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              치료의 특징, 장점, 적용 대상 등을 자유롭게 작성하세요.
            </p>
          </div>
        </div>

        {/* Treatment Programs Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">주요 치료 프로그램</h4>
              <p className="text-xs text-gray-600 mt-1">치료 프로그램을 추가하고 각 프로그램의 세부 항목을 관리합니다</p>
            </div>
            <button
              onClick={handleAddProgram}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 프로그램 추가
            </button>
          </div>

          {treatmentPrograms.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 치료 프로그램이 없습니다</p>
              <button
                onClick={handleAddProgram}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 프로그램 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {treatmentPrograms.map((program, pIndex) => (
                <div key={pIndex} className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">프로그램 #{pIndex + 1}</span>
                    <button
                      onClick={() => handleDeleteProgram(pIndex)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">프로그램 제목</label>
                    <input
                      type="text"
                      value={program.title}
                      onChange={(e) => handleUpdateProgram(pIndex, 'title', e.target.value)}
                      placeholder="신경차단술"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">프로그램 설명</label>
                    <textarea
                      value={program.description}
                      onChange={(e) => handleUpdateProgram(pIndex, 'description', e.target.value)}
                      placeholder="통증을 전달하는 신경을 차단하여 통증을 완화하는 치료법입니다."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* Program Items */}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-semibold text-gray-600">세부 항목</label>
                      <button
                        onClick={() => handleAddProgramItem(pIndex)}
                        className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition-colors"
                      >
                        + 항목 추가
                      </button>
                    </div>

                    {program.items.length === 0 ? (
                      <div className="bg-white border border-gray-200 rounded p-3 text-center">
                        <p className="text-xs text-gray-400">세부 항목이 없습니다</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {program.items.map((item, iIndex) => (
                          <div key={iIndex} className="bg-white border border-gray-200 rounded p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-500">항목 #{iIndex + 1}</span>
                              <button
                                onClick={() => handleDeleteProgramItem(pIndex, iIndex)}
                                className="text-red-500 hover:text-red-600 text-xs"
                              >
                                삭제
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateProgramItem(pIndex, iIndex, 'title', e.target.value)}
                              placeholder="항목 제목"
                              className="w-full px-2 py-1 border border-gray-200 rounded text-xs"
                            />
                            <textarea
                              value={item.content}
                              onChange={(e) => handleUpdateProgramItem(pIndex, iIndex, 'content', e.target.value)}
                              placeholder="항목 내용"
                              rows={2}
                              className="w-full px-2 py-1 border border-gray-200 rounded text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advantages Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">비타민 치료의 장점</h4>
              <p className="text-xs text-gray-600 mt-1">카드 형태로 표시될 치료의 장점을 입력합니다</p>
            </div>
            <button
              onClick={handleAddAdvantage}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 장점 추가
            </button>
          </div>

          {advantages.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 장점이 없습니다</p>
              <button
                onClick={handleAddAdvantage}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 장점 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">장점 #{index + 1}</span>
                    <button
                      onClick={() => handleDeleteAdvantage(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        아이콘 (SVG 이름)
                      </label>
                      <select
                        value={advantage.icon}
                        onChange={(e) => handleUpdateAdvantage(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="shield">🛡️ 방패 (shield)</option>
                        <option value="flask">🧪 플라스크 (flask)</option>
                        <option value="heart">❤️ 하트 (heart)</option>
                        <option value="star">⭐ 별 (star)</option>
                        <option value="check">✓ 체크 (check)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">제목</label>
                      <input
                        type="text"
                        value={advantage.title}
                        onChange={(e) => handleUpdateAdvantage(index, 'title', e.target.value)}
                        placeholder="빠른 회복"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">설명</label>
                    <textarea
                      value={advantage.description}
                      onChange={(e) => handleUpdateAdvantage(index, 'description', e.target.value)}
                      placeholder="수술 없이 빠르게 일상으로 복귀할 수 있습니다"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!treatmentPage.heroImageUrl || !treatmentPage.heroTitle || saving}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}
