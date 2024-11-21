'use client';
// STORE
import globalStore from '@/stores/globalStore';
import { useEffect } from 'react';
export default function PetTourCategoryList() {
  const { petTourCategoryCodes } = globalStore();

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
