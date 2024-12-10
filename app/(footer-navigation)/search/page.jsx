import Image from 'next/image';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import HomeList from '@/app/(footer-navigation)/home/(list)/HomeList';

// 최초 데이터
async function getInitialData(query) {
  if (!query?.keyword) return [];
  try {
    const { data } = await KorPetTourService.getSearchKeywordList({
      numOfRows: 50,
      ...query,
    });
    console.log('data', data);
    return data;
  } catch (e) {
    console.log('e', e);
  }
}

export default async function Search({ searchParams }) {
  const query = await searchParams;
  console.log('query', query);

  const initialData = query?.keyword ? await getInitialData(query) : []; // 서버에서 데이터 가져오기
  console.log('initialData', initialData);
  return <HomeList initialData={initialData} query={query} />;
}
