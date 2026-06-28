import express from "express";
import service from "../services/users.js";

const router = express.Router();

router.post("/", service.addUser);

router.get("/", service.getAllUsers);

router.get("/:email", service.getByUserEmail);

router.put("/:email", service.updateUserByEmail);

router.delete("/:email", service.deleteUserByEmail);


export default router;
