import express from "express";
import {
  addHoliday,
  deleteHoliday,
  editHoliday,
  fetchHolidays,
  upcomingHolidays,
} from "../controller/holidayList.controller.js";

const router = express.Router();

router.route("/add-holiday").post(addHoliday);
router.route("/holidaylist").get(fetchHolidays);
router.route("/upcoming-holidays").get(upcomingHolidays);
router.route("/edit-holiday").put(editHoliday);
router.route("/delete-holiday").delete(deleteHoliday);

export default router;
