// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import HomeList from '@/app/(footer-navigation)/home/(list)/HomeList';

// 최초 데이터
async function getInitialData() {
  try {
    const { data } = await KorPetTourService.getAreaBasedList({
      numOfRows: 50,
    });
    return data;
  } catch (e) {
    console.log('e', e);
  }
}

export default async function Home() {
  const initialData = (await getInitialData()) || []; // 서버에서 데이터 가져오기
  console.log('initialData', initialData);

  return (
    <>
      <HomeList initialData={initialData} />
    </>
  );
}
