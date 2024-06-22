import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { UserPlus2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './auth-provider';

const AddMember = ({ galleryId }: { galleryId: string }) => {
    const { getUser } = useAuth();
    const [newMember, setNewMember] = React.useState<string>('');
    const addMember = async () => {
        await toast.promise(
            axios.post('/api/gallery/add-member', {
                username: newMember,
                galleryId,
            }),
            {
                loading: `Adding ${newMember} to gallery`,
                success: `${newMember} added successfully`,
                error: `Failed to add ${newMember}`,
            },
        );
        setNewMember('');
        getUser();
    };
    return (
        <Popover>
            <PopoverTrigger className='flex justify-center items-center border rounded-md px-4 py-2 mr-2'>
                <span className='lg:mr-2'>
                    <UserPlus2 />
                </span>
                <span className='hidden lg:inline'>Add</span>
            </PopoverTrigger>
            <PopoverContent>
                <Input
                    placeholder='Enter username'
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                />
                <Button className='w-full mt-2' onClick={addMember}>
                    Add member
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default AddMember;
