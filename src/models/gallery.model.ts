import mongoose, { Schema, Document } from "mongoose";
import { User } from "./user.model";

export interface Gallery extends Document {
  galleryName: string;
  members: string[];
  createdBy: mongoose.Types.ObjectId;
}

const gallerySchema: Schema<Gallery> = new Schema({
  galleryName: {
    type: String,
    required: true,
  },
  members: [
    {
      type: String,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Gallery =
  (mongoose.models.Gallery as mongoose.Model<Gallery>) ||
  mongoose.model<Gallery>("Gallery", gallerySchema);
