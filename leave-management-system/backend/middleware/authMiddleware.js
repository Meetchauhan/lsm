import Admin from "../model/admin.model.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "No Authorized, Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No Authorized, No Token",
    });
  }
  next();
};

export const protectAdmin = async (req, res, next) => {
  let token;
  token = req.cookies.jwt_admin;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.adminId);
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "No Authorized, Invalid Token" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "No Authorized, No Token" });
  }
  next();
};
