import express from "express";
import {
  adminLogin,
  adminLogout,
  createAdmin,
  getAdminProfile,
} from "../controller/admin.controller.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(createAdmin);
router.route("/login").post(adminLogin);
router.route("/logout").post(adminLogout);
router.route("/profile").get(protectAdmin, getAdminProfile);

export default router;
