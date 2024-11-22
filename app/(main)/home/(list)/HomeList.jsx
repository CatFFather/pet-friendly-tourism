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
    <div className="flex flex-col gap-2">
      {list.map((item) => {
        return (
          <div key={item?.contentid} className="flex flex-col gap-2">
            <Image
              // fill
              src={item?.firstimage}
              width={500}
              height={500}
              alt={item?.title}
              style={{ objectFit: 'contain' }}
            />
            <div>{item?.title}</div>
          </div>
        );
      })}
    </div>
  );
}
