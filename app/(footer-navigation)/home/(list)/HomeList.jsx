'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// COMPONENT
import ImgSkeleton from '@/components/card/ImgSkeleton';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
import useObserver from '@/hooks/useObserver';

// 홈 리스트
export default function HomeList({ initialData, query }) {
  const listLoadingRef = useObserver({
    callback: setNextPage,
    dependency: { initialData, query },
  });
  const [areaBasedList, setAreaBasedList] = useState(null); // 지역기반 관광정보 리스트
  const [pagination, setPagination] = useState(null); // 페이징 정보
  const [listLoading, setListLoading] = useState(false); // 리스트 로딩

  useEffect(() => {
    setAreaBasedList([...(initialData?.response?.body?.items?.item || [])]);
    setPagination({
      numOfRows: initialData?.response?.body?.numOfRows,
      pageNo: initialData?.response?.body?.pageNo,
      totalCount: initialData?.response?.body?.totalCount,
    });
  }, [initialData]);

  // 다음 페이지 불러오기
  function setNextPage() {
    if (listLoading) return;
    if (areaBasedList?.length >= pagination?.totalCount) return;
    else getAreaBasedList(pagination?.pageNo + 1);
  }

  // 지역기반 관광정보조회
  function getAreaBasedList(pageNo) {
    setListLoading(true);
    KorPetTourService.getAreaBasedList({
      numOfRows: pagination?.numOfRows,
      pageNo,
      arrange: 'R',
      ...query,
    })
      .then((res) => {
        setAreaBasedList([
          ...areaBasedList,
          ...res?.data?.response?.body?.items?.item,
        ]);
        setPagination({
          numOfRows: res?.data?.response?.body?.numOfRows,
          pageNo: res?.data?.response?.body?.pageNo,
          totalCount: res?.data?.response?.body?.totalCount,
        });
      })
      .catch((e) => console.log('e', e))
      .finally(() => setListLoading(false));
  }
  return (
    <div className="flex flex-wrap gap-2 pt-5 pb-10 px-4">
      {areaBasedList?.map((item) => {
        return (
          <Link
            href={`/pet-tour/detail/${item?.contenttypeid}/${item?.contentid}`}
            key={item?.contentid}
            className="flex flex-col gap-2 basis-[calc(50%-calc(0.5rem/2))]"
          >
            <div className="relative after:content-[''] after:pb-[90%] after:block">
              <Image
                draggable={false}
                fill
                className="object-cover rounded-lg box-border border border-[#F3F6F6]"
                src={
                  item?.firstimage ||
                  item?.firstimage2 ||
                  '/images/DefaultImage.webp'
                }
                sizes="100%" // sizes를 지정해달라고 해서 임시로 100%로 해놨는데 이거 무슨값을 넣어도 바뀌지않는데 왜그럴까?
                alt={item?.title}
              />
            </div>
            <div className="line-clamp-2">{item?.title}</div>
          </Link>
        );
      })}
      {listLoading &&
        [1, 2, 3, 4].map((index) => {
          return (
            <Fragment key={index}>
              <ImgSkeleton description />
            </Fragment>
          );
        })}
      {!listLoading && areaBasedList?.length < pagination?.totalCount && (
        <div ref={listLoadingRef.setRef}></div>
      )}
    </div>
  );
}
