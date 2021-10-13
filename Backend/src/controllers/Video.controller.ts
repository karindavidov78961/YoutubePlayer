import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import Video from "../models/Video.entity";

const videosRepo = getRepository(Video);

export const getVideos = async (req: Request, res: Response) => {
  try {
    const allVideos = await videosRepo.find({
      order: {
        id: "ASC"
      }
    });
    res.status(200).send(allVideos);
  } catch (e) {
    res.sendStatus(500)
  }
};

export const addVideo = async (req: Request, res: Response) => {
  const video = req.body

  try {
    await videosRepo.save({ url: video.url, title: video.title })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  const video = req.body

  try {
    await videosRepo.delete({ id: video.id })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
};