export default function HomeLayout({ children }) {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-[#FFFFFF]">home 레이아웃</div>
      {children}
    </div>
  );
}
