'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// STORE
export default function PetTourCategoryList({ categoryCodeList }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat1 = searchParams.get('cat1') || ''; // 예외처리 하여 기본값 '' 로 변경(전체일 때)

  const isDragging = useRef(false); // 드래그 중 여부
  const startXPosition = useRef(0); // 드래그 시작 x축 시작 위치
  const startScrollPosition = useRef(0); // 드래그 시작 스크롤 시작 위치

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

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // 마우스 클릭 했을 때
  function onMouseDown(e) {
    isDragging.current = true;
    startXPosition.current = e.pageX;
    startScrollPosition.current = categoryListRef?.scrollLeft;
    // categoryListRef에 onMouseMove, onMouseUp를 직접 선언하면 마우스 이벤트가 categoryListRef의 영역 밖으로 이동했을 때 onMouseUp 이벤트가 발생하지 않게됨
    // --> 전역 이벤트 리스너 추가하여 이벤트 추적
    // 전역 이벤트 리스너 추가
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // 마우스 움직임 감지
  function onMouseMove(e) {
    if (!isDragging.current) return;
    const currentPosition = e?.pageX;
    const difference = startXPosition.current - currentPosition;
    const newScrollPosition = startScrollPosition.current + difference;
    categoryListRef?.scrollTo({
      top: 0,
      left: newScrollPosition,
      behavior: 'smooth',
    });
  }
  // 마우스 클릭을 끝냈을 때
  function onMouseUp(e) {
    isDragging.current = false;
    // 전역 이벤트 리스너 제거
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  return (
    <ul
      onClick={(e) => console.log('e', e)}
      ref={setCategoryListRef}
      onMouseDown={onMouseDown}
      className="px-1.5 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden border-b flex items-center gap relative"
    >
      {categoryCodeList?.map((code) => {
        return (
          <Link
            onClick={(e) => console.log('Link e', e)}
            draggable={false}
            key={code?.code}
            href={{ pathname, query: code?.code && { cat1: code?.code } }}
            replace
          >
            <li id={code?.code} className="category__code px-2.5 pt-3.5 pb-2.5">
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
    </ul>
  );
}
