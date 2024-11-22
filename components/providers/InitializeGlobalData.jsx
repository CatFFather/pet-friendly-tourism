// STORE
import globalStore from '@/stores/globalStore';

// 글로벌로 관리하는 데이터 제공
export default async function InitializeGlobalData({ children }) {
  // 초기 데이터 zustand에 직접 저장
  globalStore.getState().getPetTourCategoryCodeList();

  return <>{children}</>;
}
