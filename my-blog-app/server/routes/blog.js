import express from "express";
import { newUser, userLogin, getUserPosts } from "../controller/blog.js";
const router = express.Router();

// add a new contact
router.post("/register", newUser);

// user login
router.post("/login", userLogin);

// getUserPosts
router.get("/posts/:userId", getUserPosts);

export default router;
