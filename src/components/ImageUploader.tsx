import React, { ChangeEvent, FormEventHandler, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useAuth } from "./auth-provider";
axios.defaults.withCredentials = true;
// import { createNotification } from "../Functions/notify";

const ImageUploder: React.FC = () => {
  const [mediaPath, setMediaPath] = React.useState<File | null>(null);
  const [caption, setCaption] = React.useState<string>("");
  // const [galleries, setGalleries] = React.useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const galleries = useAuth().user?.galleries;
  const { upload } = useAuth();

  // React.useEffect(() => {
  //   fetchGalleries();
  // }, []);

  // const fetchGalleries = async () => {
  //   const response = await axios.get(
  //     "https://pichub-backend-tlwt.onrender.com/api/v1/user/get",
  //     { withCredentials: true },
  //   );
  //   setGalleries(response.data.data.galleries);
  // };

  const handleMediaPath = (event: ChangeEvent<HTMLInputElement>) => {
    setMediaPath(event.target.files?.[0] || null);
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (mediaPath) {
      formData.append("file", mediaPath);
    }
    if (selectedGallery) {
      formData.append("galleryId", selectedGallery);
    }
    console.log(formData);
    
    upload(formData)
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span>
              <Upload />
            </span>
            <span className="hidden lg:inline text-lg ml-2">Upload</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <form
              onSubmit={handleUpload}
              >
                <Input
                  type="file"
                  name="uploaded media"
                  onChange={handleMediaPath}
                />
                <Input
                  type="text"
                  name="caption"
                  value={caption}
                  placeholder="Caption..."
                  onChange={(event) => setCaption(event.target.value)}
                  className="my-4"
                />

                <Select onValueChange={setSelectedGallery}>
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Add to gallery" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleries &&
                      galleries.map((item) => {
                        return (
                          <SelectItem value={item._id} key={Number(item._id)}>
                            {item.galleryName}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>

                <div className="space-y-2 flex justify-center items-center w-full">
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    <span>Upload</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ImageUploder;
