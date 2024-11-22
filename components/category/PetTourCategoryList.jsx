'use client';
// STORE
// import globalStore from '@/stores/globalStore';
import { useGlobalStore } from '@/components/providers/GlobalProvider';
import { useEffect } from 'react';
export default function PetTourCategoryList() {
  const { petTourCategoryCodes } = useGlobalStore((state) => state);
  console.log('petTourCategoryCodes', petTourCategoryCodes);
  return (
    <ul className="px-3 overflow-x-auto whitespace-nowrap flex">
      {petTourCategoryCodes?.map((code) => {
        return (
          <li className="px-1" key={code?.code}>
            {code?.name}
          </li>
        );
      })}
    </ul>
  );
}
