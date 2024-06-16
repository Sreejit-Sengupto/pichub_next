import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const id = params.id; // 'a', 'b', or 'c'
  console.log(id);

  const userDetails = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId("662a1acdc5082f3e57dd103b"),
      },
    },
    {
      $lookup: {
        from: "media",
        localField: "username",
        foreignField: "uploadedBy",
        as: "uploads",
      },
    },
    {
      $lookup: {
        from: "galleries",
        localField: "username",
        foreignField: "members",
        as: "galleries",
      },
    },
    {
      $project: {
        username: 1,
        uploads: 1,
        galleries: 1,
      },
    },
  ]);

  if (!userDetails) {
    throw new Error("Failed to fetch user details");
  }

  return Response.json(
    {
      status: true,
      message: "User fetched successfully",
      userDetails: userDetails[0],
    },
    { status: 200 }
  );
}
