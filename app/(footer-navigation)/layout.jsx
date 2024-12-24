// COMPONENT
import FooterNavigation from '@/components/navigation/FooterNavigation';

const FOOTERHEIGHT = 'pb-[57px] mb-[-57px]';

// 공통으로 footer만 정의
export default function FooterNavigationLayout({ children }) {
  return (
    <>
      <div className={`min-h-[inherit] ${FOOTERHEIGHT}`}>{children}</div>
      <FooterNavigation />
    </>
  );
}
