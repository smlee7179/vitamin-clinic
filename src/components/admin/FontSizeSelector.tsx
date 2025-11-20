'use client';

interface FontSizeSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const fontSizeOptions = [
  { value: 'text-xs', label: 'XS (12px)', preview: 'text-xs' },
  { value: 'text-sm', label: 'SM (14px)', preview: 'text-sm' },
  { value: 'text-base', label: 'Base (16px)', preview: 'text-base' },
  { value: 'text-lg', label: 'LG (18px)', preview: 'text-lg' },
  { value: 'text-xl', label: 'XL (20px)', preview: 'text-xl' },
  { value: 'text-2xl', label: '2XL (24px)', preview: 'text-2xl' },
  { value: 'text-3xl', label: '3XL (30px)', preview: 'text-3xl' },
  { value: 'text-4xl', label: '4XL (36px)', preview: 'text-4xl' },
  { value: 'text-5xl', label: '5XL (48px)', preview: 'text-5xl' },
];

export default function FontSizeSelector({ label, value, onChange, className = '' }: FontSizeSelectorProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {fontSizeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              relative px-3 py-2 rounded-lg border-2 transition-all duration-200
              ${
                value === option.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50'
              }
            `}
          >
            <div className="text-xs font-medium mb-1">{option.label}</div>
            <div className={`${option.preview} font-normal text-gray-600`}>
              Aa
            </div>
            {value === option.value && (
              <div className="absolute top-1 right-1">
                <i className="ri-check-line text-orange-500"></i>
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 mb-2">미리보기:</p>
        <p className={`${value} text-gray-900`}>
          샘플 텍스트입니다. 이 크기로 표시됩니다.
        </p>
      </div>
    </div>
  );
}
