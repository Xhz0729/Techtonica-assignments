import express from "express";
const router = express.Router();
import {
  getMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controller/movies.js";

// GET all movies
router.get("/", getMovies);

// Add a new movie
router.post("/", addMovie);

// Delete a movie
router.delete("/:id", deleteMovie);

// Update a movie
router.patch("/:id", updateMovie);
export default router;
