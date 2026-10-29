import interviewModel from "../models/interviewModel.js";
import userModel from "../models/userModel.js";
import activityModel from "../models/activityModel.js";
import { askAi } from "../services/aiService.js";

const reportPrompt = (interview) => {
    const conversation = interview.messages.filter(msg => msg.role !== "system").map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n\n");
    return `You are an expert interviewer evaluating a candidate based ONLY on the candidate's actual answers in the interview conversation.
    Candidate details:
    Role: ${interview.role}
    Level: ${interview.level}
    Topics: ${interview.topics.join(", ")}
    Difficulty: ${interview.difficulty}
    Interview conversation: ${conversation}
    Interview statistics:
    Target questions: ${interview.targetQuestions}
    Questions asked: ${interview.questionsAsked}
    Candidate answers: ${interview.messages.filter(msg => msg.role === "user").length}

    Evaluation Rules:
    - ONLY evaluate the candidate using messages where role = "user".
    - Messages where role = "assistant" are questions from the interviewer and must NEVER be treated as candidate answers.
    - Never infer, assume, or invent an answer that the candidate did not provide.
    - If there are ZERO candidate answers, all scores must be 0.
    - If there are candidate answers, evaluate ONLY those answers.
    - Do not give credit for questions being asked.
    - Do not assume the candidate would have answered well if they had continued.
    - If the interview was incomplete, explicitly mention that in the feedback.
    - The number of questions asked does NOT mean the number of questions answered.
    - Be realistic and critical. Do not give high scores merely to encourage the candidate.

    Return ONLY valid JSON.
    Do not use markdown.
    Do not add any text before or after the JSON.
    The JSON must follow this exact structure:
    {
        "overallScore": number,
        "verdict": "Excellent" | "Good" | "Average" | "Poor",
        "categories": [
            {
                "name": "Technical Accuracy",
                "score": number,
                "feedback": "string"
            },
            {
                "name": "Problem Solving",
                "score": number,
                "feedback": "string"
            },
            {
                "name": "Communication",
                "score": number,
                "feedback": "string"
            },
            {
                "name": "Code Quality",
                "score": number,
                "feedback": "string"
            }
        ],
        "strengths": ["string"],
        "improvements": ["string"],
        "questions": [
            {
                "question": "string",
                "answer": "string",
                "score": number,
                "verdict": "Solved" | "Solved with hint" | "Partially solved" | "Not solved",
                "feedback": "string"
            }
        ]
    }
    Rules:
    - Be very realistic.
    - Every score must be between 0 and 100.
    - Be honest and critical.
    - Do not give high scores just to encourage the candidate.
    - If the answer is weak, score low.
    - If an answer is good, no need to be kind and give high score, keep it average.
    - If an answer is strong, detailed, relevant and technically correct, score it accordingly.
    - Consider clarity, structure, relevance.
    - Evaluate technical correctness, reasoning and communication.
    - If there is not enough evidence for Code Quality, explicitly mention that limitation.
    - Keep feedback concise and useful.
    - If there are zero candidate answers, overallScore must be 0.`
}

export const generateReport = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interview = await interviewModel.findById(interviewId);
        if (!interview) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }
        if (!interview.messages || interview.messages.length === 0) {
            return res.status(400).json({
                message: "Interview has no messages to evaluate"
            });
        }
        const answeredQuestions = interview.messages.filter(msg => msg.role === "user").length;
        if(answeredQuestions === 0) {
            const report = {
                overallScore: 0, 
                verdict: "Poor",
                categories: [
                    {
                        name: "Technical Accuracy",
                        score: 0,
                        feedback: "No candidate answers were provided."
                    },
                    {
                        name: "Problem Solving",
                        score: 0,
                        feedback: "No candidate answers were provided."
                    },
                    {
                        name: "Communication",
                        score: 0,
                        feedback: "No candidate answers were provided."
                    },
                    {
                        name: "Code Quality",
                        score: 0,
                        feedback: "No coding response was provided."
                    }
                ],
                strengths: [],
                improvements: ["Complete the interview questions to receive an accurate evaluation."],
                questions: []
            };
            interview.report = report;
            await interview.save();
            await activityModel.create({user: interview.user, sub: "AI Interview", interview: interviewId});
            return res.status(200).json({
                message: "Report generated",
                interview
            });
        }
        const messages = [
            {role: "system", content: reportPrompt(interview)},
            {role: "user", content: "Generate the report."}
        ];
        const response = await askAi(messages);       //askAi returns string
        let report;
        try {
            report = JSON.parse(response);
            const answeredQuestions = interview.messages.filter(msg => msg.role === "user").length;
            const targetQuestions = interview.targetQuestions;
            if (answeredQuestions === 0) {
                report.overallScore = 0;
            } else {
                const completionFactor = Math.min(answeredQuestions / targetQuestions, 1);
                report.overallScore = Math.round(report.overallScore * completionFactor);
            }
        } catch (error) {
            return res.status(500).json({
                message: "AI returned an invalid report"
            });
        }
        interview.report = report;
        await interview.save();
        await activityModel.create({user: interview.user, sub: "AI Interview", interview: interviewId});
        return res.status(200).json({
            message: "Report successfully generated",
            interview
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getInterviewReport = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interview = await interviewModel.findById(interviewId);
        if (!interview) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }
        if(!interview.report){
            return res.status(404).json({
                message: "Report not generated yet"
            })
        }
        return res.status(200).json({
            message: "Report fetched successfully",
            report: interview.report,
            interview: {
                _id: interview._id,
                type: interview.type,
                role: interview.role,
                level: interview.level,
                topics: interview.topics,
                difficulty: interview.difficulty,
                duration: interview.duration,
                startedAt: interview.startedAt,
                endedAt: interview.endedAt
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getPastInterviews = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const interviews = await interviewModel.find({user: req.user.id, status: "completed"}).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Past interviews fetched successfully",
            interviews
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}