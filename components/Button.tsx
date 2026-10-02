import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Added transform and will-change-transform for smoother active scaling
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform will-change-transform";
  
  const variants = {
    // Explicitly set hover:text-white to ensure text remains white
    primary: "bg-primary text-white hover:bg-primaryDark hover:text-white focus:ring-primary shadow-lg shadow-primary/10 hover:shadow-primary/20",
    secondary: "bg-gold text-white hover:bg-[#E0961F] hover:text-white focus:ring-gold shadow-md hover:shadow-lg",
    outline: "border border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 focus:ring-neutral-900",
    // Updated variant: transparent with white border -> Primary background on hover
    "outline-white": "border border-white text-white hover:bg-primary hover:border-primary hover:text-white focus:ring-white", 
    // Updated white variant to turn Primary on hover for better visibility
    white: "bg-white text-neutral-900 hover:bg-primary hover:text-white focus:ring-white shadow-lg",
    ghost: "text-neutral-900 dark:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 focus:ring-neutral-500",
  };

  // Optimized for touch on mobile (larger padding/height), kept compact on desktop
  const sizes = {
    sm: "px-6 py-3 text-xs md:px-5 md:py-2", 
    md: "px-8 py-4 text-sm md:px-8 md:py-3 md:text-xs",
    lg: "px-10 py-5 text-base md:px-10 md:py-4 md:text-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};