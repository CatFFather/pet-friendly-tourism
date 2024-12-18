import DOMPurify from 'dompurify';
import Image from 'next/image';
// ICON
import {
  PhoneIcon,
  MapIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
// UTIL
import {
  formatCommaNumber,
  introCategorizedFields,
  categories,
} from '@/utils/format';
// COMPONENT
import ImgCarousel from '@/components/carousel/ImgCarousel';

export default async function MapPage({ params }) {
  const { contentInfo } = await params;
  const contentTypeId = contentInfo?.[0];
  const contentId = contentInfo?.[1];
  console.log('여기는 페이지 이동!!!!!!!!!');
  console.log('contentTypeId@@@@@@@@@@@@@@', contentTypeId);
  console.log('contentId@@@@@@@@@@@@@@', contentId);

  return (
    <div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
      <div>여기는 지도 페이지</div>
    </div>
  );
}
