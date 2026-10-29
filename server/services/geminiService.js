import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";       

dotenv.config();

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,  
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"   
});  

export const askGemini = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            throw new Error("Messages array is empty")
        }
        {/*const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "openai/gpt-4o-mini",
            messages: messages
        }, {headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },});*/}
        const response = await AI.chat.completions.create({
            model: "gemini-3.8-flash",
            messages,
            temperature: 0.7,
            max_tokens: 1500
        }, {timeout: 5000});
        const content = response?.choices?.[0]?.message?.content;
        if(!content || !content.trim()){
            throw new Error("AI returned empty response");
        }
        return content;
    } catch (error) {
        console.log("Gemini  Error: ", error.response?.data || error.message);
        throw error;
    }
}