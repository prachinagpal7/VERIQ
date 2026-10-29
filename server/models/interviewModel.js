import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: String,
    difficulty: String,
    timeLimit: Number,
    answer: String,
    feedback: String,
    score: {type: Number, default: 0},
    confidence: {type: Number, default: 0},
    communication: {type: Number, default: 0},
    correctness: {type: Number, default: 0},
})

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["chat", "video"],
        required: true
    },
    role: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    topics: [{
        type: String
    }],
    difficulty: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    durationInSeconds: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["created", "started", "completed"],
        default: "created"
    },
    messages: [{
        role: {
            type: String,
            enum: ["system", "assistant", "user"]
        },
        content: {
            type: String
        }
    }],
    question: [questionSchema],
    questionsAsked: {
        type: Number,
        default: 0
    },
    targetQuestions: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    report: {
        overallScore: { type: Number },
        verdict: { type: String },
        categories: [{ name: String, score: Number, feedback: String }],
        strengths: [{ type: String }],
        improvements: [{ type: String }],
        questions: [{
            question: String,
            answer: String,
            score: Number,
            verdict: String,
            feedback: String
        }]
    },
    startedAt: {
        type: Date
    },
    endedAt: {
        type: Date
    }
},{ timestamps: true
});

const interviewModel = mongoose.model("Interview", interviewSchema);

export default interviewModel;