'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// STORE
export default function PetTourCategoryList({ categoryCodeList }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat1 = searchParams.get('cat1') || ''; // 예외처리 하여 기본값 '' 로 변경(전체일 때)

  // ref를 state로 전환
  // --> Suspense가 추가 되면서 처음 실행 시 categoryListRef,markerRef가 랜더링 전에 useEffect 가 실행 되어 초기 스타일을 지정(setProperty) 해주지 못함
  const [categoryListRef, setCategoryListRef] = useState(null);
  const [markerRef, setMarkerRef] = useState(null);

  useEffect(() => {
    if (!categoryListRef || !markerRef) return;
    const menus = categoryListRef?.querySelectorAll('.category__code') || [];
    const findIndexMenus = [...menus]?.findIndex((menu) => menu?.id == cat1);
    const movingTodalWidth = [...menus]?.reduce((acc, data, index) => {
      if (index >= findIndexMenus) return acc;
      return acc + data?.offsetWidth;
    }, 0);
    const currentMenuWidth = menus?.[findIndexMenus]?.offsetWidth;
    markerRef?.style?.setProperty('width', `${currentMenuWidth}px`);
    markerRef?.style?.setProperty(
      'transform',
      `translateX(${movingTodalWidth}px)`,
    );
    categoryListRef?.scrollTo({
      top: 0,
      left: movingTodalWidth,
      behavior: 'smooth',
    });
  }, [cat1, categoryListRef, markerRef]);

  return (
    <ul
      ref={setCategoryListRef}
      className="px-1.5 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden border-b"
    >
      <div className="flex items-center gap relative">
        {categoryCodeList?.map((code) => {
          return (
            <Link
              key={code?.code}
              href={{ pathname, query: code?.code && { cat1: code?.code } }}
              replace
            >
              <li
                id={code?.code}
                className="category__code px-2.5 pt-3.5 pb-2.5"
              >
                <span
                  className={`text-sm text-[#2D3035] ${
                    cat1 == code?.code ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {code?.name}
                </span>
              </li>
            </Link>
          );
        })}
        <div
          ref={setMarkerRef}
          className="absolute bottom-0 h-1 bg-[#FF4081] transition-transform duration-300"
        />
      </div>
    </ul>
  );
}
