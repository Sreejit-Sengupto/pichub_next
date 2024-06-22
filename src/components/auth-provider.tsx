'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
    _id: string;
    username: string;
    uploads?: {
        _id: string;
        caption: string;
        mediaUrl: string;
        resourceType: string;
        cloudinaryPublicId: string;
        uploadedBy: string;
        belongsToGallery: string[];
    }[];
    galleries?: {
        _id: string;
        galleryName: string;
        members: string[];
        createdBy: string;
    }[];
}

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (username: string, password: string) => void;
    register: (username: string, password: string) => void;
    upload: (formData: FormData) => void;
    getUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

    const router = useRouter();

    const getUser = async () => {
        const response = await axios.get('/api/user/get');
        setUser(response.data.userDetails);
    };

    React.useEffect(() => {
        getUser();
    }, []);

    const login = async (username: string, password: string) => {
        await toast.promise(
            axios.post('/api/user/login', {
                username,
                password,
            }),
            {
                loading: 'Hold on! Loggin you in',
                success: 'Logged in successfully',
                error: 'Log in failed',
            },
        );
        await getUser();
        router.push('/');
    };

    const register = async (username: string, password: string) => {
        await toast.promise(
            axios.post('/api/user/signup', {
                username,
                password,
            }),
            {
                loading: 'Signing up...',
                success: 'Sign up successfull',
                error: 'Sign up failed',
            },
        );
        await login(username, password);
    };

    const upload = async (formData: FormData) => {
        await toast.promise(axios.post('/api/media/upload', formData), {
            loading: 'Patience! Uploading your media...',
            success: 'Media uploaded successfully',
            error: 'Upload failed',
        });
        getUser();
    };

    const contextData = {
        user,
        setUser,
        login,
        register,
        upload,
        getUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error('useAuth must be within an AuthProvider');
    }
    return context;
};
