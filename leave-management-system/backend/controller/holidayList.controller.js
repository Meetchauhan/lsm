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

export const upcomingHolidays = async (req, res) => {
  const holidayList = await HolidayList.find({});
  const currentDate = new Date();

  const upcommingHolidayList = holidayList
    ?.map((item) => ({
      holidayDate: new Date(item.holidayDate),
      holidayReason: item?.holidayReason,
    }))
    ?.filter((item) => item?.holidayDate >= currentDate)
    ?.map((item) => ({
      holidayDate: item?.holidayDate.toDateString(),
      holidayReason: item?.holidayReason,
    }));
  try {
    res.status(200).json({ success: true, data: upcommingHolidayList });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
