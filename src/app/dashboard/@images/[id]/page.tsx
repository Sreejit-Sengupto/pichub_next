'use client';
import React from 'react';
import ImagePreviewer from '@/components/ImagePreviewer';
import { useAuth } from '@/components/auth-provider';
import GalleryDetails from './GalleryDetails';
import axios from 'axios';
import SkeletonLoader from '@/components/SkeletonLoader';

const GalleryViewer = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const { user } = useAuth();

    const [images, setImages] = React.useState<any>();

    React.useEffect(() => {
        getImages();
    }, [params]);

    const getImages = async () => {
        const response = await axios(`/api/gallery/get-images/${id}`);
        setImages(response.data);
    };
    return (
        <div className='flex flex-col'>
            <GalleryDetails
                galleryId={id}
                galleryName={images ? images.data[0].galleryName : ''}
            />
            {images && images.data[0].images.length === 0 && (
                <p className='flex justify-center items-center h-[500px] text-gray-500'>
                    No images in this Gallery
                </p>
            )}
            <div className='leading-none columns-5 gap-1 inline-block mx-auto'>
            {/* <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mx-auto'> */}
                {images ? (
                    images.data[0].images.map((item: any) => {
                        return (
                            <ImagePreviewer
                                imageUrl={item.mediaUrl}
                                caption={item.caption}
                                mediaId={item._id}
                                username={user?.username!}
                                uploadedBy={item.uploadedBy}
                                key={item._id}
                                addToGallery={false}
                            />
                        );
                    })
                ) : (
                    <SkeletonLoader />
                )}
            </div>
        </div>
    );
};

export default GalleryViewer;
