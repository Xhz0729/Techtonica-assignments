import express from "express";
const router = express.Router();
import { getMovies } from "../controller/movies.js";

// GET all movies
router.get("/", getMovies);

export default router;
