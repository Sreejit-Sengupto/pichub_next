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

const GalleryCreator = () => {
    const { getUser } = useAuth();

    const [galleryName, setGalleryName] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);

    const handleCreateGallery = async () => {
        try {
            await axios.post('/api/gallery/create', {
                galleryName,
            });
            getUser();
        } catch (error) {
            alert('Failed to create gallery');
        } finally {
            setOpen(false);
        }
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
