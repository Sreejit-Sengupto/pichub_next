import dbConnect from "@/lib/dbConnect";
import { Gallery } from "@/models/gallery.model";
import { User } from "@/models/user.model";

export async function POST(request: Request) {
  await dbConnect();
  const { galleryId, username } = await request.json();

  if (!galleryId) {
    throw new Error("GalleryID is required");
  }
  if (!username) {
    throw new Error("Username is required");
  }

  const validUser = await User.findOne({
    username,
  });
  if (!validUser) {
    throw new Error("No user found with the following username");
  }

  const currentGallery = await Gallery.findById(galleryId);

  const userExists = currentGallery?.members.includes(username);
  if (userExists) {
    throw new Error("This user already exists in the gallery");
  }

  if (
    currentGallery?.members.length !== undefined &&
    currentGallery?.members.length > 50
  ) {
    throw new Error(
      "Limit exceeded, you cannot add more than 50 people in a gallery."
    );
  }

  await Gallery.findByIdAndUpdate(galleryId, {
    $addToSet: { members: username },
  });

  const addedMembers = await Gallery.findById(galleryId);
  if (!addedMembers) {
    throw new Error("Failed to add members");
  }

  return Response.json(
    {
      status: true,
      message: "New members added successfully",
      data: addedMembers,
    },
    { status: 200 }
  );
}
