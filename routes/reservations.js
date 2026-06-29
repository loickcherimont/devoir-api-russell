import express from "express";
import service from "../services/reservations.js";

/** mergeParams: true allows access to req.params.catwayNumber from the parent router */
const router = express.Router({ mergeParams: true });

router.post("/", service.addReservation);

router.get("/", service.getAllReservations);

router.get("/:id", service.getReservationById);

router.put("/:id", service.updateReservationById);

router.delete("/:id", service.deleteReservationById);

export default router;
