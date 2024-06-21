import dbConnect from '@/lib/dbConnect';
import { Gallery } from '@/models/gallery.model';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { galleryName } = await request.json();
        if (!galleryName) {
            throw new Error('Gallery name is required');
        }

        const gallery = await Gallery.create({
            galleryName,
            members: request.headers.get('X-username'),
            createdBy: request.headers.get('X-userId'),
        });

        if (!gallery) {
            throw new Error('failed to create gallery');
        }

        return Response.json(
            {
                status: true,
                message: 'Gallery created successfully',
                data: gallery,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
    }
}
