import qs from 'qs';
import axios from 'axios';
import { NextResponse } from 'next/server';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//     res.status(200).json({ name: 'John Doe' });
//   }
// }

// export async function GET(req, res) {
//   res.status(200).json({ name: 'John Doe' });
// }

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  console.log('searchParams', searchParams);

  const params = {
    serviceKey: searchParams.get('serviceKey'),
    MobileOS: searchParams.get('MobileOS'),
    MobileApp: searchParams.get('MobileApp'),
    contentId: searchParams.get('contentId'),
    contentTypeId: searchParams.get('contentTypeId'),
    _type: searchParams.get('_type'),
  };

  // TODO fetch 로 하면 됨 axios도 instance 안쓰면 됨

  const url =
    'https://apis.data.go.kr/B551011/KorPetTourService/detailInfo?serviceKey=CiigqLJetyGEPTWT3WrAEexRWR82paaea%2FqNNVRcwtZXCE%2Fq2R3YnCdR2WGzr%2FIjF%2BOzsQon5Ncfb06PV8CVhQ%3D%3D&MobileOS=WIN&MobileApp=test-app&_type=json&contentId=2376711&contentTypeId=32';

  // 1. fetch
  // const response = await fetch(url, {
  //   // headers: {
  //   //   'Content-Type': 'application/json',
  //   //   'API-Key': process.env.DATA_API_KEY,
  //   // },
  // });
  // console.log('response', response);
  // const data = await response.json();
  // console.log('data@@@@@@@@@@@@@@@', data);
  // return NextResponse.json(data, {});

  // 2. axios
  try {
    const response = await axios.get(url, {
      // headers: {},
    });
    console.log('response', response);
    return NextResponse?.json(response.data, {});
  } catch (err) {
    console.log('err', err);
    return NextResponse.json(err);
  }

  // 3. axios korPetTourServiceInstance 사용 --> 오류 발생함 무슨 차이인지 잘 모르겠음
  // try {
  //   const response = await KorPetTourService.getDetailInfo(params);
  //   console.log('response', response);
  //   return NextResponse.json(response.data);
  // } catch (err) {
  //   console.log('err', err);
  //   return NextResponse.json(err);
  // }
}
