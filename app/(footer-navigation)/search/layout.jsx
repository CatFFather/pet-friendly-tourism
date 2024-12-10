import Form from 'next/form';
// ICON
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchLayout({ children }) {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF] z-50">
        <Form action="">
          {/* <div className="relative">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              name="keyword"
              type="search"
              autoComplete="off"
              placeholder="검색어를 입력해주세요."
            />
            <button
              className="absolute left-1 top-1 rounded p-1.5 text-center transition-all shadow-sm hover:shadow  focus:shadow-none  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-[#2D3035]" />
            </button>
          </div> */}

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 " />
            </div>
            <input
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="keyword"
              type="search"
              autoComplete="off"
              placeholder="검색어를 입력해주세요."
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              검색
            </button>
          </div>
        </Form>
      </div>
      {children}
    </div>
  );
}
