import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.route.js";
import leaveRouter from "./router/leave.route.js";
import navigation from "./router/navigation.route.js";
import adminRouter from "./router/admin.route.js";
import mailRouter from "./router/mail.route.js";
import holidayRouter from "./router/holiday.route.js";
import cors from "cors";
import path from "path";
import "./middleware/cron.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://lsm-30im.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api", leaveRouter);
app.use("/api", navigation);
app.use("/api/admin", adminRouter);
app.use("/api", mailRouter);
app.use("/api", holidayRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Adjust path if needed

// Fallback route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // Adjust path
  connectDB();
});
app.get("/", (req, res) => {
  res.send("Server is ready...!");
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
  connectDB();
});
