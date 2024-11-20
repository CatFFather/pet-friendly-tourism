import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// CLASS
const iconClassName = "h-6 w-6 text-[#4ED1AD]";
const linkClassName = "flex flex-col items-center text-xs";
// TODO 나중에 Link list를 만들어서 정의 할 수있으면 하면 좋을듯 일단 로그인 페이지로 연결해놨음
// 하단 버튼
export default function FooterNavigation({}) {
  return (
    <ul className="flex justify-between bg-[#FFFFFF] h-14 items-center px-4 fixed bottom-0 w-[inherit] border-t">
      <li>
        <Link href="/home" className={linkClassName}>
          <HomeIcon className={iconClassName} />
          <span>홈</span>
        </Link>
      </li>
      <li>
        <Link href="/search" className={linkClassName}>
          <MagnifyingGlassIcon className={iconClassName} />
          <span>검색</span>
        </Link>
      </li>
      <li>
        <Link href="/login" className={linkClassName}>
          <UserIcon className={iconClassName} />
          <span>회원</span>
        </Link>
      </li>
    </ul>
  );
}
