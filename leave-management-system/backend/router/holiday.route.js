import express from "express";
import { addHoliday, fetchHolidays } from "../controller/holidayList.controller.js";

const router = express.Router();

router.route("/add-holiday").post(addHoliday);
router.route("/holidaylist").get(fetchHolidays)

export default router;
