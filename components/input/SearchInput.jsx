'use client';
import { useEffect, useRef } from 'react';
// ICON
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function SearchInput({
  name, // Form 에서 사용 할 떄 submit 하면 query string의 key로 바뀜
  placeholder = '검색어를 입력해주세요.',
  defaultValue = null,
}) {
  const inputRef = useRef();
  const resetButtonRef = useRef();

  useEffect(() => {
    if (inputRef?.current?.value)
      resetButtonRef?.current?.style?.setProperty('display', 'initial');
    else resetButtonRef?.current?.style?.setProperty('display', 'none');
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
      </div>
      <input
        ref={inputRef}
        className="search-cancel:hidden block w-full py-3 pl-10 pr-7 text-sm rounded-full border border-[#2D3035] focus-visible:border-[#4ED1AD] focus-within:outline-0"
        name={name}
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (e.target.value)
            resetButtonRef?.current?.style?.setProperty('display', 'initial');
          else resetButtonRef?.current?.style?.setProperty('display', 'none');
        }}
      />
      <button
        ref={resetButtonRef}
        onClick={() => {
          inputRef.current.value = '';
          resetButtonRef?.current?.style?.setProperty('display', 'none');
        }}
        type="button"
        className="hidden text-white absolute end-3.5 inset-y-0"
      >
        <XCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-400 " />
      </button>
    </div>
  );
}
