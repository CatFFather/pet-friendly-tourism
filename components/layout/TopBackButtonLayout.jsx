import BackButton from '@/components/button/BackButton';
export default function TopBackButtonLayout({ children, tilte }) {
  return (
    <div className="relative flex flex-col h-full">
      <div className="sticky top-0 bg-[#FFFFFF] z-50 px-4 h-11 flex items-center">
        <BackButton />
        <span className="font-semibold text-[#000000] text-lg mt-0.5 flex-1 truncate">
          {tilte}
        </span>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
