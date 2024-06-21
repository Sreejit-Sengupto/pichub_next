'use client';
import React from 'react';
import { GalleryHorizontalEndIcon } from 'lucide-react';
import ActiveLink from '@/components/ActiveLink';
import { useAuth } from '@/components/auth-provider';
import GalleryCreator from '@/components/GalleryCreator';

export default function SidePanel() {
    const galleries = useAuth().user?.galleries;
    return (
        <div className='w-full'>
            <h2 className='text-lg text-gray-400 my-6 flex justify-start items-center mx-4'>
                <span>Galleries</span>
                <span className='ml-2'>
                    <GalleryHorizontalEndIcon />
                </span>
                <GalleryCreator />
            </h2>

            <ActiveLink href='/dashboard'>All Media</ActiveLink>

            {galleries &&
                galleries.map((item) => {
                    return (
                        <ActiveLink
                            href={`/dashboard/${item._id}`}
                            key={item._id}
                        >
                            {item.galleryName}
                        </ActiveLink>
                    );
                })}
        </div>
    );
}
