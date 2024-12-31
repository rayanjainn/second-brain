import express, { Request, Response, Router } from "express";
import { userMiddleware } from "../../middlewares/auth";
import { UserModel, ContentModel } from "../../db";
import dotenv from "dotenv";
import { decrypt, encrypt } from "./rcrypt";

const router = Router();
dotenv.config();

router.use(express.json());

router.post("/share", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    await UserModel.updateOne({ _id: userId }, { share: true });
    const shareLink = encrypt(userId);
    res.status(200).json({ message: "Share link generated", shareLink });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/:shareLink",
  userMiddleware,
  async (req: Request, res: Response) => {
    const shareLink = req.params.shareLink;
    const currentUserId = req.userId;
    let shareUserId;
    try {
      shareUserId = decrypt(shareLink);
    } catch (err) {
      res.status(404).json({ message: "Share link not found" });
      return;
    }

    try {
      const shareUSer = await UserModel.findOne({
        _id: shareUserId,
        share: true,
      });
      if (shareUSer) {
        if (shareUserId === currentUserId) {
          res.status(403).json({ message: "You cannot share with yourself" });
          return;
        } else {
          const contents = await ContentModel.find({
            userId: shareUserId,
          });
          const formatContents = {
            username: shareUSer.username,
            content: contents.map((content) => {
              return {
                id: content._id,
                type: content.type,
                title: content.title,
                link: content.link,
                tags: content.tags,
              };
            }),
          };
          res
            .status(200)
            .json({ message: "Content fetched", contents: formatContents });
          return;
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;

//5dbd31e325a9963daf777f84746b76bc.4800de9acece3560afa4ca346fde76df7269cfb1c5cb7552f83e9f3ec5597013d0eef3cc087b4ff99b1c2891a32d8a3612c5f90c909fd0aa003e5e43da487597
