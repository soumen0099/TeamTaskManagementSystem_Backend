import * as authController from "../controller/auth.controller.js";
import express from "express";
import { validRegister,validLogin } from "../middlewares/validate.middleware.js";
import {verifyToken} from "../middlewares/auth.middleware.js"


const router = express.Router();

router.post("/register", validRegister, authController.registerUser);
router.post("/login", validLogin, authController.loginUser);
router.get("/profile", verifyToken,authController.profileUser)

export default router;