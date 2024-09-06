import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hey, welcome to the quiz game server");
});

app.listen(PORT, () =>
  console.log(`Hey!! Server running on Port http://localhost:${PORT}`)
);
