import express from "express";
const router = express.Router();
import {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controller/movies.js";

// Get all movies
router.get("/", getMovies);

// Get movie by id
router.get("/:id", getMovieById);

// Add a new movie
router.post("/", addMovie);

// Delete a movie
router.delete("/:id", deleteMovie);

// Update a movie
router.patch("/:id", updateMovie);
export default router;
