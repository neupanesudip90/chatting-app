import express from "express";

import { registerUser, loginUser ,logoutUser, verifyUser, getUserDetails} from "../controller/authController.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/authMiddleware.js";
import { getMessages, sendMessage } from "../controller/messageController.js";
import verifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

// user Register route
router.post("/register", validateRegistration, registerUser);

// user Login route
router.post("/login", validateLogin, loginUser);

// Send a message
router.post("/messages", verifyToken, sendMessage);

// Get messages
router.get("/messages", verifyToken, getMessages);

// User logout route
router.post("/logout", verifyToken, logoutUser);

// Verify user route
router.get("/verify", ...verifyUser);

// Get logged in user details
router.get("/me", verifyToken, getUserDetails);

export default router;
