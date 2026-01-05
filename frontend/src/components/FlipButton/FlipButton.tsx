import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

interface FlipButtonProps extends Omit<ComponentProps<typeof motion.button>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  from?: 'top' | 'right' | 'bottom' | 'left';
  tapScale?: number;
  isFlipped?: boolean;
}

const variantStyles = {
  default: 'bg-[#5e3bee] text-white hover:bg-[#4d2fc7]',
  accent: 'bg-[#5e3bee] text-white hover:bg-[#4d2fc7]',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border border-[#5e3bee] text-[#5e3bee] hover:bg-[#5e3bee] hover:text-white',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'hover:bg-gray-100 text-gray-700',
  link: 'text-[#5e3bee] hover:underline',
};

const sizeStyles = {
  default: 'h-10 px-4 text-sm',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

export const FlipButton: React.FC<FlipButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  from = 'top',
  tapScale = 0.95,
  isFlipped: controlledFlipped,
  className = '',
  ...props
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (controlledFlipped === undefined) {
      setInternalFlipped(!internalFlipped);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const getRotation = () => {
    switch (from) {
      case 'top':
        return { rotateX: isFlipped ? 180 : 0 };
      case 'bottom':
        return { rotateX: isFlipped ? -180 : 0 };
      case 'left':
        return { rotateY: isFlipped ? 180 : 0 };
      case 'right':
        return { rotateY: isFlipped ? -180 : 0 };
      default:
        return { rotateX: isFlipped ? 180 : 0 };
    }
  };

  return (
    <motion.button
      {...props}
      onClick={handleClick}
      whileTap={{ scale: tapScale }}
      className={`
        relative inline-flex items-center justify-center
        rounded-md font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#5e3bee] focus:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={getRotation()}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(0deg)',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {React.Children.toArray(children)[0]}
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: from === 'top' || from === 'bottom' 
              ? 'rotateX(180deg)' 
              : 'rotateY(180deg)',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {React.Children.toArray(children)[1]}
        </div>
      </motion.div>
    </motion.button>
  );
};

