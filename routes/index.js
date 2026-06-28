import express from "express";
import userRoute from "./users.js";
import catwayRoute from "./catways.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/catways", catwayRoute);

export default router;
