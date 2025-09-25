'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function BackButton({ href, children, className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleBack}
      className={`flex items-center space-x-2 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>{children || 'Kembali'}</span>
    </Button>
  );
}
