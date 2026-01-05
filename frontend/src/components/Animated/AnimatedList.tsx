import { motion } from 'framer-motion';
import { Children } from 'react';
import type { ReactNode } from 'react';

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scale';
}

const itemVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
    },
  },
};

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'fadeIn',
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemAnimation = itemVariants[animation];
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div 
          key={index} 
          variants={itemAnimation}
          transition={{ 
            duration: animation === 'slideUp' ? 0.5 : 0.4,
            ease: 'easeOut'
          }}
          style={{ 
            // Ensure all items have the same size
            width: '100%',
            height: '100%'
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

