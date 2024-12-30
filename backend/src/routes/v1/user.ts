import express, { Router, Request, Response } from "express";
import { userMiddleware } from "../../middlewares/auth";
import { ContentSchema, ContentType } from "../../types";
import { ContentModel } from "../../db";

const router = Router();

router.use(express.json());

router.post("/content", userMiddleware, async (req: Request, res: Response) => {
  const content = ContentSchema.safeParse(req.body);
  if (!content.success) {
    res.status(411).json({ message: "Error in inputs" });
    return;
  }
  try {
    const { title, type, link, tags } = content.data as ContentType;
    await ContentModel.create({
      type: type,
      title: title,
      link: link,
      tags: tags,
      userId: req.userId,
    });
    res.status(200).json({ message: "Content created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    return;
  }
});

router.get("/contents", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const contents = await ContentModel.find({ userId: userId }).populate(
      "userId",
      "username"
    );
    res.status(200).json({ message: "Contents fetched", contents: contents });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    return;
  }
});

router.delete(
  "/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    const contentId = req.body.id;
    const userId = req.userId;
    try {
      await ContentModel.deleteOne({ _id: contentId, userId: userId });
      res.status(200).json({ message: "Content deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
