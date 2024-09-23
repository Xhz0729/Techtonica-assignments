import express from "express";
import {
  getSpecies,
  getSightings,
  addSighting,
  searchSightings,
  getIndividualDetails,
  getIndividuals,
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

// get individual details
router.get("/individuals/:id", getIndividualDetails);

// get individuals
router.get("/individuals", getIndividuals);

export default router;
