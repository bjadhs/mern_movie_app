//Packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Files
import connectDB from "./db.js";
import userRoute from "./routes/userRoute.js";
import genreRoute from "./routes/genreRoute.js";
import moviesRoute from "./routes/moviesRoute.js";

//Configurations
dotenv.config();
connectDB();

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/genres", genreRoute);
app.use("/api/v1/movies", moviesRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));