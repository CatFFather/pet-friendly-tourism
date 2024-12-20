'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import { HomeIcon } from '@heroicons/react/24/outline';
// COMPONENT
import Modal from '@/components/common/Modal';
// HOOK
import useKakaoLoader from '@/hooks/useKakaoLoader';

export default function DetailMappage({ params }) {
  const searchParams = useSearchParams();
  const mapx = searchParams.get('mapx') || ''; // mapy --> 위도(lat)
  const mapy = searchParams.get('mapy') || ''; // mapx--> 경도(lng)
  const addr = searchParams.get('addr') || ''; // 주소
  const [loading, error] = useKakaoLoader();

  // 현재 지도 위치 --> 홈 버튼 누르면 초기로 이동 하기 위하여 관리
  const [state, setState] = useState({
    center: { lat: mapy, lng: mapx }, // 지도의 초기 위치
    isPanto: false, // 지도 위치 변경시 panto를 이용할지에 대해서 정의
  });

  return (
    <Modal title="지도" full bottomSlide>
      {loading ? (
        '로딩중.....'
      ) : error ? (
        '에러발생: Kakao Maps 로드 실패'
      ) : (
        <div className="w-full h-full">
          <Map
            center={state.center}
            isPanto={state.isPanto}
            style={{ width: '100%', height: '100%', position: 'relative' }}
            level={3}
            onDragEnd={(map) => {
              const latlng = map.getCenter();
              setState({
                center: { lat: latlng.getLat(), lng: latlng.getLng() },
                isPanto: false,
              });
            }}
          >
            <MapMarker position={{ lat: mapy, lng: mapx }} />
            <ZoomControl position="RIGHT" />
            <button
              className="absolute bottom-2 right-2 z-50 bg-shadow-color rounded-full p-2.5"
              onClick={() => {
                setState({
                  center: { lat: mapy, lng: mapx },
                  isPanto: true,
                });
              }}
            >
              <HomeIcon className="h-7 w-7 text-[#ffffff]" />
            </button>
          </Map>
        </div>
      )}
    </Modal>
  );
}
