'use client';
import { useAuth } from '@/components/auth-provider';
import React from 'react';
import ImagePreviewer from '@/components/ImagePreviewer';

export default function ImagePage() {
    const { user } = useAuth();
    const userUploads = user?.uploads;
    const images =
        userUploads &&
        userUploads.map((item) => {
            return (
                <ImagePreviewer
                    imageUrl={item.mediaURL}
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
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mx-auto'>
                {images}
            </div>
        </>
    );
}
