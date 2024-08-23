import express from "express";
// const express = require("express");
import fetch from "node-fetch";
// const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// Replace 'YOUR_OAUTH_TOKEN' with your actual OAuth token
const oauthToken = process.env.OAUTH_TOKEN;

// helper function to fetch data
const fetchData = async (url) => {
  try {
    // Authenticate API Requests
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      },
    });
    if (!res.ok) throw new Error("Error: 'Fetching data from Eventbrite API!'");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Example route for fetching user details
app.get("/users", async (req, res) => {
  const url = "https://www.eventbriteapi.com/v3/users/";
  const data = await fetchData(url);
  res.json(data);
});

// Route for fetching event details
app.get("/event", async (req, res) => {
  const url = "https://www.eventbriteapi.com/v3/events/996666074057/";
  const data = await fetchData(url);
  res.json(data);
});

// Example route for fetching order details
app.get("/order", async (req, res) => {
  const url = "https://www.eventbriteapi.com/v3/orders/10261957469/";
  const data = await fetchData(url);
  res.json(data);
});

// Example route for fetching venue details
app.get("/venue", async (req, res) => {
  const url = "https://www.eventbriteapi.com/v3/venues/228068699/";
  const data = await fetchData(url);
  res.json(data);
});

// Example route for fetching organizer details

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
