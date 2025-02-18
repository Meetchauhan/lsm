import HolidayList from "../model/holidaysList.modal.js";

export const addHoliday = async (req, res) => {
  const { holidayDate, holidayReason } = req.body;

  const addHoliday = new HolidayList({
    holidayDate: holidayDate,
    holidayReason: holidayReason,
  });

  const holiday = await addHoliday.save();
  try {
    res
      .status(200)
      .json({ success: true, data: holiday, message: "Holiday added" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in adding holiday" });
  }
};

export const fetchHolidays = async (req, res) => {
  const holidayList = await HolidayList.find({});
  try {
    res.status(200).json({ success: true, data: holidayList });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error..." });
  }
};
