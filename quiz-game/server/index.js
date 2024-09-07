import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// implemente caching to avoid multiple calls
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 10;

const app = express();
const PORT = 8000;

const apiKey = process.env.URL;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hey, welcome to the quiz game server");
});

// fetch data from API url
app.get("/api/game", async (req, res) => {
  const url = apiKey;
  const currentTime = Date.now();

  // Check if cache is still valid
  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return res.json(cachedData); // Serve cached data
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: data.message });
    }
    cachedData = data; // Cache the new data
    lastFetchTime = currentTime; // Update the fetch time
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send("Oops, something is wrong!");
  }
});

app.listen(PORT, () =>
  console.log(`Hey!! Server running on Port http://localhost:${PORT}`)
);
