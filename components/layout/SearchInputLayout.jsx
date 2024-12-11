'use client';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

// COMPONENT
import SearchInput from '@/components/input/SearchInput';

export default function SearchInputLayout({}) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <div className="px-1.5 py-2">
      <Form key={keyword} action="">
        <SearchInput name="keyword" defaultValue={keyword} />
      </Form>
    </div>
  );
}
