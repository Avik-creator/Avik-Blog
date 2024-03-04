import express from "express";
import {
  signup,
  verifyOtp,
  signin,
  googleAuth,
  signout,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/signin", signin);
router.post("/google-auth", googleAuth);
router.post("/signout", signout);

export default router;
