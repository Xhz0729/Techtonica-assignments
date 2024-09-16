import express from "express";
const router = express.Router();

import {
  getEvents,
  addEvent,
  deleteEventById,
  changeEventById,
  toggleFavoriteById,
  searchEvent,
  getLikedEvent,
} from "../controller/events.js";
// get all event
router.get("/", getEvents);

// add a new event
router.post("/", addEvent);

// delete an event
router.delete("/:id", deleteEventById);

// update an event
router.put("/:id", changeEventById);

// search an event
router.get("/search", searchEvent);

// Toggle favorite status of an event by ID
router.put("/favorite/:id", toggleFavoriteById); // This is the route for favoriting/unfavoriting

// search liked event
router.get("/favorite", getLikedEvent);

export default router;
