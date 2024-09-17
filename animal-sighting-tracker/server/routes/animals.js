import express from "express";
import { getSpecies } from "../controller/animals.js";

const router = express.Router();
// get all species
router.get("/species", getSpecies);

export default router;
