import dbConnect from '@/lib/dbConnect';
import { Gallery } from '@/models/gallery.model';
import mongoose from 'mongoose';

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    await dbConnect();
    const id = params.id;
    if (!id) {
        throw new Error('Gallery id is required');
    }

    const currentGallery = await Gallery.findById(id);
    if (!currentGallery) {
        throw new Error('No gallery found with this id');
    }
    if (
        !currentGallery.members.includes(
            request.headers.get('X-username') as string,
        )
    ) {
        throw new Error('You are not part of this gallery');
    }

    const galleryImages = await Gallery.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'media',
                localField: '_id',
                foreignField: 'belongsToGallery',
                as: 'images',
                pipeline: [
                    {
                        $project: {
                            caption: 1,
                            mediaURL: 1,
                            resourceType: 1,
                            cloudinaryPublicId: 1,
                            uploadedBy: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                galleryName: 1,
                images: 1,
            },
        },
    ]);

    console.log(galleryImages);

    if (!galleryImages) {
        throw new Error('Failed to fetch the gallery');
    }

    return Response.json(
        {
            status: true,
            message: 'Gallery images fetched successfully',
            data: galleryImages,
        },
        { status: 200 },
    );
}
