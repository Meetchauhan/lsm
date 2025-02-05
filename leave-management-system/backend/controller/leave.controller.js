import Leave from "../model/leave.model.js";
import User from "../model/user.model.js";

export const newLeave = async (req, res) => {
  const { startDate, endDate, allDates, email, reason, leaveType } = req.body;

  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "No Authorized, No Token" });
    }

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const totalLeave = 24;
    const currentAvailableLeave = user.availableLeave ?? totalLeave;

    const generalLeave = allDates.filter((item) => {
      const date = new Date(item);
      const dayOfWeek = date.getDay();
      return dayOfWeek !== 0 && dayOfWeek !== 6;
    });

    const requestedLeaveCount = generalLeave.length;
    const updatedAvailableLeave = currentAvailableLeave - requestedLeaveCount;

    await User.findByIdAndUpdate(
      userId,
      { availableLeave: updatedAvailableLeave },
      { new: true }
    );

    const addLeave = new Leave({
      userId,
      startDate,
      endDate,
      allDates,
      email,
      reason,
      generalLeave,
      totalLeave,
      leaveType,
      availableLeave: updatedAvailableLeave,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    const newLeaveAdded = await addLeave.save();

    res.status(200).json({
      success: true,
      message: "New Leave Added...",
      data: newLeaveAdded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error..." });
  }
};

export const userAllLeaves = async (req, res) => {
  const userId = req?.user?._id;

  const userLeaves = await Leave.find({ userId }).sort({ createdAt: -1 });

  try {
    res.status(200).json({ success: true, data: userLeaves });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllLeave = async (req, res) => {
  const limit = parseInt(req?.params?.limit) || 10;
  const page = parseInt(req?.params?.page) || 1;
  const skip = (page - 1) * limit;
  const allLeaves = await Leave.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  const totalLeave = await Leave.countDocuments();
  
  try {
    res.status(200).json({
      success: true,
      data: allLeaves,
      totalLeave,
      totalPages: Math.ceil(totalLeave / limit),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const leaveStatus = async (req, res) => {
  const { leaveId, status, userId } = req.body;

  try {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "No Leave Data Found...!" });
    }

    const user = await User.findById(userId);
    if (status === "Canceled") {
      const requestedLeaveCount = leave.generalLeave.length;
      const updatedAvailableLeave = user.availableLeave + requestedLeaveCount;
      await User.findByIdAndUpdate(userId, {
        availableLeave: updatedAvailableLeave,
      });
    }

    leave.status = status;
    await leave.save();
    res
      .status(200)
      .json({ success: true, message: "Status Updated", data: leave });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const leaveTaken = async (req, res) => {
  try {
    const users = await User.find({});

    for (const user of users) {
      const userLeaves = await Leave.find({ userId: user._id });

      const generalLeaveFilter = userLeaves?.filter(
        (item) => item?.status !== "Canceled" && item?.generalLeave
      );

      const generalLeaveTaken = generalLeaveFilter?.map(
        (item) => item?.generalLeave?.length
      );

      const leaveTaken =
        generalLeaveTaken?.reduce(
          (initial, generalLeave) => generalLeave + initial,
          0
        ) || 0;

      await User.findByIdAndUpdate(user._id, { leaveTaken });
    }

    res.status(200).json({
      success: true,
      message: "Leave Taken Updated for All Users",
    });
  } catch (error) {
    console.error("Error updating leave taken:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
