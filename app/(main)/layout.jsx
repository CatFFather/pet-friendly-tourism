// COMPONENT
import FooterNavigation from "@/components/navigation/FooterNavigation";

// 메인 레이아웃 공통으로 footer만 정의
export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-[430px] relative border-x border-[#E1E1E1] border-solid box-content">
      <main className="pb-14">{children}</main>
      <FooterNavigation />
    </div>
  );
}
