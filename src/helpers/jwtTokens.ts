import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const accessToken = (
  userId: string,
  username: string
) => {
  return jwt.sign(
    {
      _id: userId,
      username,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const refreshToken = (
  userId: string,
  username: string
) => {
  return jwt.sign(
    {
      _id: userId,
      username,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET,
    }
  );
};
