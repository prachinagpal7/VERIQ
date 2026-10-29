import {dashboard, coding, bookmark, problemDetails, execution} from "../controllers/dashboardController.js" 
import express from 'express'
import authMiddleware from "../middlewares/authMiddleware.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", authMiddleware, dashboard); 
dashboardRouter.get("/coding", authMiddleware, coding);
dashboardRouter.post("/coding/bookmark/:problemId", authMiddleware, bookmark);
dashboardRouter.post("/coding/problemDetails/:problemId", authMiddleware, problemDetails);
dashboardRouter.post("/coding/execute", authMiddleware, execution);

export default dashboardRouter;
