'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface PropTypes {
    href: string;
    children: React.ReactNode;
}

const ActiveLink: React.FC<PropTypes> = ({ href, children }) => {
    const pathname = usePathname();
    const style = {};
    return (
        <Link
            href={href}
            className={
                pathname === href
                    ? 'bg-primary block w-full p-5 rounded-l-full my-2 relative text-white curve transition duration-200'
                    : 'block w-full p-5 rounded-l-full my-2 curve transition duration-200'
            }
        >
            {children}
        </Link>
    );
};

export default ActiveLink;
