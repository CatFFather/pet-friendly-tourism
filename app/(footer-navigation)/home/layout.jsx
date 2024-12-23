import { Suspense } from 'react';
// COMPONENT
import PetTourCategoryList from '@/components/category/PetTourCategoryList';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';

// 카테고리 코드 리스트
// ※이 페이지 올 때 마다 호출하는데 이걸 한번만 호출하여 관리 하면 좋은데 'use client'선언 후 관리 해야할지?
// --> 서버에서는 클라이언트에 데이터가 존재하는지 모르기 때문에 계속 호출 하게 됨
async function getCategoryCodeList() {
  try {
    const { data } = await KorPetTourService.getCategoryCodeList({
      numOfRows: 20,
    });
    const newCategoryCodeList = [
      { code: '', name: '전체 ' }, // 전체 code는 null 이 아닌 ''로 지정함 --> 만약 code를 null로 하게되면 element의 id가 null이 ''로 들어감 PetTourCategoryList컴포넌트의 li 부분
      ...(data?.response?.body?.items?.item || []),
    ];
    return newCategoryCodeList;
  } catch (e) {
    console.log('e', e);
  }
}

export default async function HomeLayout({ children }) {
  const categoryCodeList = (await getCategoryCodeList()) || []; // 서버에서 데이터 가져오기

  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50">
        <Suspense>
          <PetTourCategoryList categoryCodeList={categoryCodeList} />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
