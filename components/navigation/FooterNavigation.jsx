import Link from "next/link";
// COMPONENT
import NavigationIcon from "@/components/navigation/NavigationIcon";

const navItems = [
  { href: "/home", label: "홈" },
  { href: "/search", label: "검색" },
  { href: "/login", label: "회원" },
];

// 하단 버튼
export default function FooterNavigation({}) {
  return (
    <ul className="flex justify-between bg-[#FFFFFF] h-14 items-center px-4 fixed bottom-0 w-[inherit] border-t">
      {navItems.map((nav) => {
        return (
          <li key={nav.href}>
            <Link
              href={nav.href}
              className="flex flex-col items-center text-xs"
            >
              <NavigationIcon nav={nav} href={nav.href} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
