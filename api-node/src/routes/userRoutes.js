import express from "express";
import { updatePassword } from "../controllers/userControllers.js";

const router = express.Router();

router.put("/update-password", updatePassword);

export default router;
