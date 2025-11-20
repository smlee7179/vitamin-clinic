'use client';

interface CompactFontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showPreview?: boolean;
}

const fontSizes = [
  { value: 'text-xs', label: 'XS (12px)' },
  { value: 'text-sm', label: 'SM (14px)' },
  { value: 'text-base', label: 'Base (16px)' },
  { value: 'text-lg', label: 'LG (18px)' },
  { value: 'text-xl', label: 'XL (20px)' },
  { value: 'text-2xl', label: '2XL (24px)' },
  { value: 'text-3xl', label: '3XL (30px)' },
  { value: 'text-4xl', label: '4XL (36px)' },
  { value: 'text-5xl', label: '5XL (48px)' },
  { value: 'text-6xl', label: '6XL (60px)' },
  { value: 'text-7xl', label: '7XL (72px)' },
];

export default function CompactFontSelector({
  value,
  onChange,
  label,
  showPreview = false
}: CompactFontSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <label className="text-sm font-medium text-neutral-700 min-w-[100px]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm bg-white"
      >
        {fontSizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
      {showPreview && (
        <div className={`${value} text-neutral-600 font-bold min-w-[50px] text-center`}>
          Aa
        </div>
      )}
    </div>
  );
}
