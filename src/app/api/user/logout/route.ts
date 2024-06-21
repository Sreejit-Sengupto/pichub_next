import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user.model';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    await dbConnect();
    const userId = request.headers.get('X-userId');
    console.log(userId);

    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true },
    );

    cookies().delete('accessToken');
    cookies().delete('refreshToken');

    return Response.json(
        {
            status: true,
            message: 'Logout successfull',
        },
        { status: 200 },
    );
}
