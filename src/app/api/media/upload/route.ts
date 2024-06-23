import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs/promises';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { Media } from '@/models/media.model';
import dbConnect from '@/lib/dbConnect';
import { ApiError } from 'next/dist/server/api-utils';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const formData = await req.formData();
        const file = await formData.get('file') as File;
        console.log(file);
        
        const caption = await formData.get('caption') as string;
        const galleryId = await formData.get('galleryId') as string;


        const fileBuffer = await file.arrayBuffer()
        const mime = file.type;
        const encoding = 'base64'
        const base64Data = Buffer.from(fileBuffer).toString('base64')
        const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

        const uploadedFile = await uploadToCloudinary(fileUri);
        console.log(uploadedFile);

        if (!uploadedFile?.url) {
            throw new Error('Failed to upload file');
        }

        const media = await Media.create({
            caption: caption,
            mediaUrl: uploadedFile.secure_url,
            resourceType: uploadedFile.resource_type,
            cloudinaryPublicId: uploadedFile.public_id,
            uploadedBy: req.headers.get('X-username'),
        });

        if (!media) {
            throw new ApiError(500, 'Failed to save to Database');
        }

        if (galleryId) {
            media.belongsToGallery.push(new mongoose.Types.ObjectId(galleryId));
            await media.save();
        }

        return NextResponse.json(
            {
                status: 'success',
                message: 'Media uploaded successfully',
                media,
            },
            { status: 200 },
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 'fail', error: e });
    }
}
