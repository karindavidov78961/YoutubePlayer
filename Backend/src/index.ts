import "reflect-metadata";
import { openConnection, closeConnection } from "./config/dbConnection";
import { startServer, stopServer } from "./config/app";
import { config } from "dotenv";

config();

(async () => {
  await openConnection();
  await startServer(5001);
  console.log(`Connected to db and started the server :D`);
})().catch(async (e) => {
  await closeConnection();
  await stopServer();
  throw new Error(`Disconnected from db and stopped the server D:`);
});
