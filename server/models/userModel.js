import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [ true, "First name is required" ]
    },
    lastName:{
        type: String,
        required: [ true, "Last name is required" ]
    },
    email: {
        type: String,
        required: [ true, "Email is required" ],
        unique: [ true, "Email must be unique" ],
    },
    password: {
        type: String,
        required: [ true, "Password is required" ]
    },
    role: {
        type: String,
        enum: ["interviewee", "interviewer"],
        default: null
    },
    credits:{
        type:Number,
        default:100
    },
    streak:{
        type:Number,
        default:0
    },
    lastActiveDate:{
        type:Date
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;