import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
import {
  getAllLeave,
  leaveStatus,
  leaveTaken,
  newLeave,
  userAllLeaves,
} from "../controller/leave.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/new-leave").post(protect, newLeave);
router.route("/all-leaves/:limit/:page").get(getAllLeave);
router.route("/user-leaves").get(protect, userAllLeaves);
router.route("/leave-status").put(leaveStatus);
router.route("/leave-taken").get(leaveTaken)

export default router;
