'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
// ICON
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function ImgCarousel({ images }) {
  const totalImages = [
    images?.[images?.length - 1],
    ...(images || []),
    images?.[0],
  ];
  const imgWrapRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    movingImgWrap();
    // 양 끝의 index일 때 강제로 이미지의 첫번째, 마지막 index로 이동
    let timeoutId = null;
    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        imgWrapRef.current.style.setProperty('transition-duration', `0ms`);
        setCurrentIndex(totalImages?.length - 2);
      }, 500);
    } else if (currentIndex === totalImages?.length - 1) {
      timeoutId = setTimeout(() => {
        imgWrapRef.current.style.setProperty('transition-duration', `0ms`);
        setCurrentIndex(1);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  // 사진 이동
  function movingImgWrap() {
    const movingTodalWidth = `-${currentIndex * 100}%`;
    imgWrapRef.current.style.setProperty(
      'transform',
      `translateX(${movingTodalWidth})`,
    );
  }
  // 이전
  function goToPrevious() {
    if (currentIndex <= 0) return;
    imgWrapRef.current.style.setProperty('transition-duration', `500ms`);
    setCurrentIndex(currentIndex - 1);
  }
  // 다음
  function goToNext() {
    if (currentIndex >= totalImages?.length - 1) return;
    imgWrapRef.current.style.setProperty('transition-duration', `500ms`);
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div className="relative">
      <div className="overflow-x-hidden rounded-lg">
        <div
          ref={imgWrapRef}
          className="flex transition-transform translate-x-[-100%]"
        >
          {totalImages?.map((image) => {
            return (
              <div className="relative after:content-[''] after:pb-[90%] after:block w-full flex-shrink-0">
                <Image
                  fill
                  className="object-cover  box-border border border-[#F3F6F6]"
                  src={image?.url || '/images/DefaultImage.webp'}
                  alt={image?.imgName || '사진 없음'}
                  sizes="100%"
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute bottom-[calc(50%-20px)] bg-shadow-color rounded-full left-2"
        onClick={goToPrevious}
      >
        <ChevronLeftIcon className="h-10 w-10 text-[#ffffff]" />
      </button>
      <button
        className="absolute bottom-[calc(50%-20px)] right-2 bg-shadow-color rounded-full"
        onClick={goToNext}
      >
        <ChevronRightIcon className="h-10 w-10 text-[#ffffff]" />
      </button>
      <div className="absolute bottom-2 right-2 bg-shadow-color rounded-full">
        <span className="text-xs text-[#ffffff] px-2">
          {currentIndex == 0
            ? 1
            : currentIndex == totalImages?.length - 1
            ? totalImages?.length - 2
            : currentIndex}{' '}
          / {images?.length}
        </span>
      </div>
    </div>
  );
}
