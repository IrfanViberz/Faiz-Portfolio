'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const OfflineGame = dynamic(() => import('@/components/arcade/OfflineGame'), { ssr: false });

export default function NotFound() {
  const router = useRouter();

  return (
    <OfflineGame
      customTitle="404 — ROUTE NOT FOUND"
      customSubtitle="SECTOR UNCHARTED • PLAY OR RETURN HOME"
      onReturnToPortfolio={() => router.push('/')}
    />
  );
}
