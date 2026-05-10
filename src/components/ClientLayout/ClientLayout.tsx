'use client';

import { usePathname } from 'next/navigation';
import PlayerBar from '@/components/PlayerBar/PlayerBar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showPlayer = pathname !== '/auth/login' && pathname !== '/auth/register';

  return (
    <>
      {children}
      {showPlayer && <PlayerBar />}
    </>
  );
}