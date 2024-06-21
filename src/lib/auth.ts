import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

export async function verifyAuth(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
        throw new Error('Missing user token');
    }

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
        );
        // console.log(verified);
        return verified.payload;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
