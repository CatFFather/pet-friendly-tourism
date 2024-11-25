// 'use client';
import axios from 'axios';
import qs from 'qs';

// import { useRouter } from 'next/navigation';
// import { useEffect, use } from 'react';

// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// COMPONENT
import HomeList from '@/app/(main)/home/(list)/HomeList';

// 상세 데이터 가져오기
async function getDetailItems(contentTypeId, contentId) {
  console.log('contentTypeId ', contentTypeId);
  console.log('contentId', contentId);

  const params = {
    serviceKey: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_KEY,
    MobileApp: 'test-app', // TODO 나중에 변경
    MobileOS: 'WIN', // TODO 모바일, 웹 구분 필요
    _type: 'json',
    contentTypeId,
    contentId,
  };
  console.log('params', params);
  console.log('qs.stringify(params)', qs.stringify(params));
  const url = `${
    process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_URL
  }/detailInfo?${qs.stringify(params)}`;
  console.log('url', url);
  const response = await fetch(url);
  console.log('response', response);
  const data = await response.json();
  console.log('data', data);
  return data;

  // try {
  //   const { data } = await KorPetTourService.getDetailCommon({
  //     contentTypeId,
  //     contentId,
  //     // numOfRows: 50,
  //   });
  //   console.log('data', data);
  //   return data;
  // } catch (e) {
  //   console.log('e', e);
  // }
}

export default async function ContentPage({ params }) {
  // const { contentInfo } = use(params);
  // console.log('contentInfo', contentInfo);
  // // 상세 데이터 가져오기
  // async function getDetailItems(contentTypeId, contentId) {
  //   console.log('contentTypeId ', contentTypeId);
  //   console.log('contentId', contentId);

  //   const url =
  //     'https://apis.data.go.kr/B551011/KorPetTourService/detailInfo?serviceKey=CiigqLJetyGEPTWT3WrAEexRWR82paaea%2FqNNVRcwtZXCE%2Fq2R3YnCdR2WGzr%2FIjF%2BOzsQon5Ncfb06PV8CVhQ%3D%3D&MobileOS=WIN&MobileApp=test-app&_type=json&contentId=2376711&contentTypeId=32';
  //   // fetch 로 데이터 가져오기
  //   // const response = await fetch(url, {
  //   //   // headers: {
  //   //   //   'Content-Type': 'application/json',
  //   //   //   'API-Key': process.env.DATA_API_KEY,
  //   //   // },
  //   // });
  //   // console.log('response', response);
  //   // const data = await response.json();
  //   // console.log('data', data);

  //   try {
  //     const data = await KorPetTourService.getDetailData({
  //       contentTypeId,
  //       contentId,
  //       // numOfRows: 1,
  //       // pageNo: 1,
  //       // numOfRows: 50,
  //     });
  //     console.log('data??????????', data);
  //     return data;
  //   } catch (e) {
  //     console.log('e', e);
  //   }

  //   // try {
  //   //   const data = await KorPetTourService.getDetailInfo({
  //   //     contentTypeId: '2376711',
  //   //     contentId: '32',
  //   //     // numOfRows: 1,
  //   //     // pageNo: 1,
  //   //     // numOfRows: 50,
  //   //   });
  //   //   console.log('data??????????', data);
  //   //   return data;
  //   // } catch (e) {
  //   //   console.log('e', e);
  //   // }
  //   // try {
  //   //   const url =
  //   //     'https://apis.data.go.kr/B551011/KorPetTourService/detailInfo?serviceKey=CiigqLJetyGEPTWT3WrAEexRWR82paaea%2FqNNVRcwtZXCE%2Fq2R3YnCdR2WGzr%2FIjF%2BOzsQon5Ncfb06PV8CVhQ%3D%3D&MobileOS=WIN&MobileApp=test-app&_type=json&contentId=2376711&contentTypeId=32';
  //   //   const response = await axios.get(url, {
  //   //     headers: {},
  //   //   });
  //   //   console.log('response', response);
  //   // } catch (err) {
  //   //   console.log('err', err);
  //   // }
  // }
  // useEffect(() => {
  //   getDetailItems(contentInfo[0], contentInfo[1]);
  // }, []);

  // const router = useRouter();
  // const [title, id] = router?.query?.params;
  // useEffect(() => {
  //   console.log('title', title);
  // }, []);

  const { contentInfo } = await params;
  const contentTypeId = contentInfo?.[0];
  const contentId = contentInfo?.[1];
  console.log('contentInfo', contentInfo);
  const detailItems = await getDetailItems(contentTypeId, contentId); // 서버에서 데이터 가져오기
  console.log('detailItems', detailItems);
  return <>상세@@@@@@@@@@@@@@@@@@@@@@@</>;
}
