import { Suspense } from 'react';

// COMPONENT
import SearchInputLayout from '@/components/layout/SearchInputLayout';

export default function SearchLayout({ children }) {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50">
        <Suspense>
          <SearchInputLayout />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
