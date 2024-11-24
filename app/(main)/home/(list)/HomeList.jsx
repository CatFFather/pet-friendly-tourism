'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
import useObserver from '@/hooks/useObserver';
export default function HomeList({ initialData }) {
  const listLoadingRef = useObserver({
    callback: setNextPage,
  });
  const [list, setList] = useState([
    ...initialData?.response?.body?.items?.item,
  ]);
  const [pagination, setPagination] = useState({
    numOfRows: initialData?.response?.body?.numOfRows,
    pageNo: initialData?.response?.body?.pageNo,
    totalCount: initialData?.response?.body?.totalCount,
  });
  const [listLoading, setListLoading] = useState(false);

  // useEffect(() => {
  //   console.log('list', list);
  // }, [list]);
  // useEffect(() => {
  //   console.log('pagination', pagination);
  // }, [pagination]);

  // 다음 페이지 불러오기
  function setNextPage() {
    if (listLoading) return;
    if (list?.length >= pagination?.totalCount) return;
    else getAreaBasedList(pagination.pageNo + 1);
  }

  // 지역기반 관광정보조회
  function getAreaBasedList(pageNo) {
    setListLoading(true);
    KorPetTourService.getAreaBasedList({
      numOfRows: pagination.numOfRows,
      pageNo,
    })
      .then((res) => {
        // console.log('res', res);
        setList([...list, ...res?.data.response?.body?.items?.item]);
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
      {list.map((item) => {
        return (
          <div
            key={item?.contentid}
            className="flex flex-col gap-2 basis-[calc(50%-calc(0.5rem/2))]"
          >
            <div className="relative after:content-[''] after:pb-[90%] after:block">
              <Image
                fill
                className="object-cover rounded-lg box-border border border-[#F3F6F6]"
                src={
                  item?.firstimage ||
                  item?.firstimage2 ||
                  '/images/DefaultImage.webp'
                }
                alt={item?.title}
              />
            </div>
            <div className="">{item?.title}</div>
          </div>
        );
      })}
      {!listLoading && list?.length < pagination?.totalCount && (
        <div ref={listLoadingRef.setRef}>다음 페이지@@@@@@@@@@@</div>
      )}
    </div>
  );
}
