import React, { cloneElement, isValidElement } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import TopBackButtonLayout from '@/components/layout/TopBackButtonLayout';

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

export default async function PetTourDetailLayout({ params, children, modal }) {
  // const { contentInfo } = await params;
  // const contentTypeId = contentInfo?.[0];
  // const contentId = contentInfo?.[1];
  // const detailItems = await getDetailItems(contentTypeId, contentId); // 서버에서 데이터 가져오기
  // React.cloneElement를 사용해 children에 props 전달
  // const childrenWithProps = cloneElement(props.children, { ...detailItems });
  // console.log('childrenWithProps', childrenWithProps);

  // const childrenWithTabs = React.Children.toArray(props.children).map(
  //   (child) => {
  //     if (isValidElement(child)) {
  //       return cloneElement(props.children, { ...detailItems });
  //     }
  //     return child;
  //   },
  // );
  // console.log('childrenWithTabs', childrenWithTabs);
  const tilte = '타이틀 고민중';

  return (
    <TopBackButtonLayout tilte={tilte}>
      {children}
      {modal}
    </TopBackButtonLayout>
  );
}
