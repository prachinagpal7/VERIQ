import {createInterview, getInterview, generateFirstQuestion, nextQuestion, endInterview } from "../controllers/interviewController.js" 
import express from 'express'
import authMiddleware from "../middlewares/authMiddleware.js";

const interviewRouter = express.Router();

interviewRouter.post("/create", authMiddleware, createInterview ); 
interviewRouter.post("/getInterview/:interviewId", authMiddleware, getInterview ); 
interviewRouter.post("/generateFirstQuestion/:interviewId", authMiddleware, generateFirstQuestion ); 
interviewRouter.post("/nextQuestion/:interviewId", authMiddleware, nextQuestion ); 
interviewRouter.post("/endInterview/:interviewId", authMiddleware, endInterview ); 

export default interviewRouter;