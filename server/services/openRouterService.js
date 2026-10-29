import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const AI = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

export const askOpenRouter = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            throw new Error("Messages array is empty");
        }
        const response = await AI.chat.completions.create({
            model: "openrouter/free",
            messages,
            temperature: 0.7,
            max_tokens: 1500
        });
        const content = response?.choices?.[0]?.message?.content;
        if(!content || !content.trim()){
            throw new Error("OpenRouter returned empty response");
        }
        return content;
    } catch (error) {
        console.log(
            "OpenRouter Error:",
            error.status || error.response?.data || error.message
        );
        throw error;
    }
};