/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { getAllImages } from '@/apis/image';

import LeftArrow from '../icon/LeftArrow';
import RightArrow from '../icon/RightArrow';
import Card from './Card';

export default function Cards({
  className,
  page,
  search
}: {
  className?: string;
  page: string;
  search: string | undefined
}) {
  const { data } = useQuery({
    queryKey: ['images', page, search],
    queryFn: () => getAllImages(page, search),
  });

  const router = useRouter();
  const _page = parseInt(page);
  const totalPage = Math.ceil(data?.total / 17);

  return (
    <>
      <div className={`columns-2 md:columns-4 space-y-5 gap-4  ${className}`}>
        {data?.images.map((elem: any, index: number) => (
          <Card key={index} cover={elem.image_url} {...elem} />
        ))}
      </div>
      <div className="mt-10 relative">
        <Link
          className="absolute left-[50%] translate-x-[-50%] border-[0.1em] border-black rounded-full py-2 px-4"
          onClick={(e) => {
            e.preventDefault();
            if (_page === totalPage) return;
            router.push(`?page=${_page + 1}`);
          }}
          href="#"
        >
          다음 페이지
        </Link>
        <div className="flex items-center gap-6 absolute right-0">
          <Link
            onClick={(e) => {
              e.preventDefault();
              if (_page === 1) return;
              router.push(`?page=${_page - 1}`);
            }}
            className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center"
            href="#"
          >
            <LeftArrow />
          </Link>
          <div>
            <span>{page}</span>
            &nbsp; / &nbsp; {totalPage}
          </div>
          <Link
            onClick={(e) => {
              e.preventDefault();
              if (_page === totalPage) return;
              router.push(`?page=${_page + 1}`);
            }}
            className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center"
            href="#"
          >
            <RightArrow />
          </Link>
        </div>
      </div>
    </>
  );
}
