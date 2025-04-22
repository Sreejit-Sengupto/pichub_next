'use client';
import React from 'react';
import InputForm from '@/components/InputForm';
import { AuthType } from '@/components/InputForm';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

const Login = () => {
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
                Welcome <span className='text-primary'>Back</span>
            </h1>
            <InputForm type={AuthType.Login} />
            <p>
                Not registered yet?
                <Link href={'/signup'} className='ml-2 underline'>
                    Register now
                </Link>
            </p>
            <p>
                Forgot Password?
                <Link href={'/change-password'} className='ml-2 underline'>
                    Change now
                </Link>
            </p>
        </div>
    );
};

export default Login;
