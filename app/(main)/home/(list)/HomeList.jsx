'use client';
import Image from 'next/image';
// SERVICE
import KorPetTourService from '@/service/KorPetTourService ';
import { useEffect, useState } from 'react';

export default function HomeList({ initialData }) {
  const [list, setList] = useState([
    ...initialData?.response?.body?.items?.item,
  ]);
  useEffect(() => {
    console.log('list', list);
  }, [list]);

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
    </div>
  );
}
