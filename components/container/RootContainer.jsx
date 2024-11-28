export default function RootContainer({ children }) {
  return (
    <div className="flex justify-center">
      {/* 좌측화면 1024px까지만 노출 */}
      <div className="flex flex-col  sticky top-0 h-screen items-center justify-center">
        <div>개모임</div>
        <div>검색 input</div>
      </div>
      {/* 우측화면 실제 모바일 화면 */}
      <div className="min-h-screen w-[430px] relative border-x border-[#E1E1E1] border-solid box-content">
        {children}
      </div>
    </div>
  );
}
