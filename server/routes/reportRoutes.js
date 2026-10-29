import { generateReport, getInterviewReport, getPastInterviews } from "../controllers/reportController.js" 
import express from 'express'
import authMiddleware from "../middlewares/authMiddleware.js";

const reportRouter = express.Router();

reportRouter.post("/generateReport/:interviewId", authMiddleware, generateReport ); 
reportRouter.post("/getInterviewReport/:interviewId", authMiddleware, getInterviewReport ); 
reportRouter.get("/getPastInterviews", authMiddleware, getPastInterviews ); 

export default reportRouter;