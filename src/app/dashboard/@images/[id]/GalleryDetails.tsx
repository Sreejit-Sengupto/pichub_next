'use client';
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { UsersRound } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios, { AxiosResponse } from 'axios';
import AddMember from '@/components/AddMember';
import DeleteGallery from '@/components/DeleteGallery';
import { useAuth } from '@/components/auth-provider';

const GalleryDetails = ({
    galleryName,
    galleryId,
}: {
    galleryName: string;
    galleryId: string;
}) => {
    const { user } = useAuth();
    const [members, setMembers] = React.useState<AxiosResponse | null>(null);
    console.log(members);

    React.useEffect(() => {
        fetchMembers();
    }, [galleryId]);

    const fetchMembers = async () => {
        const response = await axios.get(
            `/api/gallery/get-members/${galleryId}`,
        );
        setMembers(response.data);
    };

    const admin = members && members.data.admin[0].username;
    console.log(admin);

    const galleryMembers =
        members &&
        members.data.members.filter((item: string) => item !== admin);
    console.log(galleryMembers);

    return (
        <div className='border border-l-0 p-4 w-full flex justify-between items-center'>
            <p className='w-[40%] p-1 overflow-x-auto'>{galleryName}</p>

            <div className='flex justify-center items-center'>
                {user && user.username === admin && <AddMember  galleryId={galleryId}/>}

                <Popover>
                    <PopoverTrigger className='flex justify-center items-center border rounded-md px-4 py-2'>
                        <span className='lg:mr-2'>
                            <UsersRound />
                        </span>
                        <span className='hidden lg:inline'>Members</span>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ScrollArea className='max-h-[200px]'>
                            <p className='border-b-2 py-1 flex justify-between items-center'>
                                <span>
                                    {admin &&
                                        admin.charAt(0).toUpperCase() +
                                            admin.substring(1)}
                                </span>
                                <span className='text-xs text-gray-400'>
                                    Admin
                                </span>
                            </p>
                            {members &&
                                galleryMembers.map(
                                    (item: string, index: number) => {
                                        return (
                                            <p
                                                key={index}
                                                className='border-b-2 py-1'
                                            >
                                                {item.charAt(0).toUpperCase() +
                                                    item.substring(1)}
                                            </p>
                                        );
                                    },
                                )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>

                {user && user.username === admin && (
                    <DeleteGallery galleryId={galleryId} />
                )}
            </div>
        </div>
    );
};

export default GalleryDetails;
