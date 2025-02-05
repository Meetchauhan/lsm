import express from "express";
import {
  createUser,
  deleteUser,
  editUser,
  editUserAdmin,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/all-users").get(getAllUsers);
router.route("/editUser-admin").put(editUserAdmin);
router.route("/editUser").put(protect, editUser);
router.route("/delete-user").delete(deleteUser);

export default router;
