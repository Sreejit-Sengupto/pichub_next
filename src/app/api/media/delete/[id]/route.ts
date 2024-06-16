import { deleteFromCloudinary } from "@/lib/uploadToCloudinary";
import { Media } from "@/models/media.model";
import { ApiError } from "next/dist/server/api-utils";

export async function DELETE(req: Request, { params }: { params: { id: string }}) {
  try {
    // const mediaId = await req.json();
    const mediaId = params.id;
    if (!mediaId) {
      throw new ApiError(400, "Media id is required");
    }

    const media = await Media.findById(mediaId);
    if (!media) {
      throw new ApiError(404, "No media was found with the following id");
    }
    if (media.uploadedBy !== req.headers.get("X-username")) {
      throw new ApiError(403, "You cannot delete someone else's media");
    }

    const delStatus = await deleteFromCloudinary(
      media.cloudinaryPublicId,
      media.resourceType
    );
    if (!delStatus) {
      throw new ApiError(500, "Failed to delete media");
    }

    const delFromDB = await Media.findByIdAndDelete(media._id);
    if (!delFromDB) {
      throw new ApiError(
        500,
        "There was some problem while deleting media file from the database"
      );
    }

    return Response.json(
      {
        status: true,
        message: "Media deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Failed to delete");
  }
}
