"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOutIcon, UserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/components/auth-provider";
import ImageUploder from "@/components/ImageUploader";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center p-4 border">
      <p className="text-2xl font-semibold text-primary">Pichub</p>

      <div className="flex justify-center items-center">
        <div className="mr-2"><ImageUploder /></div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <span className="hidden lg:inline text-lg mr-2">
                {user && user.username}
              </span>
              <span>
                <UserRound />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <p className="text-center">_id: {user && user._id}</p>
                <p className="lg:hidden text-center">
                  Username: {user && user.username}
                </p>
              </div>
              <div className="space-y-2">
                <button
                  className="mx-auto w-full flex justify-center items-center border p-3 rounded-lg text-red-500"
                  // onClick={logout}
                >
                  <span>Logout</span>
                  <span className="ml-2">
                    <LogOutIcon />
                  </span>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* <GallerySelectorMobile user={user} /> */}
      </div>
    </div>
  );
};

export default Navbar;
