'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

// STORE
import { createGlobalStore } from '@/stores/globalStore';

export const GlobalStoreContext = createContext(undefined);

export const GlobalStoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
    // console.log('storeRef.current', storeRef.current);
    // storeRef.current.getState().getPetTourCategoryCodeList();
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = (selector) => {
  const globalStore = useContext(GlobalStoreContext);

  if (!globalStore) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
  }

  return useStore(globalStore, selector);
};
