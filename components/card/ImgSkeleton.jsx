// ICON
import { PhotoIcon } from '@heroicons/react/24/outline';

// 로딩 이미지 노출
export default function ImgSkeleton({ description }) {
  return (
    <div className="animate-pulse flex flex-col gap-2 basis-[calc(50%-calc(0.5rem/2))]">
      <div className="relative after:content-[''] after:pb-[90%] after:block">
        <PhotoIcon className="object-cover rounded-lg box-border absolute w-full h-full flex justify-center items-center left-0 top-0" />
      </div>
      {description && (
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
        </div>
      )}
    </div>
  );
}
