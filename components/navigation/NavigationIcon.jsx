'use client';
import { usePathname } from 'next/navigation';
// ICON
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

/**
 * 네비 아이콘
 * 컴포넌트로 따로 빼지 않아도 되는데 use client 선언되는 부분을 최소화 하기 위해 컴포넌트로 빼서 사용(FooterNavigation에서 그냥 usePathname 사용 해도 됨)
 * @param {*} nav
 * @returns
 */
export default function NavigationIcon({ nav }) {
  const pathname = usePathname();
  const iconClassName = `h-6 w-6`;
  const textClassName =
    nav.href == pathname ? 'text-[#4ED1AD]' : 'text-[#B6BDBE]';

  return (
    <>
      {nav.href == '/home' && (
        <HomeIcon className={`${iconClassName} ${textClassName}`} />
      )}
      {nav.href == '/search' && (
        <MagnifyingGlassIcon className={`${iconClassName} ${textClassName}`} />
      )}
      {nav.href == '/login' && (
        <UserIcon className={`${iconClassName} ${textClassName}`} />
      )}
      <span className={textClassName}>{nav.label}</span>
    </>
  );
}
