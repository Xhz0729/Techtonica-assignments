import express from "express";
import cors from "cors";
import animalsRoutes from "./routes/animals.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola from the backend server" });
});

app.use("/animals", animalsRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}

// Export the app for testing
export default app;
