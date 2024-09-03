'use client';
import { useAuth } from '@/components/auth-provider';
import React from 'react';
import ImagePreviewer from '@/components/ImagePreviewer';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function ImagePage() {
    const { user } = useAuth();
    const userUploads = user?.uploads;

    const images =
        userUploads &&
        userUploads.map((item) => {
            return (
                <ImagePreviewer
                    imageUrl={item.mediaUrl}
                    caption={item.caption}
                    username={user.username}
                    uploadedBy={item.uploadedBy}
                    key={item._id}
                    mediaId={item._id}
                    addToGallery={true}
                    galleries={user && user.galleries}
                />
            );
        });
    return (
        <>
            {userUploads && userUploads.length === 0 && (
                <p className='flex justify-center items-center h-[500px] text-gray-500'>
                    No images uploaded yet
                </p>
            )}
            <div className='leading-none columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-1 inline-block mx-auto'>
                {images ? images : <SkeletonLoader />}
            </div>
        </>
    );
}
