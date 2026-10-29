import mongoose from "mongoose";

const savedProbSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    problem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Problem", 
        required: true 
    },
}, { timestamps: true })

const savedProbModel = mongoose.model("SavedProblem", savedProbSchema);

export default savedProbModel;