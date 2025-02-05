import express from "express";
import {
    leaveApprovedMail,
  leaveCanceledMail,
  leaveRequestMail,
  registrationEmail,
} from "../controller/mail.controller.js";

const router = express.Router();

router.route("/registration-mail").post(registrationEmail);
router.route("/leave-request-mail").post(leaveRequestMail);
router.route("/leave-approved-mail").post(leaveApprovedMail);
router.route("/leave-canceled-mail").post(leaveCanceledMail);

export default router;
