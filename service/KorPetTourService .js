import {
  korPetTourServiceInstance as axios,
  localInstance,
} from '@/service/axios';
import qs from 'qs';
// UTIL
import httpClient from '@/utils/httpClient';

const defaultParams = {
  serviceKey: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_KEY,
  MobileApp: 'test-app', // TODO 나중에 변경
  MobileOS: 'WIN', // TODO 모바일, 웹 구분 필요
  _type: 'json',
};

export const request = httpClient({
  baseUrl: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  // credentials: "include",
  // cache: "no-store",
  interceptors: {
    request(_, init) {
      // TODO request interceptors
      // init.headers = initializeHeaders(init.headers);
      return init;
    },
    async response(response) {
      // TODO response interceptors
      // if (response.status === 401) {
      //   redirect('/login');
      // }
      try {
        return await response.json();
      } catch {
        console.error('Failed to parse response body as JSON.');
        return null;
      }
    },
  },
});

export default {
  /**
   * 서비스분류코드조회
   * 반려동물 동반여행지의 각 관광타입(관광지, 숙박 등)에 해당하는 서비스 분류코드를 대,중,소분류로 조회하는 기능입니다.
   * @param {*} params
   * @returns
   */
  getCategoryCodeList: (params) => {
    const requestOptions = {
      method: 'GET',
      url: `/categoryCode?${qs.stringify(params)}`,
    };
    return axios(requestOptions);
  },

  /**
   * 지역기반 관광정보조회
   * 반려동물 동반여행지의 지역 및 시군구를 기반으로 관광정보 목록을 조회하는 기능입니다. 파라미터에 따라 제목순, 수정일순(최신순), 등록일순 정렬검색을 제공합니다.
   * @param {*} params
   * @returns
   */
  getAreaBasedList: (params) => {
    const requestOptions = {
      method: 'GET',
      url: `/areaBasedList?${qs.stringify(params)}`,
    };
    return axios(requestOptions);
  },
  /**
   * 반려동물 동반여행 조회
   * 반려동물 동반여행 정보 목록을 제공합니다.
   * @param {*} params
   * @returns
   */
  getDetailPetTour: (params) => {
    return request(
      `/detailPetTour?${qs.stringify({ ...defaultParams, ...params })}`,
      { method: 'GET' },
    );
  },

  /**
   * 반복정보조회
   * 반려동물 동반여행지의 관광타입별 반복정보를 조회하는 기능입니다. “숙박”은 객실정보를 제공합니다. “숙박”를 제외한 나머지 타입은 다양한 정보를 반복적인 형태로 제공합니다.
   * @param {*} params
   * @returns
   */
  getDetailInfo: (params) => {
    return request(
      `/detailInfo?${qs.stringify({ ...defaultParams, ...params })}`,
      { method: 'GET' },
    );
  },

  /**
   * 공통정보조회
   * 반려동물 동반여행지의 타입별 공통정보(제목, 연락처, 주소, 좌표, 개요정보 등)를 조회하는 기능입니다.
   * @param {*} params
   * @returns
   */
  getDetailCommon: (params) => {
    return request(
      `/detailCommon?${qs.stringify({ ...defaultParams, ...params })}`,
      { method: 'GET' },
    );
  },

  /**
   * 소개정보조회
   * 반려동물 동반여행지의 관광타입별 소개정보(휴무일, 개장시간, 주차시설 등)를 조회하는 기능입니다. 각 타입마다 응답 항목이 다르게 제공됩니다.
   * @param {*} params
   * @returns
   */
  getDetailIntro: (params) => {
    return request(
      `/detailIntro?${qs.stringify({ ...defaultParams, ...params })}`,
      { method: 'GET' },
    );
  },

  // 로컬 테스트 api 추가
  getDetailData: (params) => {
    const requestOptions = {
      method: 'GET',
      url: `/api/home/?${qs.stringify(params)}`,
    };
    return localInstance(requestOptions);
  },
};
