import Form from 'next/form';
// COMPONENT
import SearchInput from '@/components/input/SearchInput';

export default function RootContainer({ children }) {
  return (
    <div className="flex justify-center gap-5">
      {/* 좌측화면 1024px까지만 노출 */}
      <div className="flex flex-col sticky top-0 h-screen max-w-[400px] py-10 gap-4 justify-between max-lg:hidden">
        <div>개모임</div>
        <div className="flex flex-col gap-3.5">
          <p>
            개모임은 반려동물 동반여행 가능한 관광지, 문화시설, 축제공연행사,
            숙박, 음식점, 레포츠, 쇼핑의 관광정보를 제공합니다.
          </p>
          <Form action="/search">
            <SearchInput name="keyword" />
          </Form>
        </div>
        <div></div>
      </div>
      {/* 우측화면 실제 모바일 화면 640px 기준으로 full */}
      <div className="min-h-screen w-[430px] relative border-x border-[#E1E1E1] border-solid box-content max-sm:w-full">
        {children}
      </div>
    </div>
  );
}
