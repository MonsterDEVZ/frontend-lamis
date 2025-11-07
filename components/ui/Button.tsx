import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/styles';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border_solid',
  {
    variants: {
      variant: {
        primary: 'bg-[#009B3E] text-white hover:text-black border-[#009B3E] hover:bg-white',
        secondary: 'bg-[#009B3E] text-white hover:text-black border-[#009B3E] hover:bg-white',
        outline:
          'leading-6 outline-none border-[#EEEEEE] hover:text-white hover:bg-[#009B3E] hover:border-[#009B3E]',
        outline_gr:
          'leading-6 outline-none border-[#009B3E] text-[#009B3E] hover:text-white hover:bg-[#009B3E] hover:border-[#009B3E]',
        dark: 'bg-black border-black hover:bg-white text-white hover:text-black h-12 rounded-4xl w-48 text-center',
        empty: '',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-6 py-1 rounded-md',
        lg: 'h-12 px-8 rounded-md',
        icon: 'h-12 w-12 flex items-center justify-center rounded-full border-[#EEEEEE] hover:text-white hover:bg-[#009B3E] hover:border-[#009B3E]',
      },
      round: {
        default: 'rounded-4xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      round: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
