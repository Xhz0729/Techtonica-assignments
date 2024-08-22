import pool from "../db.js";

export const getMovies = async (req, res, next) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (err) {
    next(err);
  }
};
