'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// STYLE
import { mobileWidth, mobileBreakpoint } from '@/styles/commonStyles';
// ICON
import { XMarkIcon } from '@heroicons/react/24/outline';

const mobileWidthClass = `max-w-[${mobileWidth}px] max-${mobileBreakpoint}:max-w-full`;

export default function Modal({
  children,
  title, // 제목
  innerWrapStyle = '', // 내부 스타일
  full, // 전체 화면
  bottomSlide, // 하단에서 올라오는 에니메이션 적용
}) {
  const innerWrapClass = `bg-white relative w-[90%] h-[initial] ${
    full ? '!w-full !h-full' : 'rounded-lg w-[90%] h-[initial]'
  }`;
  const modalAnimationClass = `${
    bottomSlide ? 'translate-y-[100%]' : 'opacity-0'
  } `;
  const router = useRouter();
  const modalRef = useRef(null);
  const innerWrapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      bottomSlide
        ? modalRef?.current?.style?.setProperty('transform', 'translateY(0)')
        : modalRef?.current?.style?.setProperty('opacity', 1);
    }, 100);
    // 모달 활성화 시 스크롤 비활성화

    const body = document.querySelector('body');
    body?.style?.setProperty('overflow', `hidden`);

    return () => {
      body.style.setProperty('overflow', `visible`);
    };
  }, []);

  useEffect(() => {
    // 모달 외부 클릭 시 닫힘
    const handleClick = (e) => {
      if (innerWrapRef?.current && !innerWrapRef?.current?.contains(e.target)) {
        handleClose(e);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [innerWrapRef]);

  // 뒤로 가기
  function handleClose(e) {
    bottomSlide
      ? modalRef?.current?.style?.setProperty('transform', 'translateY(100%)')
      : modalRef?.current?.style?.setProperty('opacity', 0);
    setTimeout(() => {
      router.back();
    }, 300);
  }

  return (
    <div
      ref={modalRef}
      className={`fixed inset-y-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full max-w-[500px] max-md:max-w-full transition-all duration-300 ${modalAnimationClass}`}
    >
      <div ref={innerWrapRef} className={`${innerWrapClass} ${innerWrapStyle}`}>
        <button
          onClick={handleClose}
          className="hover:text-gray-700 p-3 absolute top-0 right-0"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex flex-col h-full ">
          <h2 className="text-xl font-bold p-4">{title}</h2>
          <div className="flex-grow pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
