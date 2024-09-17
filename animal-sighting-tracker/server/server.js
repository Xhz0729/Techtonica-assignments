import express from "express";
import animalsRoutes from "./routes/animals.js";

const app = express();
const PORT = process.env.PORT || 8080;

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

app.use("/animals", animalsRoutes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
