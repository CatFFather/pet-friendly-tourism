import axios from 'axios';
// axios instance 정의
const localInstance = axios.create({
  // baseURL: '',
  headers: {
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
  params: {
    serviceKey: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_KEY,
    MobileApp: 'test-app', // TODO 나중에 변경
    MobileOS: 'WIN', // TODO 모바일, 웹 구분 필요
    _type: 'json',
  },
});

const korPetTourServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    serviceKey: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_KEY,
    MobileApp: 'test-app', // TODO 나중에 변경
    MobileOS: 'WIN', // TODO 모바일, 웹 구분 필요
    _type: 'json',
  },
});

// const authInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_URL,
//   headers: { "Content-Type": "application/json" },
//   params: { key: process.env.NEXT_PUBLIC_KOR_PET_TOUR_SERVICE_API_KEY },
//   // timeout: 1000 * 15,
// });

// const noAuthInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   headers: { "Content-type": "application/json" },
//   timeout: 5000,
//   useToast: true,
// });
// const debug = false;

// authInstance.interceptors.request.use(
//   function (config) {
//     const userInfo = JSON.parse(localStorage.userInfo);
//     let token = userInfo?.state?.accessToken;
//     if (token) {
//       config.headers["access_token"] = token;
//     } else return;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// noAuthInstance.interceptors.request.use(
//   function (config) {
//     const appInfo = JSON.parse(localStorage.mozzleAppInfo);
//     let token = appInfo?.state?.deviceToken;
//     if (token) {
//       config.headers["access_token"] = token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export { localInstance, korPetTourServiceInstance };
