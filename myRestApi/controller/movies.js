import pool from "../db.js";

// get all movies
export const getMovies = async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (err) {
    res.send(err.message);
  }
};

// add a new movie
export const addMovie = async (req, res) => {
  const { name, genre, publish_year, rating } = req.body;
  try {
    // Insert the new movie into the database
    const result = await pool.query(
      "INSERT INTO movies (name, genre, publish_year, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, genre, publish_year, rating]
    );

    const newMovie = result.rows[0]; // Get the newly inserted movie

    res.send(`Movie with the name "${newMovie.name}" added to the database`);
  } catch (err) {
    res.send(err.message);
  }
};

// delete a movive
export const deleteMovie = async (req, res) => {
  // get the movie id
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM movies WHERE id= $1 RETURNING *",
      [id]
    );
    res.send(`Movie with ID ${id} has been deleted`);
  } catch (err) {
    res.send(err.message);
  }
};
