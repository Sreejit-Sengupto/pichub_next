import dbConnect from '@/lib/dbConnect';
import { Gallery } from '@/models/gallery.model';
import { Media } from '@/models/media.model';
import mongoose from 'mongoose';
import { ApiError } from 'next/dist/server/api-utils';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { galleryId, mediaId } = await req.json();

        if (!galleryId) {
            throw new ApiError(400, 'Gallery id is required');
        }
        if (!mediaId) {
            throw new ApiError(400, 'Gallery id is required');
        }

        const gallery = await Gallery.findById(galleryId);
        const validMember = gallery?.members.includes(
            req.headers.get('X-username') as string,
        );
        if (!validMember) {
            throw new ApiError(403, 'You are not a member of this gallery');
        }

        const media = await Media.findById(mediaId);
        if (!media) {
            throw new ApiError(
                404,
                'No media found with the following id, it might have been deleted',
            );
        }
        if (
            media &&
            media.belongsToGallery.includes(
                new mongoose.Types.ObjectId(galleryId),
            )
        ) {
            throw new ApiError(
                400,
                'This media file is already in the provided gallery',
            );
        }

        media.belongsToGallery.push(new mongoose.Types.ObjectId(galleryId));
        await media.save();

        const updatedMedia = await Media.findById(media._id).select(
            '-belongsToGallery',
        );
        if (!updatedMedia) {
            throw new ApiError(500, 'Failed to add the media to gallery');
        }

        return Response.json(
            {
                status: true,
                message: 'Added to gallery successfully',
                updatedMedia,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, 'failed to add to gallery');
    }
}
