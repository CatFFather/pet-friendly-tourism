'use client';
import Form from 'next/form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// ICON
import { MapPinIcon } from '@heroicons/react/24/outline';
// COMPONENT
import SearchInput from '@/components/input/SearchInput';

export default function SearchInputLayout({}) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  return (
    <div className="px-1.5 py-2">
      <Form key={keyword} action="">
        <div className="flex gap-1 items-center">
          <div className="flex-grow">
            <SearchInput name="keyword" defaultValue={keyword} />
          </div>
          <Link href={{ pathname: '/pet-tour/detail/map' }} scroll={false}>
            <MapPinIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 " />
          </Link>
          {/* 
          href={{
              pathname: '/pet-tour/detail/map',
              query: {
                mapx: common?.mapx,
                mapy: common?.mapy,
                title: common?.title,
                addr: common?.addr1 || common?.addr2,
              },
            }} */}
        </div>
      </Form>
    </div>
  );
}
