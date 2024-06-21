import mongoose, { Schema, Document } from 'mongoose';
export interface Media extends Document {
    caption: string;
    mediaUrl: string;
    resourceType: string;
    cloudinaryPublicId: string;
    uploadedBy: string;
    belongsToGallery: mongoose.Types.ObjectId[];
}

const mediaSchema: Schema<Media> = new Schema(
    {
        caption: {
            type: String,
        },
        mediaUrl: {
            type: String,
            required: true,
        },
        resourceType: {
            type: String,
            required: true,
        },
        cloudinaryPublicId: {
            type: String,
            required: true,
        },
        uploadedBy: {
            type: String,
        },
        belongsToGallery: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Gallery',
            },
        ],
    },
    { timestamps: true },
);

export const Media =
    (mongoose.models.Media as mongoose.Model<Media>) ||
    mongoose.model<Media>('Media', mediaSchema);
