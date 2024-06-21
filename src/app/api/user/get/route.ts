import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/user.model';

export async function GET(request: Request) {
    await dbConnect();
    const username = request.headers.get('X-username');
    const userDetails = await User.aggregate([
        {
            $match: {
                username: username,
            },
        },
        {
            $lookup: {
                from: 'media',
                localField: 'username',
                foreignField: 'uploadedBy',
                as: 'uploads',
            },
        },
        {
            $lookup: {
                from: 'galleries',
                localField: 'username',
                foreignField: 'members',
                as: 'galleries',
            },
        },
        {
            $project: {
                username: 1,
                uploads: 1,
                galleries: 1,
            },
        },
    ]);

    if (!userDetails) {
        throw new Error('Failed to fetch user details');
    }

    return Response.json(
        {
            status: true,
            message: 'User fetched successfully',
            userDetails: userDetails[0],
        },
        { status: 200 },
    );
}
