'use client';

const IMAGE_PRESETS = {
  hero: { ratio: '4:5', width: 800, height: 1000, name: 'Hero' },
  service: { ratio: '16:9', width: 1280, height: 720, name: 'Service' },
  gallery: { ratio: '1:1', width: 800, height: 800, name: 'Gallery' },
  default: { ratio: 'Square', width: 1200, height: 1200, name: 'Default' },
} as const;

type ImagePreset = keyof typeof IMAGE_PRESETS;

interface CompactImagePresetProps {
  preset: ImagePreset;
  onPresetChange: (preset: ImagePreset) => void;
}

export default function CompactImagePreset({ preset, onPresetChange }: CompactImagePresetProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <label className="text-sm font-medium text-neutral-700 min-w-[60px]">
        프리셋
      </label>
      <select
        value={preset}
        onChange={(e) => onPresetChange(e.target.value as ImagePreset)}
        className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-vitamin-500 focus:outline-none text-sm bg-white"
      >
        {(Object.keys(IMAGE_PRESETS) as ImagePreset[]).map((key) => {
          const info = IMAGE_PRESETS[key];
          return (
            <option key={key} value={key}>
              {info.name} ({info.ratio}, {info.width}x{info.height}px)
            </option>
          );
        })}
      </select>
      <span className="text-xl">📸</span>
    </div>
  );
}

export type { ImagePreset };
