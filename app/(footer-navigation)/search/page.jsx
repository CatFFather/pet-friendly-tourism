import Image from 'next/image';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import SearchList from '@/app/(footer-navigation)/search/(list)/SearchList';

// 최초 데이터
async function getInitialData(query) {
  if (!query?.keyword) return [];
  try {
    const { data } = await KorPetTourService.getSearchKeywordList({
      numOfRows: 50,
      arrange: 'R',
      ...query,
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}

export default async function Search({ searchParams }) {
  const query = await searchParams;

  const initialData = query?.keyword ? await getInitialData(query) : []; // 서버에서 데이터 가져오기
  return <SearchList initialData={initialData} query={query} />;
}
