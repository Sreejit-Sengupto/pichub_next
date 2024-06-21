import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localPath: string) => {
    try {
        console.log(localPath);
        if (!localPath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto',
        });
        fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
};

const deleteFromCloudinary = async (publicId: string, type: string) => {
    try {
        if (!publicId) {
            return null;
        }
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: type,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { uploadToCloudinary, deleteFromCloudinary };
