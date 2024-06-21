'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from './auth-provider';

export enum AuthType {
    Login = 'login',
    Signup = 'signup',
}

interface ComponentProps {
    type: AuthType;
}

const formSchema = z.object({
    username: z
        .string()
        .min(4, { message: 'Username should be atleast 4 characters long' })
        .max(10, { message: 'Username cannot exceed more than 10 characters' }),
    password: z
        .string()
        .min(4, { message: 'Password length should be atleast 8 characters' }),
});

const InputForm: React.FC<ComponentProps> = ({ type }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const { login, register } = useAuth();

    const onSubmit = async () => {
        const username = form.getValues().username;
        const password = form.getValues().password;

        if (type === AuthType.Login) {
            login(username, password);
        } else {
            register(username, password);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 w-full mx-auto p-6 rounded-lg border bg-[card] text-card-foreground shadow-sm'
                style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
            >
                <h2 className='text-2xl font-semibold w-full text-center'>
                    {type && type.charAt(0).toUpperCase() + type.substring(1)}
                </h2>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter your username'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Enter your password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='w-[15rem] block mx-auto'>
                    {type && type.charAt(0).toUpperCase() + type.substring(1)}
                </Button>
            </form>
        </Form>
    );
};

export default InputForm;
