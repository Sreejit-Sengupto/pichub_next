'use client';
import InputForm, { AuthType } from '@/components/InputForm';
import { useAuth } from '@/components/auth-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Signup = () => {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <div className='w-[90%] lg:w-[30%] mx-auto h-[100dvh] flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold mb-10'>
                Welcome to <span className='text-primary'>Pichub</span>
            </h1>
            <InputForm type={AuthType.Signup} />
            <p>
                Already registered?
                <Link href={'/login'} className='ml-2 underline'>
                    Login now
                </Link>
            </p>
        </div>
    );
};

export default Signup;
