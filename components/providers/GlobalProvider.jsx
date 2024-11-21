"use client";
// STORE
import globalStore from "@/stores/globalStore";
import { useEffect } from "react";

// 글로벌로 관리하는 데이터 제공
export default function GlobalProvider({ children }) {
  const { getPetTourCategoryCodeList } = globalStore();
  useEffect(() => {
    getPetTourCategoryCodeList();
  }, []);

  return <>{children}</>;
}
