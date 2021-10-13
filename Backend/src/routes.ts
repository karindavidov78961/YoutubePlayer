import { Router } from "express";
import videoRouter from "./routes/Video.route";

// Init router and path
const router = Router();

router.use('/video', videoRouter);

// Export the base-router
export default router;
