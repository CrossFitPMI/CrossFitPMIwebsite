import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary CTA Button - White background for dark themes
        primary: "bg-[#ED1707] hover:bg-[#ED1707] text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:text-white hover:shadow-xl",
        
        // Secondary Button - Transparent with border
        secondary: "bg-transparent border-2 border-[#ED1707] text-[#ED1707]  hover:text-white hover:scale-105 font-semibold rounded-2xl",
        
        // Dark Button - Black background for light themes
        dark: "bg-black hover:bg-gray-800 text-white font-semibold rounded-2xl shadow-lg hover:scale-105",
        
        // Outline Button - Border with hover fill
        outline: "border-2 border-gray-300 text-gray-700 hover:border-black hover:bg-black hover:text-white font-semibold rounded-2xl",
        
        // Ghost Button - Minimal styling
        ghost: "text-gray-600 hover:text-black hover:bg-gray-100 font-medium rounded-xl",
        
        // Link Button - Text only
        link: "text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline font-medium",
      },
      size: {
        sm: "heading-sm px-4 py-2",
        default: "heading-md px-6 py-3", 
        lg: "heading-xl px-8 py-4",
        xl: "display-sm px-10 py-5",
        icon: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
