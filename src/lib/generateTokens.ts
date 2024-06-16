import { accessToken, refreshToken } from "@/helpers/jwtTokens";
import { User } from "@/models/user.model";
import mongoose from "mongoose";

const generateTokens = async (userId: string) => {
  try {
    console.log(typeof userId);
    
    const user = await User.findById(userId);
    const accessTokens = accessToken(userId, user?.username!);
    const refreshTokens = refreshToken(userId, user?.username!);

    user!.refreshToken = refreshTokens;
    await user!.save({ validateBeforeSave: false });
    return { accessTokens, refreshTokens };
  } catch (error) {
    console.log(error);
    
    throw new Error("Something went wrong");
  }
};

export default generateTokens;
