import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import db from "./db/db-connection.js";

dotenv.config();

const app = express();

//Set the port that you want the server to run on
const PORT = process.env.PORT || 8080;

// get apiKey from .env file
const apiKey = process.env.API_KEY;

//creates an endpoint for the route /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from ExpressJS" });
});

// creates an endpoint for the route /api/weather
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  // built-in API request by city name
  // &units=imperial to make temperature shows in fahrenheit
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // deal with city is empty
  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  // fetch data from API
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: data.message });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// route to get user information
app.get("/users", async (req, res) => {
  try {
    const { rows: user } = await db.query("SELECT * FROM users");
    res.send(user);
  } catch (e) {
    return res.status(400).json({ e: "Error fetching users" });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
