import express from "express";
import {createGenre} from "../controllers/genreController.js";

const router = express.Router();

router.route("/").post(createGenre);

export default router;
