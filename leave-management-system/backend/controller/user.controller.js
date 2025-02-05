import User from "../model/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import "../middleware/cron.js";
import Leave from "../model/leave.model.js";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Please provide all data" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "User already Exist..!" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    const createUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "New User Created", data: createUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  try {
    if (user?.email === email && user?.password === password) {
      generateToken(res, user._id);
      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          leave: user.availableLeave,
        },
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res
      .status(200)
      .json({ success: true, message: "User logout successfully...!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  const user = {
    _id: req?.user?._id,
    firstName: req?.user?.firstName,
    lastName: req?.user?.lastName,
    email: req?.user?.email,
    password: req?.user?.password,
    availableLeaves: req?.user?.availableLeave,
    leaveTaken: req?.user?.leaveTaken,
  };

  res.status(200).json({ success: true, data: user });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  try {
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editUserAdmin = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, password, availableLeave } =
      req.body;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    user.firstName = firstName || user?.firstName;
    user.lastName = lastName || user?.lastName;
    user.email = email || user?.email;
    user.password = password || user?.password;
    user.availableLeave = availableLeave || user?.availableLeave;

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "User Updated Successfully...!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findById(req?.user?._id);

  try {
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.password = password || user.password;
      const updatedUser = await user.save();
      res.status(200).json({
        success: true,
        message: "User Updated Successfully...!",
        data: updatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { _id } = req.body;
  console.log("id", _id);

  try {
    if (_id) {
      const isDeleteUser = await User.findByIdAndDelete(_id);
      res.status(200).json({
        success: true,
        message: "User Deleted Successfully...!",
        data: isDeleteUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
