import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ModelType } from "../types";

// Initialize the client with the environment variable API key.
// Note: In a real production tutorial for users, they would use their own key,
// but for this demo playground, we use the provided system key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (
  prompt: string,
  modelName: ModelType = ModelType.FLASH
): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        // Using standard config suitable for a tutorial demo
        temperature: 0.7,
      }
    });

    // Access the text property directly as per SDK guidelines
    const text = response.text;
    return text || "未收到回复 (No response)";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "生成内容时发生错误");
  }
};