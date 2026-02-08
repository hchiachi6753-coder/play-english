'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-bold rounded-2xl
      transition-all duration-200 ease-out
      active:scale-95
      disabled:opacity-50 disabled:pointer-events-none
      shadow-md hover:shadow-lg
      focus:outline-none focus:ring-4 focus:ring-offset-2
    `;

    const variants = {
      primary: `
        bg-gradient-to-b from-orange-400 to-orange-500
        hover:from-orange-500 hover:to-orange-600
        text-white
        focus:ring-orange-300
        shadow-orange-200
      `,
      secondary: `
        bg-gradient-to-b from-sky-400 to-sky-500
        hover:from-sky-500 hover:to-sky-600
        text-white
        focus:ring-sky-300
        shadow-sky-200
      `,
      success: `
        bg-gradient-to-b from-emerald-400 to-emerald-500
        hover:from-emerald-500 hover:to-emerald-600
        text-white
        focus:ring-emerald-300
        shadow-emerald-200
      `,
      danger: `
        bg-gradient-to-b from-rose-400 to-rose-500
        hover:from-rose-500 hover:to-rose-600
        text-white
        focus:ring-rose-300
        shadow-rose-200
      `,
      ghost: `
        bg-white/80 hover:bg-white
        text-gray-700
        border-2 border-gray-200
        focus:ring-gray-200
        shadow-gray-100
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[48px]',
      lg: 'px-8 py-4 text-lg min-h-[56px]',
      xl: 'px-10 py-5 text-xl min-h-[64px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
