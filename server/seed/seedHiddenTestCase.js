import problemModel from "../models/problemModel.js";
import connectDB from "../configs/database.js";
import hiddenTestCases from "./hiddenTestCases.js";
import HiddenTestCase from "../models/hiddenTestCaseModel.js";

const seedHiddenTestCases = async () => {
    try {
        await connectDB();
        const problems = await problemModel.find({}, "_id slug");
        const slugToProblemId = {};
        for (const problem of problems) {
            slugToProblemId[problem.slug] = problem._id;
        }
        const hiddenDocs = [];
        for(const hiddenProblem of hiddenTestCases) {
            const problemId = slugToProblemId[hiddenProblem.slug];
            if (!problemId) {
                console.log(`Problem not found: ${problem.slug}`);
                continue;
            }
            hiddenDocs.push({
                problem: problemId,
                slug: hiddenProblem.slug,
                testCases: hiddenProblem.testCases
            });
        }
        await HiddenTestCase.deleteMany({});
        const inserted = await HiddenTestCase.insertMany(hiddenDocs);
        console.log("Hidden test cases seeded successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedHiddenTestCases();