import express from "express";
import { getContact } from "../controller/contact.js";

const router = express.Router();
// get all species
router.get("/", getContact);

export default router;