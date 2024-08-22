import express from "express";
const router = express.Router();
import { getMovies, addMovie, deleteMovie } from "../controller/movies.js";

// GET all movies
router.get("/", getMovies);

// Add a new movie
router.post("/", addMovie);

// Delete a movie
router.delete("/:id", deleteMovie);

export default router;
