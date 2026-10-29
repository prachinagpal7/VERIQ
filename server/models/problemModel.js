import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  input: { 
    type: String, 
    required: true 
  },
  output: { 
    type: String, 
    required: true 
  },
  explanation: { 
    type: String 
  },
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { 
    type: String, 
    required: true 
  },
  expectedOutput: { 
    type: String, 
    required: true 
  },
  isHidden: { 
    type: Boolean, 
    default: false 
  },
}, { _id: false });

const problemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    difficulty: { 
        type: String, 
        enum: ["Easy", "Medium", "Hard"], 
        required: true 
    },
    topic: { 
        type: String, 
        required: true 
    },
    isProblemOfTheDay: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }],
    acceptanceRate: { 
        type: Number 
    },
    description: { 
        type: String 
    },
    constraints: [{
        type: String
    }],
    companies: [{
        type: String
    }],
    frequency: {
        type: Number,
        default: 0
    },
    examples: [exampleSchema],
    hints: [{
        type: String 
    }],
    testCases: [testCaseSchema],
    timeComplexity: { 
        type: String 
    }, 
    spaceComplexity: { 
        type: String 
    },
    followUp: { 
        type: String 
    },
    starterCode: {
        cpp: {
            type: String,
            required: true,
        },
        python: {
            type: String,
            required: true,
        },
        java: {
            type: String,
            required: true,
        },
        javascript: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true })

const problemModel = mongoose.model("Problem", problemSchema);

export default problemModel;