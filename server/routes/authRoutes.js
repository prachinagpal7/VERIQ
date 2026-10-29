import express from 'express';
import {signup, login, getMe, refreshToken, logout, logoutAll, role} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/get-me", authMiddleware, getMe);
authRouter.post("/refresh-token", refreshToken);
authRouter.get("/logout", logout);
authRouter.get("/logout-all", logoutAll);
authRouter.post("/role", authMiddleware, role);

export default authRouter;