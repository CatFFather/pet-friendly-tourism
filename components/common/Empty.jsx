import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function Empty({ contents }) {
  return (
    <div className="w-full flex justify-center flex-col items-center gap-1 ">
      <ExclamationCircleIcon className="w-20 h-20 text-gray-500 dark:text-gray-400 " />
      <span className="text-[#9CA1AA] text-lg">{contents}</span>
    </div>
  );
}
