import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./api/routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);


var PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
});