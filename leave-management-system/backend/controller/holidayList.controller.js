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

export const editHoliday = async (req, res) => {
  const { _id, holidayDate, holidayReason } = req.body;
  try {
    const updateHoliday = await HolidayList.findById(_id);
    if (!updateHoliday) {
      res.status(404).json({
        success: false,
        message: "Holiday Not Found",
      });
    }
    updateHoliday.holidayDate = holidayDate || updateHoliday?.holidayDate;
    updateHoliday.holidayReason = holidayReason || updateHoliday?.holidayReason;
    const updatedHoliday = await updateHoliday.save();
    res.status(200).json({
      success: true,
      data: updatedHoliday,
      message: "Holiday updated successfully...!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteHoliday = async (req, res) => {
  const { _id } = req.body;
  const removed = await HolidayList.findByIdAndDelete(_id);
  try {
    if (_id) {
      res
        .status(200)
        .json({ success: true, data: removed, message: "Holiday Deleted...!" });
    } else {
      res
        .status(400)
        .json({ success: true, data: removed, message: "Invalid Id" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
