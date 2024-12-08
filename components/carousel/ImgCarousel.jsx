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
  ]; // 0번 index에는 마지막 아이템이 하나 더 들어있고 마지막 index에는 첫 번째 아이템이 하나 더 넣어줌 --> 무한캐러셀 구현을 위함
  const imgWrapRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const isDragging = useRef(false);
  const startPosition = useRef(0);
  const [endPosition, setEndPosition] = useState(0);

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
  // 이전 사진으로 이동
  function goToPrevious() {
    if (currentIndex <= 0) return;
    imgWrapRef?.current?.style?.setProperty('transition-duration', `500ms`);
    setCurrentIndex(currentIndex - 1);
  }
  // 다음 사진으로 이동
  function goToNext() {
    if (currentIndex >= totalImages?.length - 1) return;
    imgWrapRef?.current?.style?.setProperty('transition-duration', `500ms`);
    setCurrentIndex(currentIndex + 1);
  }
  function onTouchStart(e) {
    console.log('onTouchStart!!!!!!!!!!', e);
  }
  function onTouchEnd(e) {
    console.log('onTouchEnd@@@@@@@@@@@@@@@@@', e);
  }
  // 마우스 클릭 했을 때
  function onMouseDown(e) {
    e.preventDefault();
    console.log('onMouseDown################', e);
    isDragging.current = true;
    startPosition.current = e.pageX;
  }
  // 마우스 움직임 감지
  function onMouseMove(e) {
    if (!isDragging.current) return;
    console.log('onMouseMove@@@@@@@@@@@@@', e);
    console.log('imgWrapRef', imgWrapRef);
    console.log('startPosition.current', startPosition.current);
    const currentPosition = e?.pageX;
    console.log('currentPosition', currentPosition);
    const difference = startPosition.current - currentPosition;
    const absolute = Math.abs(difference);
    console.log('difference', difference);
    console.log('absolute', absolute);
    const operator = difference > 0 ? '-' : '+'; // 차이가 0보다 크면 다음 작으면 이전 --> operator는 -일 때 다음 사진임
    const movingWidth = `calc(-${
      currentIndex * 100
    }% ${operator} ${absolute}px)`;
    console.log('movingWidth', movingWidth);
    imgWrapRef.current?.style?.setProperty('transition-duration', `0ms`); // duration을 0초로 초기화 후 이동
    imgWrapRef.current?.style?.setProperty(
      'transform',
      `translateX(${movingWidth})`,
    );
  }
  // 마우스 클릭을 끝냈을 때
  function onMouseUp(e) {
    console.log('onMouseUp!!!!!!!!!!', e);
    isDragging.current = false;
    const currentPosition = e.pageX;
    const difference = startPosition.current - currentPosition;
    const absolute = Math.abs(difference);
    const type = difference > 0 ? 'next' : 'prev'; // 차이가 0보다 크면 다음 작으면 이전
    // 100만큼 이동하지 못하면 원래 위치로 이동
    if (absolute < 100) {
      imgWrapRef.current.style.setProperty('transition-duration', `500ms`);
      return movingImgWrap();
    }
    if (type == 'prev') return goToPrevious(); // 이전 사진으로 이동
    if (type == 'next') return goToNext(); // 다음 사진으로 이동
  }

  return (
    <div className="relative">
      <div className="overflow-x-hidden rounded-lg">
        <div
          ref={imgWrapRef}
          // onTouchStart
          // onTouchEnd
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          className="flex transition-transform translate-x-[-100%]"
        >
          {totalImages?.map((image, index) => {
            return (
              <div
                key={index}
                className="relative after:content-[''] after:pb-[90%] after:block w-full flex-shrink-0"
              >
                <Image
                  draggable={false}
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
        disabled={images?.length == 1}
      >
        <ChevronLeftIcon className="h-10 w-10 text-[#ffffff]" />
      </button>
      <button
        className="absolute bottom-[calc(50%-20px)] right-2 bg-shadow-color rounded-full"
        onClick={goToNext}
        disabled={images?.length == 1}
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
