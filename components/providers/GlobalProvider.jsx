'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

// STORE
import { createGlobalStore, initGlobalStore } from '@/stores/globalStore';

export const GlobalStoreContext = createContext(undefined);

export const GlobalStoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore(initGlobalStore());
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = (selector) => {
  const counterStoreContext = useContext(GlobalStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
