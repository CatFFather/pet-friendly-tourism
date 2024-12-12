// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import HomeList from '@/app/(footer-navigation)/home/(list)/HomeList';

// 최초 데이터
async function getInitialData(query) {
  try {
    const { data } = await KorPetTourService.getAreaBasedList({
      numOfRows: 50,
      arrange: 'R',
      ...query,
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const initialData = (await getInitialData(query)) || []; // 서버에서 데이터 가져오기

  return <HomeList initialData={initialData} query={query} />;
}
