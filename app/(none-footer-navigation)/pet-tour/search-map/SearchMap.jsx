'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
import { HomeIcon } from '@heroicons/react/24/outline';
// HOOK
import useKakaoLoader from '@/hooks/useKakaoLoader';
import useGeoLocation from '@/hooks/useGeoLocation';

export default function SearchMapPage({ params }) {
  const { currentLocation, isLoading, errorMsg } = useGeoLocation();

  // const searchParams = useSearchParams();
  // const title = searchParams.get('title') || ''; // 주소
  // const addr = searchParams.get('addr') || ''; // 주소

  const [loading, error] = useKakaoLoader();

  // 현재 지도 위치 --> 홈 버튼 누르면 초기로 이동 하기 위하여 관리
  const [state, setState] = useState({
    center: { lat: null, lng: null }, // 지도의 초기 위치
    isPanto: false, // 지도 위치 변경시 panto를 이용할지에 대해서 정의
  });

  useEffect(() => {
    if (!isLoading) {
      setState({
        center: {
          lat: currentLocation?.latitude, // 위도
          lng: currentLocation?.longitude, // 경도
        }, // 지도의 초기 위치
        isPanto: false, // 지도 위치 변경시 panto를 이용할지에 대해서 정의
      });
    }
  }, [isLoading]);

  // 지도 드래그 이벤트
  function onDragEnd(map) {
    const latlng = map.getCenter();
    setState({
      center: { lat: latlng.getLat(), lng: latlng.getLng() },
      isPanto: false,
    });
  }

  // 주소 복사
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(addr);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
            onDragEnd={onDragEnd}
          >
            <MapMarker
              position={{
                lat: currentLocation?.latitude,
                lng: currentLocation?.longitude,
              }}
            />
            <ZoomControl position="RIGHT" />
            <div className="absolute bottom-0 z-50 w-full">
              <div className="flex justify-end p-4">
                <button
                  className=" bg-shadow-color rounded-full p-2.5"
                  onClick={() => {
                    setState({
                      center: {
                        lat: currentLocation?.latitude,
                        lng: currentLocation?.longitude,
                      },
                      isPanto: true,
                    });
                  }}
                >
                  <HomeIcon className="h-7 w-7 text-[#ffffff]" />
                </button>
              </div>
              <div className="bg-[#ffffff] flex flex-col gap-1 p-4 shadow-[0px_0px_0.4rem_0px_rgba(0,0,0,0.3)]">
                <span className="font-bold text-[#1A1A1A] text-base">
                  {'TODO 제목 title 로 사용 '}
                </span>
                <div className="text-xs flex justify-between">
                  <span className="text-[#6D6D6D]">
                    {'TODO 주소 addr 로 사용 '}
                  </span>
                  <button className="text-[#0152CC]" onClick={copyToClipboard}>
                    주소 복사
                  </button>
                </div>
              </div>
            </div>
          </Map>
        </div>
      )}
    </>
  );
}
