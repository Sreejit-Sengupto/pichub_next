import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash } from "lucide-react";
import axios from "axios";

interface PropsType {
  mediaId: string;
}

const DeleteImage: React.FC<PropsType> = ({ mediaId }) => {
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const deleteMedia = async () => {
    setDeleting(true);
    await axios.delete(`/api/media/delete/${mediaId}`);
    setDeleting(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="bg-transparent flex justify-center items-center text-red-700 p-2 border rounded-md"
        disabled={deleting}
      >
        <span>
          <Trash size={"1.4em"} />
        </span>
        <span className="text-lg ml-1">Delete</span>
      </AlertDialogTrigger>

      <AlertDialogContent
        style={{ boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )` }}
        className="w-[90%] lg:w-[20%]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The media will be permenantly deleted and removed from the galleries
            as well.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-transparent border rounded-md text-red-500 hover:bg-transparent"
            onClick={deleteMedia}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImage;
