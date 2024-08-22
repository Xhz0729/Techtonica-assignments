import express from "express";
const router = express.Router();
import { getMovies, addMovie } from "../controller/movies.js";

// GET all movies
router.get("/", getMovies);

// Add a new movie
router.post("/", addMovie);

export default router;
