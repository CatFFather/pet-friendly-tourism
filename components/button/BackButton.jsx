'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton({}) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <ArrowLeftIcon className="h-10 w-10 p-2 -ml-2" />
    </button>
  );
}
