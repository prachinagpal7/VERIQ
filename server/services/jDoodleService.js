import axios from "axios";
import dotenv from "dotenv";
import HiddenTestCase from "../models/hiddenTestCaseModel.js";

dotenv.config();

const jdoodleLanguageMap = {
    cpp: "cpp17",
    python: "python3",
    java: "java17",
    javascript: "nodejs",
};

export const runCode = async (language, code, input, mode) => {
    try {
        const languageCode = jdoodleLanguageMap[language];
        const response = await axios.post(
            "https://api.jdoodle.com/v1/execute",
            {
                clientId: process.env.JDOODLE_CLIENT_ID,
                clientSecret: process.env.JDOODLE_CLIENT_SECRET,
                script: code,
                language: languageCode,
                stdin: input || "",
                versionIndex: "0"
            }
        );
        return {
            output: response.data.output,
            cpuTime: response.data.cpuTime,
            memory: response.data.memory,
            status: "Executed",
            type: mode
        };
    } catch (error) {
        console.error("JDoodle Error:", error.response?.data || error.message);
        if(error.response?.status === 429){
            throw new Error("Code execution limit reached. Please try again tomorrow.");
        }
        throw new Error("Code execution failed.");
    }
};

export const submitCode = async (problemId, language, code, mode) => {
    try {
        const problem = await HiddenTestCase.findOne({problem: problemId});
        if(!problem){
            throw new Error("Problem not found");
        }
        const testCase = problem.testCases;
        let lastResult;
        for(let i = 0; i < testCase.length; i++){
            const result = await runCode(language, code, testCase[i].input, "submit");
            lastResult = result;
            if(result.output.trim() !== testCase[i].expectedOutput.trim()){
                return {
                    status: "Wrong Answer",
                    passed: i,
                    total: testCase.length ,
                    type: mode
                }
            }
        }
        return {
            status: "Accepted",
            passed: testCase.length,
            total: testCase.length,
            cpuTime: lastResult.cpuTime,
            memory: lastResult.memory,
            type: mode
        };
    } catch (error) {
        console.error("JDoodle Error:", error.response?.data || error.message);
        if(error.response?.status === 429){
            throw new Error("Code execution limit reached. Please try again tomorrow.");
        }
        throw new Error("Code execution failed.");
    }
};