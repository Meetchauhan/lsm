import mongoose from "mongoose";

const holidaysListSchema = new mongoose.Schema(
  {
    HolidaysDate: {
      type: String,
      required: true,
    },
    HolidayReason: {
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
