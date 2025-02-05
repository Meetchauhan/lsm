import express from "express";
import { protect, protectAdmin } from "../middleware/authMiddleware.js";
import {
  adminNavigation,
  navigation,
} from "../controller/navigation.controller.js";

const router = express.Router();

router.route("/auth-navigation").get(protect, navigation);
router.route("/admin-navigation").get(protectAdmin, adminNavigation);

export default router;
