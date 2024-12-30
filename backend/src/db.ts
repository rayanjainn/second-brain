import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  share: { type: Boolean, default: false },
});

enum ContentType {
  document = "document",
  tweet = "tweet",
  youtube = "youtube",
  link = "link",
  image = "image",
  notion = "notion",
}

const contentSchema = new Schema({
  type: { type: String, required: true, enum: Object.values(ContentType) },
  title: { type: String, required: true },
  link: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const tagSchema = new Schema({
  name: { type: String, required: true },
});

export const UserModel = model("User", userSchema);
export const ContentModel = model("Content", contentSchema);
export const TagModel = model("Tag", tagSchema);
