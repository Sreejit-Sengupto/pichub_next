import dbConnect from "@/lib/dbConnect";
import { Gallery } from "@/models/gallery.model";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;

  if (!id) {
    throw new Error("Gallery id is required");
  }

  const gallery = await Gallery.findById(id);
  if (!gallery) {
    throw new Error(
      "No gallery found with the following id, it might have been already deleted"
    );
  }

  const userId = new mongoose.Types.ObjectId(
    request.headers.get("X-userId") as string
  );
  if (!gallery.createdBy.equals(userId)) {
    throw new Error("Not authorized to delete. Not owner");
  }

  await Gallery.findByIdAndDelete(id);

  return Response.json(
    {
      status: true,
      message: "Gallery deleted successfully",
    },
    { status: 200 }
  );
}
