"use client"

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ChangePasswordPage = () => {
    const [username, setUsername] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const { changePassword } = useAuth()

    const submitHandler = async () => {
        if (!username || !newPassword) {
            toast.error('All fields are requried')
        }

        try {
            setLoading(true)
            await changePassword(username, newPassword)
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false)
        }
    }
    return (
        <main className='w-[90%] lg:w-[30%] mx-auto h-[100dvh] flex flex-col justify-center items-center'>
            <section className='space-y-8 w-full mx-auto p-6 rounded-lg border bg-[card] text-card-foreground shadow-sm'
                style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}>
                <Input placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder='Enter your new password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <Button disabled={loading} onClick={submitHandler}>Change Password</Button>
            </section>
        </main>
    )
}

export default ChangePasswordPage