import problems from "./problems.js";
import problemModel from "../models/problemModel.js";
import connectDB from "../configs/database.js";

const seedProblems = async () => {
    try {
        await connectDB();
        await problemModel.deleteMany({});
        const inserted = await problemModel.insertMany(problems);
        console.log("Done");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedProblems();