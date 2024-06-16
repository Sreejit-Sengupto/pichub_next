"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

interface User {
  _id: string;
  username: string;
  uploads?: {
    _id: string;
    caption: string;
    mediaURL: string;
    resourceType: string;
    cloudinaryPublicId: string;
    uploadedBy: string;
    belongsToGallery: string[];
  }[];
  galleries?: {
    _id: string;
    galleryName: string;
    members: string[];
    createdBy: string;
  }[];
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  upload: (formData: FormData) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  console.log(user);

  const router = useRouter();

  const getUser = async () => {
    const response = await axios.get("/api/user/get");
    console.log(response);
    // const userData = {
    //   username: response.data.userDetails.username,
    //   id: response.data.userDetails._id,
    // };
    setUser(response.data.userDetails);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const login = async (username: string, password: string) => {
    await axios.post("/api/user/login", {
      username,
      password,
    });
    await getUser();
    // const userData = {
    //   username: response.data.user.username,
    //   id: response.data.user._id,
    // };
    router.push("/");
  };

  const upload = async (formData: FormData) => {
    const response = await axios.post("/api/media/upload", formData);
    console.log(response.data);
  };

  const contextData = {
    user,
    login,
    upload,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};
