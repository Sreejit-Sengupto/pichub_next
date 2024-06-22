import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader = () => {
    return (
        <>
            <Skeleton className='h-[12rem] rounded-md' />
            <Skeleton className='h-[12rem] rounded-md' />
            <Skeleton className='h-[12rem] rounded-md' />
            <Skeleton className='h-[12rem] rounded-md' />
            <Skeleton className='h-[12rem] rounded-md' />
            <Skeleton className='h-[12rem] rounded-md' />
        </>
    );
};

export default SkeletonLoader;
