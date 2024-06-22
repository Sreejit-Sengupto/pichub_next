import React from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';
import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const GalleryCreator = () => {
    const router = useRouter();
    const { getUser } = useAuth();

    const [galleryName, setGalleryName] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);

    const handleCreateGallery = async () => {
        const data = await toast.promise(
            axios.post('/api/gallery/create', {
                galleryName,
            }),
            {
                loading: 'Creating gallery',
                success: 'Gallery created',
                error: 'Failed to create gallery',
            },
        );

        getUser();
        setOpen(false);
        setGalleryName('');
        router.push(data.data.data._id);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='ml-auto'>
                <PlusSquare />
            </DialogTrigger>
            <DialogContent
                className='w-[90%] lg:w-[20%]'
                style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
            >
                <DialogHeader>
                    <DialogTitle className='mb-2'>Create Gallery</DialogTitle>
                    <DialogDescription>
                        <Input
                            placeholder='Enter gallery name'
                            value={galleryName}
                            onChange={(event) => {
                                setGalleryName(event.target.value);
                            }}
                        />
                        <Button
                            className='w-full mt-2'
                            onClick={handleCreateGallery}
                        >
                            Create Gallery
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default GalleryCreator;
