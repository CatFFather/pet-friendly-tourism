'use client';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

// COMPONENT
import SearchInput from '@/components/input/SearchInput';

export default function SearchLayout({ children }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50">
        <div className="px-1.5 py-2">
          <Form action="">
            <SearchInput name="keyword" defaultValue={keyword} />
          </Form>
        </div>
      </div>
      {children}
    </div>
  );
}
