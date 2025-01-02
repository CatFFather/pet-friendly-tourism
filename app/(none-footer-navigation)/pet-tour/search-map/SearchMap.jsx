'use client';

import _ from 'lodash';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk';
// ICON
import { XMarkIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/outline';
// HOOK
import useKakaoLoader from '@/hooks/useKakaoLoader';
import useGeoLocation from '@/hooks/useGeoLocation';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';

export default function SearchMapPage({ params }) {
  const { currentLocation, isLoading, errorMsg } = useGeoLocation();
  const [loading, error] = useKakaoLoader();

  // 현재 지도 위치 --> 홈 버튼 누르면 초기로 이동 하기 위하여 관리
  const [state, setState] = useState({
    center: { lat: null, lng: null }, // 지도의 초기 위치
    isPanto: false, // 지도 위치 변경시 panto를 이용할지에 대해서 정의
  });
  const [locationBasedList, setLocationBasedList] = useState(null); // 위치기반 관광정보 리스트
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); // 선택된 위치기반 관광정보 데이터

  // 처음 내위치 저장
  useEffect(() => {
    if (!isLoading) {
      setState({
        center: {
          lat: currentLocation?.latitude, // 위도
          lng: currentLocation?.longitude, // 경도
        },
        isPanto: false, // 지도 위치 변경시 panto를 이용할지에 대해서 정의
      });
    }
  }, [isLoading]);

  // 주소 복사
  async function copyToClipboard(addr) {
    try {
      await navigator.clipboard.writeText(addr);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      console.error(error);
    }
  }

  // 지도 가운대 변경 시 이벤트
  function onCenterChanged(map) {
    const level = map?.getLevel();
    const center = map?.getCenter();
    const mapX = center.getLng(); // 경도
    const mapY = center.getLat(); // 위도
    setState({
      center: { lat: mapY, lng: mapX },
      isPanto: false,
    });
    // 3레벨에서 1px이 1m
    // 현재 지도 레벨을 기준으로 m당 px값 스케일(px/m)을 구한다.
    const scale = 1 / Math.pow(2, level - 3); // --> 3레벨 지도에 비교한 지도의 크기
    const currentMap = document.getElementById('search_map_page');
    // 390px기준에 지도 3레벨 기준으로 지도의 width와 scale을 나누면 390px이 되는데 이게 바로 가로 직선거리가 390m가 됨
    // 거기서 반지름을 구하려면 다시 2로 나눠주면 됨
    // 만약 레벨2가 되면 scale이 2가 되는데 이때 곱하게 되면 390px이 2배가 되어 가로길이가 780m가 되는데 지도가 2배가 되었는데
    // 가로길이가 780m가 되면 말이 안되기 때문에 나눠줘야함
    const radius = currentMap?.offsetWidth / scale / 2;
    if (!mapX || !mapY || !radius) return;
    const params = {
      mapX, // 경도
      mapY, // 위도
      radius, // 거리반경
      numOfRows: 100, // 페이징 처리 강제로 해줘야 해서 50개까지 노출
    };

    debouncedFetchData(params);
  }

  const debouncedFetchData = useCallback(
    _.debounce(getLocationBasedList, 1000),
    [],
  );

  // 위치기반 관광정보조회
  function getLocationBasedList(params) {
    KorPetTourService.getLocationBasedList(params)
      .then((res) =>
        setLocationBasedList(res?.data?.response?.body?.items?.item || []),
      )
      .catch((e) => console.log('e', e));
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
            id="search_map_page"
            center={state.center}
            isPanto={state.isPanto}
            style={{ width: '100%', height: '100%', position: 'relative' }}
            level={3}
            minLevel={9}
            maxLevel={1}
            onCenterChanged={onCenterChanged}
          >
            <MapMarker
              position={{
                lat: currentLocation?.latitude,
                lng: currentLocation?.longitude,
              }}
            />
            {locationBasedList?.length > 0 &&
              locationBasedList?.map((info, index) => (
                <MapMarker
                  key={info?.contentid}
                  position={{ lat: info?.mapy, lng: info?.mapx }} // 마커를 표시할 위치
                  image={{
                    src: '/images/MapMarker.png', // 마커이미지의 주소입니다
                    size: {
                      width: 40,
                      height: 49,
                    }, // 마커이미지의 크기입니다
                  }}
                  title={info?.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  onClick={() => {
                    setSelectedMarkerInfo(info);
                  }}
                />
              ))}
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
              {selectedMarkerInfo && (
                <div className="relative bg-[#ffffff] flex flex-col gap-1 p-4 shadow-[0px_0px_0.4rem_0px_rgba(0,0,0,0.3)]">
                  <button
                    onClick={() => setSelectedMarkerInfo(null)}
                    className="hover:text-gray-700 p-2 absolute -top-1 right-0"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <div className="flex gap-2">
                    <Link
                      className="basis-2/4 flex-grow flex-shrink relative after:content-[''] after:pb-[90%] after:block"
                      href={`/pet-tour/detail/${selectedMarkerInfo?.contenttypeid}/${selectedMarkerInfo?.contentid}`}
                    >
                      <Image
                        draggable={false}
                        fill
                        className="object-cover rounded-lg box-border border border-[#F3F6F6]"
                        src={
                          selectedMarkerInfo?.firstimage ||
                          selectedMarkerInfo?.firstimage2 ||
                          '/images/DefaultImage.webp'
                        }
                        sizes="100%" // sizes를 지정해달라고 해서 임시로 100%로 해놨는데 이거 무슨값을 넣어도 바뀌지않는데 왜그럴까?
                        alt={selectedMarkerInfo?.title}
                      />
                    </Link>

                    <div className="basis-2/4 flex flex-col">
                      <Link
                        className="mt-0.5"
                        href={`/pet-tour/detail/${selectedMarkerInfo?.contenttypeid}/${selectedMarkerInfo?.contentid}`}
                      >
                        <span className="font-bold text-[#1A1A1A] text-base">
                          {selectedMarkerInfo?.title}
                        </span>
                      </Link>
                      <div className="text-xs flex-1 flex flex-col justify-between">
                        <span className="text-[#6D6D6D]">
                          {selectedMarkerInfo?.addr1 ||
                            selectedMarkerInfo?.addr2}
                        </span>
                        <button
                          className="text-[#0152CC] self-end"
                          onClick={() =>
                            copyToClipboard(
                              selectedMarkerInfo?.addr1 ||
                                selectedMarkerInfo?.addr2,
                            )
                          }
                        >
                          주소 복사
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Map>
        </div>
      )}
    </>
  );
}
