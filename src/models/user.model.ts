import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  // _id?: string,
  username: string;
  password: string;
  refreshToken?: string;
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const hashedPassword = await bcrypt.hash(this.password, 11);
//   this.password = hashedPassword;
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };

export const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
