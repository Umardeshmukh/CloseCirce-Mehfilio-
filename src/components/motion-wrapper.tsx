'use client';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export const MotionWrapper = ({ children, className, ...props }: MotionWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 15 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
