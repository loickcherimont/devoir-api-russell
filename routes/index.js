import express from "express";
import userRoute from "./users.js";
import catwayRoute from "./catways.js";
import reservationRoute from "./reservations.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/catways", catwayRoute);
router.use("/catways/:catwayNumber/reservations", reservationRoute);

export default router;
