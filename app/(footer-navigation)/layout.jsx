// COMPONENT
import FooterNavigation from '@/components/navigation/FooterNavigation';

// 공통으로 footer만 정의
export default function FooterNavigationLayout({ children }) {
  return (
    <>
      <main className="pb-14">{children}</main>
      <FooterNavigation />
    </>
  );
}
