import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddToGallery from "./AddToGallery";
import DeleteImage from "./DeleteImage";

interface PropsType {
  username: string;
  uploadedBy: string;
  mediaId: string;
  imageUrl: string;
  caption: string;
  addToGallery: boolean;
  galleries?: {
    _id: string;
    galleryName: string;
    members: string[];
    createdBy: string;
  }[];
}

const ImagePreviewer: React.FC<PropsType> = ({
  username,
  uploadedBy,
  mediaId,
  imageUrl,
  caption,
  addToGallery,
  galleries,
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <img src={imageUrl} alt="image" />
        </DialogTrigger>
        <DialogContent
          className="w-full"
          style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
        >
          <DialogHeader>
            <DialogTitle>
              <img src={imageUrl} alt="image" className="w-full aspect-video" />
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-start">
              <span className="italic my-1">&quot;{caption}&quot;</span>
              {username === uploadedBy ? (
                <span>Uploaded by You</span>
              ) : (
                <span className="italic my-1">
                  Uploaded By -{" "}
                  <span className="text-green-500">{uploadedBy}</span>
                </span>
              )}
            </DialogDescription>
            <DialogDescription>
              <div className="flex justify-end items-center gap-2">
                {/* Segregate into seperate components */}
                {addToGallery && (
                  <AddToGallery galleries={galleries} mediaId={mediaId} />
                )}
                {username === uploadedBy && <DeleteImage mediaId={mediaId} />}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePreviewer;
