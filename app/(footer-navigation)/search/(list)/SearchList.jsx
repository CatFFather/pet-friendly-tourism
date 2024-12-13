'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
// COMPONENT
import ImgSkeleton from '@/components/card/ImgSkeleton';
import Empty from '@/components/common/Empty';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
import useObserver from '@/hooks/useObserver';
// UTILE
import LocalStorage from '@/utils/localStorage';

// 검색 리스트
export default function SearchList({ initialData, query }) {
  const listLoadingRef = useObserver({ callback: setNextPage });
  const [searchList, setSearchList] = useState(null); // 검색 리스트
  const [pagination, setPagination] = useState(null); // 페이징 정보
  const [listLoading, setListLoading] = useState(false); // 리스트 로딩

  const [keywordList, setKeywordList] = useState(null); // 키워드 리스트

  useEffect(() => {
    const recentKeywordList = JSON.parse(
      LocalStorage?.getItem('recent-keyword-list'),
    );
    if (!query?.keyword) return setKeywordList(recentKeywordList);
    const filterList =
      recentKeywordList?.filter(
        (keyword) => keyword?.value != query?.keyword,
      ) || [];
    const newKeyword = {
      key: filterList?.[0]?.key + 1 || 1,
      value: query?.keyword,
    };
    const newList =
      [newKeyword, ...filterList].filter((data, index) => index < 10) || [];
    LocalStorage?.setItem('recent-keyword-list', JSON.stringify(newList));
    // 최근 검색어 저장
    setKeywordList(newList);
  }, [query?.keyword]);

  useEffect(() => {
    setSearchList([...(initialData?.response?.body?.items?.item || [])]);
    setPagination({
      numOfRows: initialData?.response?.body?.numOfRows,
      pageNo: initialData?.response?.body?.pageNo,
      totalCount: initialData?.response?.body?.totalCount,
    });
  }, [initialData]);

  // 다음 페이지 불러오기
  function setNextPage() {
    if (listLoading) return;
    if (searchList?.length >= pagination?.totalCount) return;
    else getSearchKeywordList(pagination?.pageNo + 1);
  }

  // 키워드조회
  function getSearchKeywordList(pageNo) {
    setListLoading(true);
    KorPetTourService.getSearchKeywordList({
      numOfRows: pagination?.numOfRows,
      pageNo,
      arrange: 'R',
      ...query,
    })
      .then((res) => {
        setSearchList([
          ...searchList,
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
  // 최근 검색 내역 삭제
  function deleteRecentKeywordList(key) {
    if (key == 'ALL') {
      setKeywordList([]);
      LocalStorage?.setItem('recent-keyword-list', JSON.stringify([]));
    } else {
      const newKeywordList = keywordList.filter(
        (keyword) => keyword.key != key,
      );
      setKeywordList(newKeywordList);
      LocalStorage?.setItem(
        'recent-keyword-list',
        JSON.stringify(newKeywordList),
      );
    }
  }

  return (
    <div className="flex flex-wrap gap-2 pt-5 pb-10 px-4">
      {!query?.keyword && (
        // keyword가 없을 때 최근 검색 내역 리스트 노출
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#2D3035]">최근 검색 내역</span>
            <button
              className="text-[#9CA1AA] text-sm p-2"
              onClick={() => deleteRecentKeywordList('ALL')}
            >
              전체삭제
            </button>
          </div>
          {keywordList?.length > 0 ? (
            <ul className="flex-1 flex flex-col">
              {keywordList.map((keyword) => {
                return (
                  <li
                    key={keyword.key}
                    className="flex justify-between items-center border-b border-[#E9EBEC] py-3 px-2 gap-2"
                  >
                    <Link
                      className="flex-grow"
                      href={`/search?keyword=${keyword?.value}`}
                    >
                      <span className="text-[#2D3035] text-sm line-clamp-2">
                        {keyword?.value}
                      </span>
                    </Link>
                    <button
                      onClick={(e) => deleteRecentKeywordList(keyword.key)}
                    >
                      <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 " />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty contents="최근 검색 내역이 없습니다." />
          )}
        </div>
      )}

      {query?.keyword && searchList.length == 0 ? (
        // keyword가 있는데 검색 결과가 없을 때
        <Empty contents="검색 결과가 없습니다." />
      ) : (
        <>
          {searchList?.map((item) => {
            return (
              <Link
                href={`/pet-tour/detail/${item?.contenttypeid}/${item?.contentid}`}
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
          {!listLoading && searchList?.length < pagination?.totalCount && (
            <div ref={listLoadingRef.setRef}></div>
          )}
        </>
      )}
    </div>
  );
}
