import dbConnect from '@/lib/dbConnect';
import { Media } from '@/models/media.model';
import { ApiError } from 'next/dist/server/api-utils';

export async function GET(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        await dbConnect();

        const mediaId = params.id;
        console.log(mediaId);

        if (!mediaId) {
            throw new ApiError(400, 'Media id is required');
        }

        const media = await Media.findById(mediaId);
        if (!media) {
            throw new ApiError(404, 'Not found');
        }

        return Response.json(
            {
                status: true,
                message: 'media fetched successfully',
                media,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, 'Failed to fetch');
    }
}
