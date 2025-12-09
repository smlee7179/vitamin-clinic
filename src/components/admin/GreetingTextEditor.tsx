'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontSize } from '@/lib/tiptap-extensions/FontSize';
import { useState } from 'react';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function GreetingTextEditor({ value, onChange }: Props) {
  const [fontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false);
  const [fontWeightDropdownOpen, setFontWeightDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      TextStyle,
      Color,
      FontSize,
    ],
    content: value || '<p>인사말 내용을 입력하세요...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const FONT_SIZES = [
    { label: '작게 (14px)', value: '14px' },
    { label: '기본 (16px)', value: '16px' },
    { label: '중간 (18px)', value: '18px' },
    { label: '크게 (20px)', value: '20px' },
    { label: '매우 크게 (24px)', value: '24px' },
  ];

  const FONT_WEIGHTS = [
    { label: '보통', value: 'normal', command: 'unsetBold' },
    { label: '굵게', value: 'bold', command: 'setBold' },
  ];

  const PRESET_COLORS = [
    { label: '진한 회색', value: '#374151' },
    { label: '회색', value: '#6B7280' },
    { label: '연한 회색', value: '#9CA3AF' },
    { label: '검은색', value: '#000000' },
    { label: '오렌지', value: '#f97316' },
    { label: '빨강', value: '#DC2626' },
    { label: '파랑', value: '#2563EB' },
  ];

  if (!editor) {
    return null;
  }

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes('textStyle').fontSize;
    const current = FONT_SIZES.find(size => size.value === fontSize);
    return current?.label || '폰트 크기 선택';
  };

  const getCurrentFontWeight = () => {
    return editor.isActive('bold') ? '굵게' : '보통';
  };

  const getCurrentColor = () => {
    const color = editor.getAttributes('textStyle').color;
    const current = PRESET_COLORS.find(c => c.value === color);
    return current?.label || '색상 선택';
  };

  const handleFontSizeSelect = (size: string) => {
    editor.chain().focus().setFontSize(size).run();
    setFontSizeDropdownOpen(false);
  };

  const handleFontWeightSelect = (weight: { command: string }) => {
    if (weight.command === 'setBold') {
      editor.chain().focus().setBold().run();
    } else {
      editor.chain().focus().unsetBold().run();
    }
    setFontWeightDropdownOpen(false);
  };

  const handleColorSelect = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setColorDropdownOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* Toolbar with Dropdowns */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 flex gap-3 flex-wrap items-center">
        {/* Font Size Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFontSizeDropdownOpen(!fontSizeDropdownOpen);
              setFontWeightDropdownOpen(false);
              setColorDropdownOpen(false);
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <span className="text-lg">🔤</span>
            {getCurrentFontSize()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {fontSizeDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[180px]">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => handleFontSizeSelect(size.value)}
                  className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font Weight Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFontWeightDropdownOpen(!fontWeightDropdownOpen);
              setFontSizeDropdownOpen(false);
              setColorDropdownOpen(false);
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <span className="text-lg font-bold">B</span>
            {getCurrentFontWeight()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {fontWeightDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[140px]">
              {FONT_WEIGHTS.map((weight) => (
                <button
                  key={weight.value}
                  type="button"
                  onClick={() => handleFontWeightSelect(weight)}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm ${
                    weight.value === 'bold' ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {weight.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setColorDropdownOpen(!colorDropdownOpen);
              setFontSizeDropdownOpen(false);
              setFontWeightDropdownOpen(false);
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <span className="text-lg">🎨</span>
            {getCurrentColor()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {colorDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[180px]">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleColorSelect(color.value)}
                  className="w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors text-sm flex items-center gap-3"
                >
                  <span
                    className="w-5 h-5 rounded border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </button>
              ))}
              <div className="border-t border-gray-200 p-2">
                <label className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700">
                  <span>커스텀:</span>
                  <input
                    type="color"
                    onChange={(e) => handleColorSelect(e.target.value)}
                    className="w-8 h-8 cursor-pointer border border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Clear Formatting Button */}
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
          }}
          className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="서식 지우기"
        >
          ✕ 서식 지우기
        </button>
      </div>

      {/* Editor Content */}
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 min-h-[300px] focus:outline-none whitespace-pre-wrap"
        />
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <span className="text-lg">💡</span>
          <div className="flex-1 text-sm text-blue-800">
            <p className="font-semibold mb-1">사용 방법</p>
            <ul className="space-y-1 text-xs">
              <li>• 텍스트를 <strong>드래그하여 선택</strong>한 후 위의 드롭다운 메뉴를 클릭하세요</li>
              <li>• 폰트 크기, 굵기, 색상을 각각 선택하여 적용할 수 있습니다</li>
              <li>• <strong>Enter</strong> 키를 누르면 새 문단이 생성되며 줄바꿈됩니다</li>
              <li>• <strong>Shift+Enter</strong>를 누르면 같은 문단 내에서 줄바꿈됩니다</li>
              <li>• "서식 지우기" 버튼으로 선택한 텍스트의 모든 스타일을 제거할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
