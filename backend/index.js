//Packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Files
import connectDB from "./db.js";
import userRoute from "./routes/userRoute.js";
import genraRoute from "./routes/genraRoute.js";
// import moviesRoute from "./routes/moviesRoute.js";

//Configurations
dotenv.config();
connectDB();

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/genres", genraRoute);
// app.use("/api/v1/movies", movieRoute);

const PORT = process.env.PORT || 5002;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));