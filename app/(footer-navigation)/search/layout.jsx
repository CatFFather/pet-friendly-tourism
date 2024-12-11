import Form from 'next/form';

// COMPONENT
import SearchInput from '@/components/input/SearchInput';

export default async function SearchLayout({ children }) {
  // TODO 만약 외부에서 qs keyword를 넣어 진입 했을 때 defaultValue를 qs로 넣어줄 수 있을지 고민
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50">
        <div className="px-1.5 py-2">
          <Form action="">
            <SearchInput name="keyword" />
          </Form>
        </div>
      </div>
      {children}
    </div>
  );
}
