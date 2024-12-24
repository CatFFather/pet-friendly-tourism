import Image from 'next/image';
import Form from 'next/form';
// STYLE
import { mobileWidth, mobileBreakpoint } from '@/styles/commonStyles';
// COMPONENT
import SearchInput from '@/components/input/SearchInput';

const mobileWidthClass = `w-[${mobileWidth}px] max-${mobileBreakpoint}:w-full`;
export default function RootContainer({ children }) {
  return (
    <div className="flex justify-center gap-5">
      {/* 좌측화면 1024px까지만 노출 */}
      <div className="flex flex-col sticky top-0 h-screen max-w-[400px] py-10 gap-4 justify-between max-lg:hidden">
        <div className="flex flex-col gap-6">
          <Image
            draggable={false}
            width={400}
            height={400}
            // fill
            // className="object-cover rounded-lg box-border border border-[#F3F6F6]"
            src="/images/DalkongLogo.png"
            sizes="100%" // sizes를 지정해달라고 해서 임시로 100%로 해놨는데 이거 무슨값을 넣어도 바뀌지않는데 왜그럴까?
            alt="main-logo"
          />
          <div className="flex flex-col gap-3.5">
            <p>
              개모임은 반려동물 동반여행 가능한 관광지, 문화시설, 축제공연행사,
              숙박, 음식점, 레포츠, 쇼핑의 관광정보를 제공합니다.
            </p>
            <Form action="/search">
              <SearchInput name="keyword" />
            </Form>
          </div>
        </div>
        <div>하단 설명</div>
      </div>
      {/* 우측화면 실제 모바일 화면 640px 기준으로 full */}
      <div
        className={`relative min-h-screen w-[500px] max-md:w-full border-x border-[#E1E1E1] border-solid`}
      >
        {children}
      </div>
    </div>
  );
}
