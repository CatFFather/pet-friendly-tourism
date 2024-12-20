import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';
const useKakaoLoader = () => {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    libraries: ['clusterer', 'drawing', 'services'], // 사용하고싶은 다른 라이브러리 추가
  });

  return [loading, error];
};

export default useKakaoLoader;
