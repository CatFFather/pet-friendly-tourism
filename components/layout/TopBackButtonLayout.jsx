'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TopBackButtonLayout({ children, tilte }) {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50 px-4 h-11 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-10 w-10 p-2 -ml-2" />
        </button>
        <span className="font-semibold text-[#000000] text-lg mt-0.5 flex-1 truncate">
          {tilte}
        </span>
      </div>
      {children}
    </div>
  );
}
