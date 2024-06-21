'use client';
import React from 'react';
import ImagePreviewer from '@/components/ImagePreviewer';
import { useAuth } from '@/components/auth-provider';
import GalleryDetails from './GalleryDetails';

const GalleryViewer = ({ params }: { params: { id: string } }) => {
    console.log(params);
    const id = params.id;
    const { user } = useAuth();

    const [images, setImages] = React.useState<any>();
    console.log(images);

    React.useEffect(() => {
        getImages();
    }, [params]);

    const getImages = async () => {
        const response = await fetch(`/api/gallery/get-images/${id}`, {
            next: { tags: ['galleryImgs'] },
        });
        const data = await response.json();
        setImages(data);
    };
    return (
        <div className='flex flex-col'>
            <GalleryDetails galleryId={id} />
            {images && images.data[0].images.length === 0 && (
                <p className='flex justify-center items-center h-[500px] text-gray-500'>
                    No images in this Gallery
                </p>
            )}
            <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mx-auto'>
                {images
                    ? images.data[0].images.map((item: any) => {
                          return (
                              <ImagePreviewer
                                  imageUrl={item.mediaURL}
                                  caption={item.caption}
                                  mediaId={item._id}
                                  username={user?.username!}
                                  uploadedBy={item.uploadedBy}
                                  key={item._id}
                                  addToGallery={false}
                              />
                          );
                      })
                    : 'Loading'}
            </div>
        </div>
    );
};

export default GalleryViewer;
