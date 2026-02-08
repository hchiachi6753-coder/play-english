'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
        <span>第 {current} 題</span>
        <span>共 {total} 題</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-orange-400 via-pink-400 to-sky-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
