import express, { response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
import db from "./db/db-connection.js";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // <--- This line is crucial

app.use(cors());

//Set the port that you want the server to run on
const PORT = process.env.PORT || 8080;

// Get apiKey from .env file
const apiKey = process.env.API_KEY;

// Creates an endpoint for the route /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from ExpressJS" });
});

// Creates an endpoint for the route /api/weather
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  // Built-in API request by city name
  // &units=imperial to make temperature shows in fahrenheit
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // Check if city is empty
  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  // Fetch data from API
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        message:
          data.message ||
          "There was an issue fetching the weather data. Please try again later.",
      });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(response.status).json({
      message: "We’re experiencing server issues. Please try again later.",
    });
  }
});

// Route to update or insert a new user record
app.post("/user", async (req, res) => {
  let { username, favorite_city, user_email } = req.body;

  try {
    // Check if the user already exists
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);

    // User exist
    if (user.rows.length > 0) {
      // Only update the favorite city if it is not null (i.e., user checked the box)
      const currentFavoriteCity = favorite_city || user.rows[0].favorite_city;

      // If user exists, update the favorite city and username accordingly
      const updatedQuery = `UPDATE users SET username = $1, favorite_city = $2 WHERE user_email = $3 RETURNING *`;
      const updatedUser = await db.query(updatedQuery, [
        username,
        currentFavoriteCity,
        user_email,
      ]);
      // Send updated user data back
      res.status(200).json(updatedUser.rows[0]);
    } else {
      // Add a new user record if email not found
      const insertQuery = `
        INSERT INTO users (username, user_email, favorite_city)
        VALUES ($1, $2, $3)
        RETURNING *`;
      const newUser = await db.query(insertQuery, [
        username,
        user_email,
        favorite_city,
      ]);

      // Send newly created user data back
      res.status(201).json(newUser.rows[0]);
    }
  } catch (error) {
    // Catch any errors and respond with an error message
    console.error(error.message);
    res.status(500).json({ error: "Error adding/updating a new contact" });
  }
});

// route to get user information by email
app.get("/user", async (req, res) => {
  let { email } = req.query;

  try {
    const { rows: user } = await db.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (user.length > 0) {
      res.status(200).json(user[0]); // Send the user object if found
    } else {
      res.status(404).json({ message: "User not found" }); // Handle case where no user is found
    }
  } catch (e) {
    return res.status(400).json({ error: "Error fetching users" });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
