'use client';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// STORE
export default function PetTourCategoryList({ categoryCodeList }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat1 = searchParams.get('cat1');
  const categoryListRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    console.log('categoryCodeList', categoryCodeList);
    console.log('cat1', cat1);
    console.log('markerRef', markerRef);
    console.log('categoryListRef', categoryListRef);
    const menus = categoryListRef?.current?.querySelectorAll('.category__code');
    console.log('menus', menus);
    const findIndexMenus = [...menus]?.findIndex((menu) => menu?.id == cat1);
    console.log('findIndexMenus', findIndexMenus);
    const todalWidth = [...menus]?.reduce((acc, data, index) => {
      console.log('data.offsetWidth', data.offsetWidth);
      if (index >= findIndexMenus) return acc;
      return acc + data.offsetWidth;
    }, 0);
    console.log('todalWidth', todalWidth);
    // markerRef.current.style.translateX = todalWidth;
    const menuWidth = menus?.[findIndexMenus].offsetWidth;
    console.log('menuWidth', menuWidth);
    markerRef.current.style.setProperty('width', `${menuWidth}px`);
    markerRef.current.style.setProperty(
      'transform',
      `translateX(${todalWidth}px)`,
    );
    categoryListRef?.current?.scrollTo({
      top: 0,
      left: todalWidth,
      behavior: 'smooth',
    });

    // translateX(${
    //   categoryCodeList.findIndex((code) => code.code === cat1) * 100
    // }%)
  }, [cat1]);

  // const marker=document.querySelector(".marker");

  // //nav의 marker의 길이와 위치를 설정하는 함수
  // //A function to set the length and position of the nav marker.
  // function setMarker(e) {
  //     marker.style.left = e.offsetLeft+"px";
  //     marker.style.width = e.offsetWidth+"px";
  // }

  // const sections = document.querySelectorAll("section");
  // const menus = document.querySelectorAll(".nav__menu > li > a")

  // //스크롤 위치에 따라 해당하는 menu의 색깔과 마커가 달라짐
  // //The color and marker of the corresponding menu change according to the scroll position

  // window.addEventListener("scroll",()=>{
  //     //현재 영역의 id값
  //     //id of the current section
  //     let current=""

  //     sections.forEach(section=>{
  //         //각 section의 top 위치(절대적 위치)
  //         // The top of each section (absolute)
  //         const sectionTop = window.scrollY + section.getBoundingClientRect().top;

  //         //누적된 스크롤이 section의 top위치에 도달했거나 section의 안에 위치할 경우
  //         //When the accumulated scroll reaches the top of the section or is located inside the section
  //         if(window.scrollY >= sectionTop) {
  //             current = section.getAttribute("id");
  //         }

  //         menus.forEach(menu=>{
  //             menu.classList.remove("nav__menu--foused");
  //             const href = menu.getAttribute("href").substring(1);
  //             if(href===current) {
  //                 //현재 있는 영역의 id와 메뉴의 링크주소가 일치할때
  //                 //When the Id of the current section matches the href of the menu
  //                 menu.classList.add("nav__menu--foused");
  //                 setMarker(menu);
  //             }
  //         })
  //     })
  // })

  return (
    <ul
      ref={categoryListRef}
      className="px-1.5 overflow-x-auto whitespace-nowrap flex items-center gap"
    >
      {categoryCodeList?.map((code) => {
        return (
          <li
            id={code?.code}
            key={code?.code}
            className={`category__code px-2.5 pt-3.5 pb-2.5 `}
          >
            <Link className="" href={`${pathname}?cat1=${code?.code}`}>
              <span
                className={`text-[#2D3035] ${
                  cat1 == code?.code ? 'font-bold' : 'font-normal'
                } ${cat1 == code?.code ? 'border-b-2 border-[#FF4081]' : ''}`}
              >
                {code?.name}
              </span>
            </Link>
          </li>
        );
      })}
      <div
        ref={markerRef}
        className="absolute bottom-0 h-1 bg-blue-500 transition-transform duration-300"
      />
    </ul>
  );
}
