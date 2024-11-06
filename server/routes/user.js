import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get("/", userController.greet)

router.post("/api/auth/register", userController.registerUser)

router.post("/api/auth/login", userController.loginUser)

router.get("/api/auth/logout", userController.logoutUser)

export default router;