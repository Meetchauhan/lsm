export const navigation = (req, res) => {
  const user = req?.user;
  try {
    if (user) {
      res.status(200).json({ success: true, message: "User have token" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "User don't have token" });
    }
  } catch (error) {
    res.status(500).json({ success: true, message: "Server error" });
  }
};

export const adminNavigation = (req, res) => {
  const admin = req?.admin;
  try {
    if (admin) {
      res.status(200).json({ success: true, message: "Admin have token" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Admin don't have token" });
    }
  } catch (error) {
    res.status(500).json({ success: true, message: "Server error" });
  }
};
