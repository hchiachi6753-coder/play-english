'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface OptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  showResult?: boolean;
}

const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(
  ({ 
    className, 
    children, 
    selected, 
    correct, 
    incorrect, 
    showResult,
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = `
      w-full p-4 min-h-[64px]
      flex items-center justify-center
      text-lg font-medium text-center
      rounded-2xl
      border-3 border-transparent
      transition-all duration-200 ease-out
      active:scale-[0.98]
      disabled:pointer-events-none
      shadow-md
    `;

    const getStateStyles = () => {
      if (showResult && correct) {
        return `
          bg-gradient-to-b from-emerald-100 to-emerald-200
          border-emerald-400
          text-emerald-800
          shadow-emerald-200
          animate-bounce-gentle
        `;
      }
      
      if (showResult && incorrect) {
        return `
          bg-gradient-to-b from-rose-100 to-rose-200
          border-rose-400
          text-rose-800
          shadow-rose-200
          animate-shake
        `;
      }
      
      if (selected) {
        return `
          bg-gradient-to-b from-sky-100 to-sky-200
          border-sky-400
          text-sky-800
          shadow-sky-200
          scale-[1.02]
        `;
      }
      
      return `
        bg-white
        border-gray-200
        text-gray-700
        hover:border-sky-300
        hover:bg-sky-50
        hover:shadow-lg
      `;
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, getStateStyles(), className)}
        disabled={disabled || showResult}
        {...props}
      >
        {children}
      </button>
    );
  }
);

OptionCard.displayName = 'OptionCard';

export { OptionCard };
