'use client';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function EditorialIntro({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="hero-copy"
        initial={false}
        animate={reduced ? undefined : { y: [9, 0], opacity: [0.85, 1] }}
        transition={{ duration: 0.55, ease: [0.2, 0.65, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
