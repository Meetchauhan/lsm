import cron from "node-cron";
import User from "../model/user.model.js";

cron.schedule("0 * * * *", async () => {
  console.log("Running Cron Job: Adding 2 leaves to all users");
  const API_URL = process.env.FRONTEND_URL;

  try {
    const result = await User.updateMany({}, { $inc: { availableLeave: 2 } });

    const getAllUser = async () => {
      const response = await fetch(`${API_URL}/user/all-users`);
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Error in cron get all result API", error);
      }
    };
    const getUserProfile = async () => {
      const response = await fetch(`${API_URL}/user/profile`, {
        credentials: "include",
      });
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Error in cron get all result API", error);
      }
    };
    const cronRun = async () => {
      const response = await fetch(`${API_URL}/api/cron-mail`);
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Erron in running clone mail", error);
      }
    };
    cronRun()
    getAllUser();
    getUserProfile();
    console.log(
      `Successfully updated leaves for ${result.modifiedCount} users`
    );
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
