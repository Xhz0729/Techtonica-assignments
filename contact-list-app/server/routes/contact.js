import express from "express";
import {
  getContact,
  getContactDetails,
  addContact,
  deleteContactById,
  changeContactById,
} from "../controller/contact.js";

const router = express.Router();

// get all contacts
router.get("/", getContact);

// get contact's details
router.get("/:id", getContactDetails);

// add a new contact
router.post("/", addContact);

// delete a contact
router.delete("/:id", deleteContactById);

//update a contact
router.put("/:id", changeContactById);

export default router;
