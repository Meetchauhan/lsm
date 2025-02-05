import Admin from "../model/admin.model.js";
import { generateAdminToken } from "../utils/generateToken.js";

export const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Please provide all fields" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const admin = new Admin({
      firstName,
      lastName,
      email,
      password,
    });
    const newAdmin = await admin.save();
    res.status(201).json({
      success: true,
      message: "New Admin Created...!",
      data: newAdmin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  try {
    if (admin?.email === email && admin?.password === password) {
      generateAdminToken(res, admin?._id);
      res.status(200).json({ success: true, message: "Admin logged in...!" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.cookie("jwt_admin", "", {
        httpOnly: true,
        expires: new Date(0),
      });
    res
      .status(200)
      .json({ success: true, message: "Admin Logout successfully..." });
  } catch (error) {
    res.status(500).json({ success: true, message: "Server error" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const adminProfile = {
      firstName: req?.admin?.firstName,
      lastName: req?.admin?.lastName,
      email: req?.admin?.email,
      password: req?.admin?.password,
    };
    res.status(200).json({ success: true, data: adminProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
