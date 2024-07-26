import express from "express";
import { validate, verifyToken } from '../../middleware/index.js';

import { login, register } from "../controllers/authController.js";
import { registerValidator } from "../validators/authValidator.js";

const router = express.Router();

router.post("/login", verifyToken, login);
router.post("/register", verifyToken, registerValidator(), validate, register);

export default router;