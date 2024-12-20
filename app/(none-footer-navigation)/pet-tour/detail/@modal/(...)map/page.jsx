'use client';

import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import Modal from '@/components/common/Modal';
import useKakaoLoader from '@/hooks/useKakaoLoader';

export default function DetailMappage({}) {
  const [loading, error] = useKakaoLoader();

  useEffect(() => {
    console.log('KEY :', process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    console.log('loading', loading);
    console.log('error', error);
  }, [loading, error]);

  return (
    <Modal title="지도" full bottomSlide>
      <div className="w-full h-full">
        {loading ? (
          '로딩중 '
        ) : error ? (
          '에러발생: Kakao Maps 로드 실패'
        ) : (
          <Map
            center={{
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            level={3}
          />
        )}
      </div>
    </Modal>
  );
}
