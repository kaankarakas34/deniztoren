import Link from 'next/link';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
const variants = cva('button', {
  variants: { tone: { gold: 'button-gold', outline: 'button-outline' } },
  defaultVariants: { tone: 'gold' },
});
export function ButtonLink({
  href,
  tone = 'gold',
  children,
  className,
}: {
  href: string;
  tone?: 'gold' | 'outline';
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(variants({ tone }), className)}>
      {children}
    </Link>
  );
}
