import express from "express";
import {
  getSpecies,
  getSightings,
  addSighting,
  searchSightings,
} from "../controller/animals.js";

const router = express.Router();
// get all species
router.get("/species", getSpecies);

// get sightings
router.get("/sightings", getSightings);

// add a sighting
router.post("/sightings", addSighting);

// search sightings
router.get("/sightings/search", searchSightings);

export default router;
