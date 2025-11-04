'use client';

import { useState, useEffect } from 'react';

interface Treatment {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

interface TreatmentEditorProps {
  onSave?: () => void;
}

export default function TreatmentEditor({ onSave }: TreatmentEditorProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      title: '신경차단술',
      icon: '💉',
      description: '통증 부위에 직접 약물을 주입하여 신경을 차단하고 통증을 완화합니다.',
      features: ['척추 신경차단', '관절 신경차단', '근막통증 치료', '대상포진 후 신경통']
    },
    {
      title: '주사치료',
      icon: '💊',
      description: '염증과 통증을 완화하는 약물을 직접 주입하여 빠른 효과를 얻습니다.',
      features: ['스테로이드 주사', 'DNA 주사', '프롤로 주사', '히알루론산 주사']
    },
    {
      title: '도수치료',
      icon: '🤲',
      description: '전문 치료사의 손으로 근육과 관절을 치료하여 기능을 회복합니다.',
      features: ['근막이완술', '관절가동술', '척추교정', '자세교정']
    },
    {
      title: '체외충격파',
      icon: '⚡',
      description: '고에너지 충격파로 통증 부위를 자극하여 재생을 촉진합니다.',
      features: ['석회성 건염', '족저근막염', '테니스엘보', '오십견']
    }
  ]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    loadFromDB();
  }, []);

  const loadFromDB = async () => {
    try {
      const response = await fetch('/api/treatments');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setTreatments(data);
        }
      }
    } catch (error) {
      console.error('Failed to load treatments from DB:', error);
      // Fallback to localStorage
      const saved = localStorage.getItem('treatments');
      if (saved) {
        try {
          setTreatments(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load treatments');
        }
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ treatments }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // Also save to localStorage for backward compatibility
      localStorage.setItem('treatments', JSON.stringify(treatments));
      setIsModified(false);
      if (onSave) onSave();
      alert('치료방법이 저장되었습니다!');
    } catch (error) {
      console.error('Error saving treatments:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const updateTreatment = (index: number, field: keyof Treatment, value: string | string[]) => {
    const updated = [...treatments];
    updated[index] = { ...updated[index], [field]: value };
    setTreatments(updated);
    setIsModified(true);
  };

  const updateFeature = (treatmentIndex: number, featureIndex: number, value: string) => {
    const updated = [...treatments];
    updated[treatmentIndex].features[featureIndex] = value;
    setTreatments(updated);
    setIsModified(true);
  };

  const addFeature = (treatmentIndex: number) => {
    const updated = [...treatments];
    updated[treatmentIndex].features.push('새로운 특징');
    setTreatments(updated);
    setIsModified(true);
  };

  const removeFeature = (treatmentIndex: number, featureIndex: number) => {
    const updated = [...treatments];
    updated[treatmentIndex].features = updated[treatmentIndex].features.filter((_, i) => i !== featureIndex);
    setTreatments(updated);
    setIsModified(true);
  };

  const iconOptions = ['💉', '💊', '🤲', '⚡', '🩺', '💝', '🏥', '⚕️', '🔬', '💪'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">💉</span> 치료방법
          </h3>
          <p className="text-sm text-gray-600 mt-1">병원에서 제공하는 치료방법을 편집합니다</p>
        </div>
        {isModified && (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            💾 저장
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {treatments.map((treatment, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <div className="space-y-4">
              {/* Icon & Title */}
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">아이콘</label>
                  <select
                    value={treatment.icon}
                    onChange={(e) => updateTreatment(index, 'icon', e.target.value)}
                    className="text-3xl p-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">치료명</label>
                  <input
                    type="text"
                    value={treatment.title}
                    onChange={(e) => updateTreatment(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="치료명"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                  value={treatment.description}
                  onChange={(e) => updateTreatment(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="치료 방법 설명"
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">치료 특징</label>
                  <button
                    onClick={() => addFeature(index)}
                    className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    + 추가
                  </button>
                </div>
                <div className="space-y-2">
                  {treatment.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, featureIdx, e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="특징"
                      />
                      <button
                        onClick={() => removeFeature(index, featureIdx)}
                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start mb-2">
                  <div className="text-4xl mr-3">{treatment.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{treatment.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                  </div>
                </div>
                <div className="mt-3 pl-12">
                  <ul className="space-y-1 text-sm text-gray-700">
                    {treatment.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-purple-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModified && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ 변경사항이 저장되지 않았습니다. 저장 버튼을 클릭하세요.
          </p>
        </div>
      )}
    </div>
  );
}
