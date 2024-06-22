import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import toast from 'react-hot-toast';

const DeleteGallery = ({ galleryId }: { galleryId: string }) => {
    const router = useRouter();
    const { getUser } = useAuth();

    const deleteGallery = async () => {
        await toast.promise(axios.delete(`/api/gallery/delete/${galleryId}`), {
            loading: 'Deleting gallery',
            success: 'Deleted successfully',
            error: 'Failed to delete',
        });
        router.push('/dashboard');
        getUser();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-red-800 hover:bg-red-700 mx-2 flex justify-center items-center text-white px-4 py-2 rounded-md'>
                <span>
                    <Trash size={'1.2em'} />
                </span>
                <span className='ml-1 hidden lg:inline'>Delete</span>
            </AlertDialogTrigger>
            <AlertDialogContent
                style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This Gallery will be permenantly deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className='bg-transparent border rounded-md text-red-500 hover:bg-transparent'
                        onClick={deleteGallery}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteGallery;
