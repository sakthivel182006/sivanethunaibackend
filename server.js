import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./route/route.userroute.js";
import bookRoutes from "./route/booking.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  "https://sriammanhydraulicserviceraja.vercel.app",
  "https://sriammanhydraulicserviceraja.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.get("/", (req, res) => {
  res.send("MERN Backend Running with Imt Syntax!");
});

// Use User Routes
app.use("/api/users", userRoutes);
app.use("/api/users/book", bookRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
