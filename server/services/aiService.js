import { askGemini } from "./geminiService.js";
import { askOpenRouter } from "./openRouterService.js";

export const askAi = async (messages) => {
    try {
        return await askGemini(messages);
    } catch (error) {
        const status = error.status ?? error.response?.status;
        if(status === 429 || status === 503 || status === 500){
            console.log(`Gemini unavailable (${status}). Switching to OpenRouter...`);
            return await askOpenRouter(messages);
        }
        throw error;
    }
};