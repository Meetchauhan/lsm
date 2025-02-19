import express from "express";
import { addHoliday, fetchHolidays, upcomingHolidays } from "../controller/holidayList.controller.js";

const router = express.Router();

router.route("/add-holiday").post(addHoliday);
router.route("/holidaylist").get(fetchHolidays)
router.route("/upcoming-holidays").get(upcomingHolidays)

export default router;
