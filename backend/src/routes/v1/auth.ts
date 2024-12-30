import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../../db";
import { UserSchema, UserType } from "../../types";

const router = express.Router();

router.use(express.json());

router.post("/signup", async (req: Request, res: Response) => {
  const user = UserSchema.safeParse(req.body);
  if (!user.success) {
    res.status(411).json({ message: "Error in inputs" });
    return;
  }

  try {
    const { username, password } = user.data as UserType;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    await UserModel.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });
    res.status(200).json({ message: "Signed up" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const user = UserSchema.safeParse(req.body);
  if (!user.success) {
    res.status(411).json({ message: "Error in inputs" });
    return;
  }
  try {
    const { username, password } = user.data as UserType;
    const userData = await UserModel.findOne({ username });
    if (!userData) {
      res.status(403).json({ message: "Username does not exist" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      res.status(403).json({ message: "Incorrect password" });
      return;
    }
    const token = jwt.sign(
      {
        id: userData._id,
        username: userData.username,
      },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({ message: "Signed in", token: token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
