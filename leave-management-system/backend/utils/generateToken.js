import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const generateAdminToken = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("jwt_admin", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
