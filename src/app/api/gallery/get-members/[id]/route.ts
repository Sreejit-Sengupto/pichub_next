import dbConnect from "@/lib/dbConnect";
import { Gallery } from "@/models/gallery.model";

export async function GET(
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
    throw new Error("No gallery found with this id");
  }
  const members = await Gallery.aggregate([
    {
      $match: {
        _id: gallery._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "admin",
        pipeline: [
          {
            $project: {
              username: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        members: 1,
        admin: 1,
      },
    },
  ]);

  return Response.json(
    {
      status: true,
      message: "Members fetched successfully",
      data: members[0],
    },
    { status: 200 }
  );
}
