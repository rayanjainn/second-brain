import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/v1/index";

dotenv.config();

const app = express();

app.use("/api/v1", router);

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION as string);
    console.log("Connected to MongoDB");
    app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log("Server is running");
    });
  } catch (err) {
    console.log(err);
  }
};

connection();
