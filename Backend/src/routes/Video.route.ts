import { Router } from "express";
import { getVideos, addVideo, deleteVideo } from "../controllers/Video.controller";

const router = Router();

router.get("/", getVideos);
router.post("/", addVideo);
router.delete("/", deleteVideo);

export default router;
