/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getAllImages } from '@/apis/image';

import Card from './Card';

export default function Cards({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: getAllImages,
  });

  return (
    <div
      className={`columns-2 md:columns-4 space-y-5 gap-4 min-h-[1400px] ${className}`}
    >
      {data?.map((elem: any, index: number) => (
        <Card key={index} cover={elem.image_url} {...elem} />
      ))}
    </div>
  );
}
