import express from "express";
// const express = require("express");
import fetch from "node-fetch";
// const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Replace 'YOUR_OAUTH_TOKEN' with your actual OAuth token
const oauthToken = "LSFH5JRYIMAAQALOGHJV";

// helper function to fetch data
constFetchData = async (url) => {
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

// Example route for fetching event details

// Example route for fetching ticket class details

// Example route for fetching order details

// Example route for fetching venue details

// Example route for fetching organizer details

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
