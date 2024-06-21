import generateTokens from '@/lib/generateTokens';
import { cookies } from 'next/headers';
import { User } from '@/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: Request) {
    await dbConnect();
    const { username, password } = await request.json();
    console.log(username);
    console.log(password);

    if (!username || !password) {
        throw new Error('valid credentials required');
    }

    const user = await User.findOne({
        username,
    }).select('-password, -refreshToken');

    if (!user) {
        throw new Error('No user found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new Error('Invalid password');
    }

    //   const { accessTokens, refreshTokens } = await generateTokens(user.id);
    const accessToken = () =>
        jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.ACCESS_TOKEN_SECRET!,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            },
        );

    const refreshToken = () =>
        jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.REFRESH_TOKEN_SECRET!,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            },
        );

    cookies().set('accessToken', accessToken(), {
        httpOnly: true,
        secure: false,
    });
    cookies().set('refreshToken', refreshToken(), {
        httpOnly: true,
        secure: false,
    });
    return Response.json(
        {
            status: true,
            message: 'Logged in successfully',
            user,
        },
        {
            status: 200,
        },
    );
}
