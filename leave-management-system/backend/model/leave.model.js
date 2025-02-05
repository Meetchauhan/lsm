import mongoose from "mongoose";

const leaceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    allDates: [
      {
        type: String,
        required: false,
      },
    ],
    generalLeave: [
      {
        type: String,
        required: false,
      },
    ],
    totalLeave: {
      type: Number,
      required: true,
    },
    availableLeave: {
      type: Number,
      required: true,
    },
    leaveType: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    reason: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaceSchema);

export default Leave;
