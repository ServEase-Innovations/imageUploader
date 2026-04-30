import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
dotenv.config({ path: "./.env" });
import connectDB from "./src/config/db.js";
import imageRoutes from "./src/routes/image.routes.js";
import fileRoutes from "./src/routes/file.routes.js";
import { v2 as cloudinary } from "cloudinary";
console.log("apikey,apisecret", process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/images", imageRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});