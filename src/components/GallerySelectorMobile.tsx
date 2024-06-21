import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { GalleryHorizontalEndIcon } from 'lucide-react';
import Link from 'next/link';
import GalleryCreator from '@/components/GalleryCreator';
import { useAuth } from './auth-provider';

const GallerySelectorMobile = () => {
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);
    return (
        <div className='flex ml-2 lg:hidden justify-center items-center rounded-md border px-4 py-[7px]'>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <GalleryHorizontalEndIcon />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className='flex justify-center items-center'>
                            <p>Your Galleries</p>
                            <p className='ml-auto text-gray-400'>
                                <GalleryCreator />
                            </p>
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            onClick={() => setOpen(false)}
                            className='bg-transparent border-2 rounded-md'
                        >
                            <Link href={`/dashboard`}>All Media</Link>
                        </Button>
                        {user?.galleries &&
                            user.galleries.map((item) => {
                                return (
                                    <Link
                                        onClick={() => setOpen(false)}
                                        href={`/dashboard/${item._id}`}
                                        key={item._id}
                                    >
                                        <Button className='w-full'>
                                            {item.galleryName}
                                        </Button>
                                    </Link>
                                );
                            })}
                        <DrawerClose>
                            <Button variant='outline'>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default GallerySelectorMobile;
