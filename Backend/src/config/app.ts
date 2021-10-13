import express from "express";
import * as http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { config } from "dotenv";
import { getRepository } from "typeorm";
import Video from "../models/Video.entity";

config();
const app = express();
const server = http.createServer(app);
const io = new Server();
io.listen(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"]
  }
})

export const startServer = async (port: number) => {
  const videosRepo = getRepository(Video);

  io.on('connection', async (socket) => {
    console.log('a user connected');

    // Get playlist and emit
    try {
      const allVideos = await videosRepo.find({
        order: {
          id: "ASC"
        }
      });
      console.log(allVideos)
      io.emit('playlist', allVideos)
    } catch (error) {
      console.log(error)
    }

    // Add video to the playlist, get all videos list and emit
    socket.on('add_video', async ({ url, title }) => {
      console.log('url: ' + url);
      console.log('title: ' + title);

      try {
        await videosRepo.save({ url: url, title: title })
        const allVideos = await videosRepo.find({
          order: {
            id: "ASC"
          }
        });
        console.log(allVideos)
        io.emit('playlist', allVideos)
      } catch (error) {
        console.log(error)
      }
    });

    // Remove video from playlist, get all videos list and emit
    socket.on('remove_video', async (id) => {
      console.log('id remove ' + id);

      try {
        await videosRepo.delete({ id: id })
        const allVideos = await videosRepo.find({
          order: {
            id: "ASC"
          }
        });
        io.emit('playlist', allVideos)
      } catch (error) {
        console.log(error)
      }
    });
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
    })
  );

  const routes = require("../routes").default;

  //Set all routes from routes folder
  app.use("/", routes);

  // Wait for the server to listen
  await new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}!`);
      resolve();
    });
  });
};

export const stopServer = async () => {
  server.close();
};
