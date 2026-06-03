import express from "express";
import * as teamController from "../controller/team.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";  

const router = express.Router();

router.post("/create", verifyToken, teamController.createTeamController);
router.post("/add-member/:teamId", verifyToken, teamController.addMemberController);
router.post("/remove-member/:teamId", verifyToken, teamController.removeMemberController);


export default router;