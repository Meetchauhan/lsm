import mongoose from "mongoose";

const holidaysListSchema = new mongoose.Schema(
  {
    holidayDate: {
      type: String,
      required: true,
    },
    holidayReason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HolidayList = mongoose.model("HolidayList", holidaysListSchema);

export default HolidayList;
