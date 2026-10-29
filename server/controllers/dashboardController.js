import userModel from "../models/userModel.js"
import activityModel from "../models/activityModel.js"
import savedProbModel from "../models/savedProbModel.js";
import problemModel from "../models/problemModel.js";
import {runCode, submitCode} from "../services/jDoodleService.js";
import mongoose from "mongoose";

export const dashboard = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const recentActivity = await activityModel.find({ user: req.user.id }).populate("problem").populate("interview").sort({ createdAt: -1 }).limit(10);
        const savedProblems  = await savedProbModel.find({ user: req.user.id }).populate("problem", "title difficulty topic acceptanceRate").sort({ createdAt: -1 }).limit(10);
        const problem = await problemModel.findOne({isProblemOfTheDay: true});
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "Dashboard fetched successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                firstLetter: user.firstName.charAt(0),
                credits: user.credits,
                streak: user.streak,
            },
            recentActivity,
            savedProblems,
            problemOfTheDay: problem
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const coding = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("firstName lastName credits streak");
        const problems = await problemModel.find().sort({ frequency: -1 });
        const problem = await problemModel.findOne({isProblemOfTheDay: true});
        const savedProb = await savedProbModel.find({ user: req.user.id }).select("problem").lean();
        const savedProblems = savedProb.map(item => item.problem.toString());
        const solvedProb = await activityModel.find({user: req.user.id,verdict: "Accepted"}).select("problem").lean();
        const solvedProblems = solvedProb.map(item => item.problem.toString());
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "Problems fetched successfully",
            user,
            solvedProblems,
            savedProblems,
            problems,
            problemOfTheDay: problem
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const bookmark = async (req, res) => {
    try {
        const saved = await savedProbModel.findOne({
            user: req.user.id,
            problem: req.params.problemId
        });
        if(saved){
            await saved.deleteOne();
            return res.status(200).json({
                message: "Bookmark removed"
            });
        }
        await savedProbModel.create({
            user: req.user.id,
            problem: req.params.problemId
        });
        return res.status(200).json({
            message: "Bookmark added"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const problemDetails = async (req, res) => {
    try {
        const problem = await problemModel.findById(req.params.problemId);
        if(!problem){
            return res.status(404).json({
                message: "Problem not found"
            })
        }
        return res.status(200).json({
            message: "Problem fetched successfully",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const execution = async (req, res) => {
    try {
        const {problemId, language, code, mode, input, expectedOutput} = req.body;
        let result;
        if(mode == "run"){
            result = await runCode(language, code, input, "run");
            result.status = result.output.trim() === expectedOutput.trim() ? "Accepted" : "Wrong Answer";
        } else if(mode == "submit"){
            result = await submitCode(problemId, language, code, "submit");
            await activityModel.create({user: req.user.id, sub: "Coding Practice", problem: problemId, verdict: result.status});
        }
        return res.status(200).json({
            message: "Code executed successfully",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}