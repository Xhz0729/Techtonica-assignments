import express from "express";
import {
  getSpecies,
  getSightings,
  addSighting,
} from "../controller/animals.js";

const router = express.Router();
// get all species
router.get("/species", getSpecies);

// get sightings
router.get("/sightings", getSightings);

// add a sighting
router.post("/sightings", addSighting);

export default router;
