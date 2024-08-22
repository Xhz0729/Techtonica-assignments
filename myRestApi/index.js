import express from "express";
import bodyParser from "body-parser";
import movieRoutes from "./routes/movies.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the homepage!");
});

app.listen(PORT, () =>
  console.log(`Sever running on port: http://localhost:${PORT}`)
);
