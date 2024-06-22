'use client';
import React from 'react';
import { useAuth } from '@/components/auth-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function Home() {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'easeInOut',
                }}
                className='relative flex flex-col gap-4 items-center justify-center px-4'
            >
                <div className='text-5xl md:text-7xl font-bold text-primary text-center'>
                    Pichub
                </div>
                <div className='font-extralight text-xl md:text-4xl dark:text-neutral-200 py-4'>
                    Your Memories, Your Gallery, Your Friends
                </div>

                <div>
                    <Link
                        href={'/login'}
                        className='bg-black dark:bg-transparent rounded-full w-fit text-white px-7 py-2 border border-gray-500 mr-2'
                    >
                        Login
                    </Link>
                    <Link
                        href={'/signup'}
                        className='bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2'
                    >
                        Get started
                    </Link>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}
