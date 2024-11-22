import { create } from 'zustand';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';

// const globalStateInitialData = {
//   petTourCategoryCodes: null, // 펫 투어 카테고리 리스트
// };
// // 거의 변경될 일 없는 기준정보 관리(반복되는 api 호출 방지)
// const globalStore = create((set, get) => ({
//   ...globalStateInitialData,

//   setGlobalState: (key, value) => set({ [key]: value }),

//   // 유형 조회
//   getPetTourCategoryCodeList: async () => {
//     if (get().petTourCategoryCodes != null) return;
//     await KorPetTourService.getCategoryCodeList({
//       numOfRows: 20,
//     })
//       .then((res) =>
//         set({ petTourCategoryCodes: res?.data?.response?.body?.items?.item })
//       )
//       .catch((e) => console.log("e", e));
//   },

//   // 로그아웃 처리시 스토어 리셋
//   resetGlobalStore: () => set({ ...globalStateInitialData }),
// }));
// export default globalStore;

import { createStore } from 'zustand/vanilla';

export const initGlobalStore = () => {
  return {
    petTourCategoryCodes: null, // 펫 투어 카테고리 리스트
  };
};

export const defaultInitState = {
  count: 0,
};

export const createGlobalStore = (initState) => {
  return createStore()((set, get) => ({
    ...initState,

    setGlobalState: (key, value) => set({ [key]: value }),

    // 유형 조회
    getPetTourCategoryCodeList: async () => {
      if (get().petTourCategoryCodes != null) return;
      await KorPetTourService.getCategoryCodeList({
        numOfRows: 20,
      })
        .then((res) =>
          set({ petTourCategoryCodes: res?.data?.response?.body?.items?.item }),
        )
        .catch((e) => console.log('e', e));
    },

    // 로그아웃 처리시 스토어 리셋
    resetGlobalStore: () => set({ ...globalStateInitialData }),
  }));
};
