import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = process.env.ALGORITHM as string;
const key = process.env.SECRET_KEY as string;
const iv = process.env.ANOTHER_KEY as string;

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (text: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
