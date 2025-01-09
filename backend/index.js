import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Server running");
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));