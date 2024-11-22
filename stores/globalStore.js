import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';

const globalStateInitialData = {
  petTourCategoryCodes: null, // 펫 투어 카테고리 리스트
};

// 거의 변경될 일 없는 기준정보 관리(반복되는 api 호출 방지)
export const createGlobalStore = () => {
  return createStore()((set, get) => ({
    ...globalStateInitialData,
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
