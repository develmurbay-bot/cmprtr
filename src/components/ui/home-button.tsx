'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HomeButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  isAdmin?: boolean;
}

export default function HomeButton({ href, children, className = '', isAdmin = false }: HomeButtonProps) {
  const homeUrl = isAdmin ? '/admin' : '/';
  const defaultText = isAdmin ? 'Dashboard Admin' : 'Beranda';

  return (
    <Link href={href || homeUrl}>
      <Button
        variant="default"
        className={`flex items-center space-x-2 ${className}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>{children || defaultText}</span>
      </Button>
    </Link>
  );
}
