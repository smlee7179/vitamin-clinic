'use client';

import { useState } from 'react';

interface AccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function AccordionSection({ title, defaultOpen = false, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-neutral-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between transition-colors"
      >
        <span className="font-semibold text-neutral-800">{title}</span>
        <span className="text-xl text-neutral-600">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
