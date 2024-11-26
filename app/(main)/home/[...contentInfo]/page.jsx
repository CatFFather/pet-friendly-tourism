import Image from 'next/image';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT

// 상세 데이터 가져오기
async function getDetailItems(contentTypeId, contentId) {
  const [detailPetTour, detailInfo, detailCommon, detailIntro] =
    await Promise.all([
      KorPetTourService.getDetailPetTour({
        contentId,
      }),
      KorPetTourService.getDetailInfo({
        contentTypeId,
        contentId,
      }),
      KorPetTourService.getDetailCommon({
        contentId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        areacodeYN: 'Y',
        catcodeYN: 'Y',
        addrinfoYN: 'Y',
        mapinfoYN: 'Y',
        overviewYN: 'Y',
      }),
      KorPetTourService.getDetailIntro({
        contentTypeId,
        contentId,
      }),
    ]);
  const detailItems = {
    petTour: detailPetTour?.response?.body?.items?.item?.[0],
    info: detailInfo?.response?.body?.items?.item?.[0],
    common: detailCommon?.response?.body?.items?.item?.[0],
    intro: detailIntro?.response?.body?.items?.item?.[0],
  };
  return detailItems;
}

export default async function ContentPage({ params }) {
  const { contentInfo } = await params;
  const contentTypeId = contentInfo?.[0];
  const contentId = contentInfo?.[1];
  const detailItems = await getDetailItems(contentTypeId, contentId); // 서버에서 데이터 가져오기
  const { petTour, info, common, intro } = detailItems;
  console.log('detailItems', detailItems);
  return (
    <div>
      <div>{common.title}</div>
      <div className="relative after:content-[''] after:pb-[90%] after:block">
        <Image
          fill
          className="object-cover rounded-lg box-border border border-[#F3F6F6]"
          src={
            common?.firstimage ||
            common?.firstimage2 ||
            '/images/DefaultImage.webp'
          }
          alt={common?.title}
        />
      </div>
      <div>{common.overview}</div>
    </div>
  );
}
