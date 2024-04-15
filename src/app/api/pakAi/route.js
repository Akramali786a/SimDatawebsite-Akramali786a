import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import { NextResponse } from "next/server";
import {error} from "next/dist/build/output/log";

const API_KEY = process.env.GEMINI_API_KEY

const GenerateText = async (prompt, options) => {
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel(
        { model: "gemini-pro" }
    );

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response.functionCalls);
        const text = response.text();
        // console.log(text);
        return text;
    } catch (error) {
        console.error("Error generating text:", error);
        return null;
    }
};

export async function POST(req) {
    try {
        const payload = await req.json();

        let { prompt } = payload;

        if (prompt === "") {
            return NextResponse.json({
                status: "error",
                message: "Please Enter Valid Prompt!",
            });
        }

        const request = await GenerateText(prompt);
        const replacedText = request
            .replace(/\bGemini\b/gi, "PAKAI") // Replace all occurrences of 'GEMINI' (case-insensitive)
            .replace(/\bGoogle\b/g, "PAKDATA"); // Replace all occurrences of 'Google' (case-insensitive)

        return NextResponse.json({ status: "success", response: replacedText });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            status:"error",
            message:e
        })
    }
}
