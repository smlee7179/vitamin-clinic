'use client';

import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface TargetPatient {
  title: string;
  description: string;
}

interface TreatmentMethod {
  title: string;
  description: string;
}

interface ClinicPage {
  id?: string;
  clinicType: 'spine' | 'joint' | 'pain' | 'osteoporosis' | 'wellness';
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features?: string; // JSON string
  targetPatients?: string; // JSON string
  symptoms?: string; // JSON array of strings
  treatmentMethods?: string; // JSON array
}

interface ClinicPagesManagerProps {
  clinicType: 'spine' | 'joint' | 'pain' | 'osteoporosis' | 'wellness';
}

const CLINIC_NAMES = {
  spine: '척추 클리닉',
  joint: '관절 클리닉',
  pain: '통증 클리닉',
  osteoporosis: '골다공증 클리닉',
  wellness: '비타민 웰니스'
};

export default function ClinicPagesManager({ clinicType }: ClinicPagesManagerProps) {
  const [clinicPage, setClinicPage] = useState<ClinicPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [features, setFeatures] = useState<Feature[]>([]);
  const [targetPatients, setTargetPatients] = useState<TargetPatient[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [treatmentMethods, setTreatmentMethods] = useState<TreatmentMethod[]>([]);

  useEffect(() => {
    fetchClinicPage();
  }, [clinicType]);

  const fetchClinicPage = async () => {
    try {
      const response = await fetch(`/api/clinic-pages?clinicType=${clinicType}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setClinicPage(data);
          setFeatures(JSON.parse(data.features || '[]'));
          setTargetPatients(JSON.parse(data.targetPatients || '[]'));
          setSymptoms(JSON.parse(data.symptoms || '[]'));
          setTreatmentMethods(JSON.parse(data.treatmentMethods || '[]'));
        } else {
          // Initialize with default data if doesn't exist
          setClinicPage({
            clinicType,
            heroImageUrl: '',
            heroTitle: CLINIC_NAMES[clinicType],
            heroSubtitle: '',
            description: '',
            features: '[]',
            targetPatients: '[]',
            symptoms: '[]',
            treatmentMethods: '[]'
          });
          setFeatures([]);
          setTargetPatients([]);
          setSymptoms([]);
          setTreatmentMethods([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch clinic page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!clinicPage) return;

    setSaving(true);
    setMessage('');

    try {
      const method = clinicPage.id ? 'PUT' : 'POST';
      const dataToSave = {
        ...clinicPage,
        features: JSON.stringify(features),
        targetPatients: JSON.stringify(targetPatients),
        symptoms: JSON.stringify(symptoms),
        treatmentMethods: JSON.stringify(treatmentMethods)
      };

      const response = await fetch('/api/clinic-pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        await fetchClinicPage();
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

  const handleAddFeature = () => {
    setFeatures([...features, { title: '', description: '', icon: 'shield' }]);
  };

  const handleUpdateFeature = (index: number, field: keyof Feature, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const handleDeleteFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddTargetPatient = () => {
    setTargetPatients([...targetPatients, { title: '', description: '' }]);
  };

  const handleUpdateTargetPatient = (index: number, field: keyof TargetPatient, value: string) => {
    const updated = [...targetPatients];
    updated[index] = { ...updated[index], [field]: value };
    setTargetPatients(updated);
  };

  const handleDeleteTargetPatient = (index: number) => {
    setTargetPatients(targetPatients.filter((_, i) => i !== index));
  };

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, '']);
  };

  const handleUpdateSymptom = (index: number, value: string) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  const handleDeleteSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleAddTreatmentMethod = () => {
    setTreatmentMethods([...treatmentMethods, { title: '', description: '' }]);
  };

  const handleUpdateTreatmentMethod = (index: number, field: keyof TreatmentMethod, value: string) => {
    const updated = [...treatmentMethods];
    updated[index] = { ...updated[index], [field]: value };
    setTreatmentMethods(updated);
  };

  const handleDeleteTreatmentMethod = (index: number) => {
    setTreatmentMethods(treatmentMethods.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('이미지 압축 중...');

    try {
      // 이미지 압축 옵션
      const options = {
        maxSizeMB: 3, // 최대 3MB
        maxWidthOrHeight: 1920, // 최대 너비/높이
        useWebWorker: true,
        fileType: 'image/jpeg' as const,
      };

      // 이미지 압축
      const compressedFile = await imageCompression(file, options);
      console.log('Original file size:', file.size / 1024 / 1024, 'MB');
      console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');

      setMessage('이미지 업로드 중...');

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('preset', 'clinicHero'); // 클리닉 히어로 이미지 preset 사용

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setClinicPage({ ...clinicPage!, heroImageUrl: data.url });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!clinicPage) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{CLINIC_NAMES[clinicType]} 관리</h3>
          <p className="text-sm text-gray-600 mt-1">{CLINIC_NAMES[clinicType]} 페이지의 내용을 관리합니다</p>
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
            {clinicPage.heroImageUrl && (
              <div className="mt-4">
                <img
                  src={clinicPage.heroImageUrl}
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
              value={clinicPage.heroTitle}
              onChange={(e) => setClinicPage({ ...clinicPage, heroTitle: e.target.value })}
              placeholder="척추 클리닉"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              상단 서브타이틀 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={clinicPage.heroSubtitle}
              onChange={(e) => setClinicPage({ ...clinicPage, heroSubtitle: e.target.value })}
              placeholder="허리디스크, 척추관협착증, 척추측만증 등 다양한 척추질환을 전문적으로 치료합니다."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Intro Section */}
        <div className="space-y-4 border-t pt-6">
          <h4 className="font-bold text-gray-900">클리닉 소개</h4>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={clinicPage.description}
              onChange={(e) => setClinicPage({ ...clinicPage, description: e.target.value })}
              placeholder="클리닉에 대한 설명을 입력하세요."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              클리닉의 특징, 치료 방법, 대상 질환 등을 자유롭게 작성하세요.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">특징 카드</h4>
              <p className="text-xs text-gray-600 mt-1">클리닉의 주요 특징을 카드 형태로 표시합니다 (최대 3개 권장)</p>
            </div>
            <button
              onClick={handleAddFeature}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 특징 추가
            </button>
          </div>

          {features.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 특징이 없습니다</p>
              <button
                onClick={handleAddFeature}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 특징 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">특징 #{index + 1}</span>
                    <button
                      onClick={() => handleDeleteFeature(index)}
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
                        value={feature.icon}
                        onChange={(e) => handleUpdateFeature(index, 'icon', e.target.value)}
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
                        value={feature.title}
                        onChange={(e) => handleUpdateFeature(index, 'title', e.target.value)}
                        placeholder="전문적인 진료"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">설명</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleUpdateFeature(index, 'description', e.target.value)}
                      placeholder="척추 질환 전문의의 정확한 진단과 맞춤형 치료 계획"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Target Patients Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">주요 진료</h4>
              <p className="text-xs text-gray-600 mt-1">어떤 환자들이 이 클리닉을 방문하면 좋은지 설명합니다</p>
            </div>
            <button
              onClick={handleAddTargetPatient}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 진료 추가
            </button>
          </div>

          {targetPatients.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 진료가 없습니다</p>
              <button
                onClick={handleAddTargetPatient}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 진료 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {targetPatients.map((patient, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">진료 #{index + 1}</span>
                    <button
                      onClick={() => handleDeleteTargetPatient(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">제목</label>
                    <input
                      type="text"
                      value={patient.title}
                      onChange={(e) => handleUpdateTargetPatient(index, 'title', e.target.value)}
                      placeholder="허리 통증 환자"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">설명</label>
                    <textarea
                      value={patient.description}
                      onChange={(e) => handleUpdateTargetPatient(index, 'description', e.target.value)}
                      placeholder="만성 허리 통증으로 일상생활에 불편을 겪는 분"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Symptoms Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">이런 증상이 있다면 방문하세요</h4>
              <p className="text-xs text-gray-600 mt-1">체크리스트로 표시될 증상 목록을 입력합니다</p>
            </div>
            <button
              onClick={handleAddSymptom}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 증상 추가
            </button>
          </div>

          {symptoms.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 증상이 없습니다</p>
              <button
                onClick={handleAddSymptom}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 증상 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {symptoms.map((symptom, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 min-w-[80px]">증상 #{index + 1}</span>
                  <input
                    type="text"
                    value={symptom}
                    onChange={(e) => handleUpdateSymptom(index, e.target.value)}
                    placeholder="예: 3개월 이상 지속되는 허리 통증"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => handleDeleteSymptom(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold px-3"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Treatment Methods Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">비타민 마취통증의학과 치료 방법</h4>
              <p className="text-xs text-gray-600 mt-1">클리닉에서 제공하는 치료 방법을 카드 형태로 표시합니다</p>
            </div>
            <button
              onClick={handleAddTreatmentMethod}
              className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              + 치료 방법 추가
            </button>
          </div>

          {treatmentMethods.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">등록된 치료 방법이 없습니다</p>
              <button
                onClick={handleAddTreatmentMethod}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                첫 치료 방법 추가하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {treatmentMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">치료 방법 #{index + 1}</span>
                    <button
                      onClick={() => handleDeleteTreatmentMethod(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">제목</label>
                    <input
                      type="text"
                      value={method.title}
                      onChange={(e) => handleUpdateTreatmentMethod(index, 'title', e.target.value)}
                      placeholder="신경차단술"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">설명</label>
                    <textarea
                      value={method.description}
                      onChange={(e) => handleUpdateTreatmentMethod(index, 'description', e.target.value)}
                      placeholder="통증을 전달하는 신경을 차단하여 통증을 완화하는 치료법입니다."
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
          disabled={!clinicPage.heroImageUrl || !clinicPage.heroTitle || saving}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}
