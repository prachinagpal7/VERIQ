import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sub:{
        type: String,
        enum: ["Coding Practice", "AI Interview"],
        required: true
    },
    problem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
    },
    interview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
    },
    verdict:{
        type: String,
        enum: ["Accepted", "Wrong Answer"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const activityModel = mongoose.model("Activity", activitySchema);

export default activityModel;