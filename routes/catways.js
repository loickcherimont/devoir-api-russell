import express from "express";
import service from "../services/catways.js";

const router = express.Router();

router.post("/", service.addCatway);

router.get("/", service.getAllCatways);

router.get("/:catwayNumber", service.getCatwayByCatwayNumber);

router.put("/:catwayNumber", service.updateCatwayStateByCatwayNumber);

router.delete("/:catwayNumber", service.deleteCatwayByCatwayNumber);


export default router;
