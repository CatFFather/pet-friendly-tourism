'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// STORE
export default function PetTourCategoryList({ categoryCodeList }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat1 = searchParams.get('cat1');
  const categoryListRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const menus = categoryListRef?.current?.querySelectorAll('.category__code');
    const findIndexMenus = [...menus]?.findIndex((menu) => menu?.id == cat1);
    const movingTodalWidth = [...menus]?.reduce((acc, data, index) => {
      if (index >= findIndexMenus) return acc;
      return acc + data?.offsetWidth;
    }, 0);
    const currentMenuWidth = menus?.[findIndexMenus]?.offsetWidth;
    markerRef.current.style.setProperty('width', `${currentMenuWidth}px`);
    markerRef.current.style.setProperty(
      'transform',
      `translateX(${movingTodalWidth}px)`,
    );
    categoryListRef?.current?.scrollTo({
      top: 0,
      left: movingTodalWidth,
      behavior: 'smooth',
    });
  }, [cat1]);

  return (
    <ul
      ref={categoryListRef}
      className="px-1.5 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden border-b"
    >
      <div className="flex items-center gap relative">
        {categoryCodeList?.map((code) => {
          return (
            <Link
              key={code?.code}
              href={{ pathname: pathname, query: { cat1: code?.code } }}
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
          ref={markerRef}
          className="absolute bottom-0 h-1 bg-[#FF4081] transition-transform duration-300"
        />
      </div>
    </ul>
  );
}
